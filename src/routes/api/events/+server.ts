import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { events } from '$db'
import { ObjectId } from 'mongodb'

export const GET: RequestHandler = async () => {
  return json(await events.find().toArray())
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, 'Unauthorized')
  }

  let { title, description, date, time, duration } = await request.json()

  if (!title || !description || !date || !time || !duration) {
    return error(400, 'Bad request: missing fields')
  }

  await events.insertOne({ title, description, date, time, duration })

  return json({ message: 'ok' })
}

export const DELETE: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, 'Unauthorized')
  }

  const { id } = await request.json()
  
  if (!id) {
    return error(400, 'Bad request: missing fields')
  }

  const eventId = new ObjectId(id)

  await events.deleteOne({ _id: eventId })

  return json({ message: 'ok' })
}

export const PUT: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, 'Unauthorized')
  }

  let { id, title, description, date, time, duration } = await request.json()
  
  if (!id || !title || !description || !date || !time || !duration) {
    return error(400, 'Bad request: missing fields')
  }
  
  const eventId = new ObjectId(id)

  await events.updateOne({ _id: eventId }, { $set: { title, description, date, time, duration } })

  return json({ message: 'ok' })
}