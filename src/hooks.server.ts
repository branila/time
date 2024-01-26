import type { Handle } from '@sveltejs/kit'
import { JWT_SECRET } from '$env/static/private'
import jwt, { type JwtPayload } from 'jsonwebtoken'
import { ObjectId } from 'mongodb'
import databaseConnection, { users } from '$db'

databaseConnection()

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('AuthToken')

  if (token) {
    try {
      const { id } = jwt.verify(token, JWT_SECRET) as JwtPayload
      
      const user = await users.findOne({ _id: new ObjectId(id) })

      if (!user) {
        throw new Error('User not found')
      }

      event.locals.user = {
        id: user._id.toString(),
        username: user.username,
      }
    } catch (err) {
      console.error('Error: ', err)
    }
  }

  return await resolve(event)
}