import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { projects } from '$db'
import { ObjectId } from 'mongodb'
import { marked } from 'marked'

export const GET: RequestHandler = async () => {
  return json(await projects.find().toArray())
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, 'Unauthorized')
  }

  let { title, description, content } = await request.json()

  if (!title || !description || !content) {
    return error(400, 'Bad request: missing fields')
  }

  content = await marked.parse(content)

  await projects.insertOne({ title, description, content })

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

  const projectId = new ObjectId(id)

  if (!await projects.findOne({ _id: projectId })) {
    return error(404, 'Cannot delete non-existing project')
  }

  await projects.deleteOne({ _id: projectId })

  return json({ message: 'ok' })
}

export const PUT: RequestHandler = async ({ request, locals }) => {
  if (!locals.user) {
    return error(401, 'Unauthorized')
  }

  let { id, title, description, content } = await request.json()
  
  if (!id || !title || !description || !content) {
    return error(400, 'Bad request: missing fields')
  }
  
  const projectId = new ObjectId(id)

  if (!await projects.findOne({ _id: projectId })) {
    return error(404, 'Cannot update non-existing project')
  }

  content = await marked.parse(content)

  await projects.updateOne({ _id: projectId }, { $set: { title, description, content } })

  return json({ message: 'ok' })
}