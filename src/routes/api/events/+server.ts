import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { events } from '$db'
import { ObjectId } from 'mongodb'

export const GET: RequestHandler = async () => {
  return json(await events.find().toArray())
}

export const POST: RequestHandler = async ({ request }) => {
  const { title, description, content } = await request.json()

  if (!title || !description || !content) {
    return error(400, 'Bad request: missing fields')
  }

  await events.insertOne({ title, description, content })

  return json({ message: 'ok' })
}

export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json()
  
  if (!id) {
    return error(400, 'Bad request: missing fields')
  }

  const eventId = new ObjectId(id)

  await events.deleteOne({ _id: eventId })

  return json({ message: 'ok' })
}

export const PUT: RequestHandler = async ({ request }) => {
  const { id, title, description, content } = await request.json()
  
  if (!id || !title || !description || !content) {
    return error(400, 'Bad request: missing fields')
  }
  
  const eventId = new ObjectId(id)

  await events.updateOne({ _id: eventId }, { $set: { title, description, content } })

  return json({ message: 'ok' })
}