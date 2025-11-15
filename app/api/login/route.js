import { NextResponse } from 'next/server'
import { findUser } from '@/lib/db'

export async function POST(req) {
  const { email } = await req.json()
  const user = findUser(email)
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }
  return NextResponse.json({ user })
}
