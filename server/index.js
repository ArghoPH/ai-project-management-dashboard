import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const app = express()
const PORT = Number(process.env.PORT || 4000)
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_before_production'
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }))
app.use(express.json())

const passwordHash = bcrypt.hashSync('password123', 10)

const users = [
  { id: 'u1', name: 'Ariyan Rahman', email: 'admin@demo.com', role: 'Admin', avatar: 'AR', passwordHash },
  { id: 'u2', name: 'Nusrat Jahan', email: 'manager@demo.com', role: 'Manager', avatar: 'NJ', passwordHash },
  { id: 'u3', name: 'Tanvir Hasan', email: 'member@demo.com', role: 'Team Member', avatar: 'TH', passwordHash }
]

const projects = [
  { id: 'p1', name: 'Rural Finance App', client: 'Shakti Foundation', deadline: '2026-07-12', progress: 72, riskScore: 38, budget: 42000 },
  { id: 'p2', name: 'Smart Loan Workflow', client: 'Finclusion Lab', deadline: '2026-06-28', progress: 44, riskScore: 82, budget: 30000 },
  { id: 'p3', name: 'Field Agent Portal', client: 'Village Ops', deadline: '2026-08-04', progress: 61, riskScore: 54, budget: 51000 },
  { id: 'p4', name: 'Analytics Migration', client: 'Internal', deadline: '2026-07-22', progress: 86, riskScore: 24, budget: 18000 }
]

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

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token) {
    return res.status(401).json({ message: 'Missing authorization token.' })
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = users.find(item => item.id === payload.userId)

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

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Project OS API', time: new Date().toISOString() })
})

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' })
  }

  const user = users.find(item => item.email.toLowerCase() === String(email).toLowerCase())

  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ message: 'Invalid email or password.' })
  }

  res.json({ token: createToken(user), user: publicUser(user) })
})

app.post('/api/auth/demo-login', (req, res) => {
  const { role } = req.body
  const user = users.find(item => item.role === role)

  if (!user) {
    return res.status(404).json({ message: 'Demo role was not found.' })
  }

  res.json({ token: createToken(user), user: publicUser(user) })
})

app.get('/api/auth/me', authRequired, (req, res) => {
  res.json(publicUser(req.user))
})

app.get('/api/users', authRequired, allowRoles('Admin', 'Manager'), (_req, res) => {
  res.json(users.map(publicUser))
})

app.get('/api/projects', authRequired, (_req, res) => {
  res.json(projects)
})

app.use((_req, res) => {
  res.status(404).json({ message: 'API route not found.' })
})

app.listen(PORT, () => {
  console.log(`Project OS API running on http://localhost:${PORT}`)
})
