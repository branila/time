import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { history } from '$db'
import { ObjectId } from 'mongodb'

export const GET: RequestHandler = async () => {
  return json(await history.find().toArray())
}

export const POST: RequestHandler = async ({ request }) => {
  const { title, description, content } = await request.json()

  if (!title || !description || !content) {
    return error(400, 'Bad request: missing fields')
  }

  await history.insertOne({ title, description, content })

  return json({ message: 'ok' })
}

export const DELETE: RequestHandler = async ({ request }) => {
  const { id } = await request.json()
  const articleId = new ObjectId(id)

  if (!id) {
    return error(400, 'Bad request: missing fields')
  }

  await history.deleteOne({ _id: articleId })

  return json({ message: 'ok' })
}

export const PUT: RequestHandler = async ({ request }) => {
  const { id, title, description, content } = await request.json()
  const articleId = new ObjectId(id)

  if (!id || !title || !description || !content) {
    return error(400, 'Bad request: missing fields')
  }

  await history.updateOne({ _id: articleId }, { $set: { title, description, content } })

  return json({ message: 'ok' })
}