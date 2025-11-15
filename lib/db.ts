import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

export function readJSON(file: string) {
  const filePath = path.join(dataDir, file)
  const content = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(content)
}

export function writeJSON(file: string, data: any) {
  const filePath = path.join(dataDir, file)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function findUser(email: string) {
  const users = readJSON('users.json')
  return users.find((u: any) => u.email === email)
}

export function getItems() {
  return readJSON('items.json')
}

export function getStudentDesk(studentId: string) {
  const desks = readJSON('desks.json')
  return desks[studentId] || []
}

export function addItemToDesk(studentId: string, itemId: string, topic: string) {
  const desks = readJSON('desks.json')
  
  if (!desks[studentId]) {
    desks[studentId] = []
  }
  
  desks[studentId].push({
    itemId,
    topic,
    date: new Date().toISOString()
  })
  
  writeJSON('desks.json', desks)
}