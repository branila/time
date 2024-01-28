import { json, error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'
import { users } from '$db'
import { ObjectId } from 'mongodb'

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return error(401, 'Unauthorized')
  }

  return json((await users.find({ _id: new ObjectId(locals.user.id) }).toArray())[0])
}