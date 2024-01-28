import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { users } from '$db'
import { ObjectId } from 'mongodb'

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user || locals.user.role !== 'admin') {
    return error(401, 'Unauthorized')
  }

  return json(await users.find().toArray())
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user || locals.user.role !== 'admin') {
    return error(401, 'Unauthorized')
  }

  const { email, password, role } = await request.json()

  if (!email || !password || !role) {
    return error(400, 'Bad request: missing fields')
  }

  await users.insertOne({ email, password, role })

  return json({ message: 'ok' })
}

export const DELETE: RequestHandler = async ({ request, locals }) => {
  if (!locals.user || locals.user.role !== 'admin') {
    return error(401, 'Unauthorized')
  }

  const { id } = await request.json()
  
  if (!id) {
    return error(400, 'Bad request: missing fields')
  }

  if (locals.user.id === id) {
    return error(401, 'You cannot delete your user')
  }

  const userId = new ObjectId(id)

  await users.deleteOne({ _id: userId })

  return json({ message: 'ok' })
}

export const PUT: RequestHandler = async ({ request, locals }) => {
  if (!locals.user || locals.user.role !== 'admin') {
    return error(401, 'Unauthorized')
  }

  const { id, email, password, role } = await request.json()
  
  if (!id || !email || !password || !role) {
    return error(400, 'Bad request: missing fields')
  }

  if (locals.user.id === id) {
    return error(401, 'You cannot edit your user')
  }
  
  const userId = new ObjectId(id)
  
  await users.updateOne({ _id: userId }, { $set: { email, password, role } })

  return json({ message: 'ok' })
}