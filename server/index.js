import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { createId, getDbPath, readDb, resetDb, writeDb } from './database.js'

const app = express()
const PORT = Number(process.env.PORT || 4000)
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_before_production'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'
const VALID_ROLES = ['Admin', 'Manager', 'Team Member']
const VALID_STATUSES = ['todo', 'progress', 'review', 'done']
const VALID_PRIORITIES = ['Low', 'Medium', 'High', 'Urgent']

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))
app.use(express.json())

function publicUser(user) {
  const { passwordHash: _passwordHash, ...safeUser } = user
  return safeUser
}

function createToken(user) {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '2h' }
  )
}

async function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token.' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const db = await readDb()
    const user = db.users.find(item => item.id === payload.userId)

    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' })
    }

    req.user = user
    next()
  } catch {
    return res.status(401).json({ message: 'Session expired. Please login again.' })
  }
}

function allowRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to access this resource.' })
    }
    next()
  }
}

function normalizeString(value) {
  return String(value || '').trim()
}

app.get('/api/health', async (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Project OS API',
    database: 'local-json',
    dbPath: getDbPath(),
    time: new Date().toISOString()
  })
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const db = await readDb()
  const user = db.users.find(item => item.email.toLowerCase() === String(email).toLowerCase())

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  res.json({ token: createToken(user), user: publicUser(user) })
})

app.post('/api/auth/register', async (req, res) => {
  const name = normalizeString(req.body.name)
  const email = normalizeString(req.body.email).toLowerCase()
  const password = String(req.body.password || '')
  const role = VALID_ROLES.includes(req.body.role) ? req.body.role : 'Team Member'

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required.' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' })
  }

  const db = await readDb()
  const duplicate = db.users.some(user => user.email.toLowerCase() === email)

  if (duplicate) {
    return res.status(409).json({ message: 'This email is already registered.' })
  }

  const user = {
    id: createId('u'),
    name,
    email,
    role,
    avatar: name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase(),
    passwordHash: bcrypt.hashSync(password, 10)
  }

  db.users.push(user)
  db.activity.unshift(`${user.name} joined the workspace as ${user.role}.`)
  await writeDb(db)

  res.status(201).json({ token: createToken(user), user: publicUser(user) })
})

app.post('/api/auth/demo-login', async (req, res) => {
  const { role } = req.body
  const db = await readDb()
  const user = db.users.find(item => item.role === role)

  if (!user) {
    return res.status(404).json({ message: 'Demo role was not found.' })
  }

  res.json({ token: createToken(user), user: publicUser(user) })
})

app.get('/api/auth/me', authRequired, (req, res) => {
  res.json(publicUser(req.user))
})

app.get('/api/users', authRequired, allowRoles('Admin', 'Manager'), async (_req, res) => {
  const db = await readDb()
  res.json(db.users.map(publicUser))
})

app.get('/api/projects', authRequired, async (_req, res) => {
  const db = await readDb()
  res.json(db.projects)
})

app.post('/api/projects', authRequired, allowRoles('Admin', 'Manager'), async (req, res) => {
  const name = normalizeString(req.body.name)
  const client = normalizeString(req.body.client)
  const deadline = normalizeString(req.body.deadline)

  if (!name || !client || !deadline) {
    return res.status(400).json({ message: 'Project name, client and deadline are required.' })
  }

  const project = {
    id: createId('p'),
    name,
    client,
    deadline,
    progress: Number(req.body.progress || 0),
    riskScore: Number(req.body.riskScore || 30),
    budget: Number(req.body.budget || 0)
  }

  const db = await readDb()
  db.projects.push(project)
  db.activity.unshift(`${req.user.name} created project “${project.name}”.`)
  await writeDb(db)

  res.status(201).json(project)
})

app.get('/api/tasks', authRequired, async (_req, res) => {
  const db = await readDb()
  res.json(db.tasks)
})

app.post('/api/tasks', authRequired, async (req, res) => {
  const title = normalizeString(req.body.title)
  const description = normalizeString(req.body.description)
  const projectId = normalizeString(req.body.projectId)
  const assignee = normalizeString(req.body.assignee || req.user.name)
  const dueDate = normalizeString(req.body.dueDate)
  const status = VALID_STATUSES.includes(req.body.status) ? req.body.status : 'todo'
  const priority = VALID_PRIORITIES.includes(req.body.priority) ? req.body.priority : 'Medium'

  if (!title || !description || !projectId || !dueDate) {
    return res.status(400).json({ message: 'Title, description, project and due date are required.' })
  }

  const db = await readDb()
  const projectExists = db.projects.some(project => project.id === projectId)

  if (!projectExists) {
    return res.status(404).json({ message: 'Project was not found.' })
  }

  const task = {
    id: createId('t'),
    projectId,
    title,
    description,
    status,
    assignee,
    dueDate,
    priority,
    comments: 0
  }

  db.tasks.push(task)
  db.activity.unshift(`${req.user.name} created task “${task.title}”.`)
  await writeDb(db)

  res.status(201).json(task)
})

app.patch('/api/tasks/:taskId/status', authRequired, async (req, res) => {
  const { taskId } = req.params
  const { status } = req.body

  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({ message: 'Invalid task status.' })
  }

  const db = await readDb()
  const task = db.tasks.find(item => item.id === taskId)

  if (!task) {
    return res.status(404).json({ message: 'Task was not found.' })
  }

  task.status = status
  const readableStatus = status.replace('progress', 'in progress')
  db.activity.unshift(`${req.user.name} moved “${task.title}” to ${readableStatus}.`)
  await writeDb(db)

  res.json({ task, activity: db.activity })
})

app.get('/api/activity', authRequired, async (_req, res) => {
  const db = await readDb()
  res.json(db.activity)
})

app.post('/api/dev/reset-db', authRequired, allowRoles('Admin'), async (_req, res) => {
  const db = await resetDb()
  res.json({ message: 'Local database reset complete.', counts: { users: db.users.length, projects: db.projects.length, tasks: db.tasks.length } })
})

app.use((_req, res) => {
  res.status(404).json({ message: 'API route not found.' })
})

app.listen(PORT, () => {
  console.log(`Project OS API running on http://localhost:${PORT}`)
  console.log(`Local database file: ${getDbPath()}`)
})
