import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import bcrypt from 'bcryptjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_FILE_PATH || join(__dirname, 'data', 'db.json')

function createSeedData() {
  const passwordHash = bcrypt.hashSync('password123', 10)

  return {
    users: [
      { id: 'u1', name: 'Ariyan Rahman', email: 'admin@demo.com', role: 'Admin', avatar: 'AR', passwordHash },
      { id: 'u2', name: 'Nusrat Jahan', email: 'manager@demo.com', role: 'Manager', avatar: 'NJ', passwordHash },
      { id: 'u3', name: 'Tanvir Hasan', email: 'member@demo.com', role: 'Team Member', avatar: 'TH', passwordHash }
    ],
    projects: [
      { id: 'p1', name: 'Rural Finance App', client: 'Shakti Foundation', deadline: '2026-07-12', progress: 72, riskScore: 38, budget: 42000 },
      { id: 'p2', name: 'Smart Loan Workflow', client: 'Finclusion Lab', deadline: '2026-06-28', progress: 44, riskScore: 82, budget: 30000 },
      { id: 'p3', name: 'Field Agent Portal', client: 'Village Ops', deadline: '2026-08-04', progress: 61, riskScore: 54, budget: 51000 },
      { id: 'p4', name: 'Analytics Migration', client: 'Internal', deadline: '2026-07-22', progress: 86, riskScore: 24, budget: 18000 }
    ],
    tasks: [
      { id: 't1', projectId: 'p1', title: 'Design AI insight dashboard', description: 'Create KPI cards and risk scoring UI.', status: 'todo', assignee: 'Ariyan Rahman', dueDate: '2026-06-18', priority: 'High', comments: 4 },
      { id: 't2', projectId: 'p1', title: 'Build role-based navigation', description: 'Admin, Manager and Team Member access layers.', status: 'progress', assignee: 'Nusrat Jahan', dueDate: '2026-06-15', priority: 'Medium', comments: 2 },
      { id: 't3', projectId: 'p2', title: 'Prototype Kanban drag flow', description: 'Allow tasks to move across workflow columns.', status: 'review', assignee: 'Tanvir Hasan', dueDate: '2026-06-11', priority: 'Urgent', comments: 7 },
      { id: 't4', projectId: 'p3', title: 'Create local dialect response samples', description: 'Prepare example intents for AI assistant.', status: 'done', assignee: 'Nusrat Jahan', dueDate: '2026-06-09', priority: 'Low', comments: 1 },
      { id: 't5', projectId: 'p2', title: 'Add biometric verification mock API', description: 'Simulate verification score and error handling.', status: 'todo', assignee: 'Tanvir Hasan', dueDate: '2026-06-25', priority: 'High', comments: 3 },
      { id: 't6', projectId: 'p1', title: 'Prepare analytics export layout', description: 'Weekly progress, workload and risk overview.', status: 'progress', assignee: 'Ariyan Rahman', dueDate: '2026-06-20', priority: 'Medium', comments: 2 }
    ],
    activity: [
      'Database initialized with demo users, projects and tasks.',
      'Nusrat moved “Build role-based navigation” to In Progress.',
      'AI flagged Smart Loan Workflow as high risk.'
    ]
  }
}

async function ensureDbFile() {
  try {
    await readFile(DB_PATH, 'utf8')
  } catch {
    await mkdir(dirname(DB_PATH), { recursive: true })
    await writeFile(DB_PATH, JSON.stringify(createSeedData(), null, 2))
  }
}

export async function readDb() {
  await ensureDbFile()
  const raw = await readFile(DB_PATH, 'utf8')
  return JSON.parse(raw)
}

export async function writeDb(data) {
  await mkdir(dirname(DB_PATH), { recursive: true })
  await writeFile(DB_PATH, JSON.stringify(data, null, 2))
  return data
}

export async function resetDb() {
  const data = createSeedData()
  await writeDb(data)
  return data
}

export function createId(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export function getDbPath() {
  return DB_PATH
}
