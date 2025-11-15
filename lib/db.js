import fs from 'fs'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')

export function readJSON(file) {
  const filePath = path.join(dataDir, file)
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
}

export function writeJSON(file, data) {
  const filePath = path.join(dataDir, file)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function findUser(email) {
  const users = readJSON('users.json')
  return users.find(u => u.email === email)
}

export function getItems() {
  return readJSON('items.json')
}

export function getStudentDesk(studentId) {
  const desks = readJSON('desks.json')
  return desks[studentId] || []
}

export function addItemToDesk(studentId, itemId, topic) {
  const desks = readJSON('desks.json')
  if (!desks[studentId]) desks[studentId] = []
  desks[studentId].push({ itemId, topic, date: new Date().toISOString() })
  writeJSON('desks.json', desks)
}

export function findQuestionSet(code) {
  const sets = readJSON('sets.json')
  return sets.find(s => s.code === code)
}

export function getAllQuestionSets() {
  return readJSON('sets.json')
}

export function createQuestionSet(setData) {
  const sets = readJSON('sets.json')
  sets.push(setData)
  writeJSON('sets.json', sets)
  return setData
}

export function recordAttendance(studentId, setId, correct, chosenItem = null) {
  const attendance = readJSON('attendance.json')
  attendance.push({
    studentId,
    setId,
    correct,
    chosenItem,
    timestamp: new Date().toISOString()
  })
  writeJSON('attendance.json', attendance)
}

export function getAttendanceStats() {
  const attendance = readJSON('attendance.json')
  const byDate = {}
  attendance.forEach(record => {
    const date = record.timestamp.split('T')[0]
    byDate[date] = (byDate[date] || 0) + 1
  })
  return {
    total: attendance.length,
    byDate: Object.entries(byDate).map(([date, count]) => ({ date, count }))
  }
}

export function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}
