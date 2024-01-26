import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { users } from '$db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, ENV } from '$env/static/private'

export const load = async ({ locals }) => {
  if (locals.user) {
    return { loggedIn: true }
  } 

  return { loggedIn: false }
}

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData()

    const username = data.get('username') 
    const password = data.get('password')

    if (!username || !password) {
      return fail(400, { error: 'Missing email or password' })
    }

    const user = await users.findOne({ username })

    if (!user) {
      return fail(401, { error: 'Invalid credentials' })
    }

    const match = bcrypt.compare(password as string, user.password)

    if (!match) {
      return fail(401, { error: 'Invalid credentials' })
    }

    const payload = { id: user._id.toString(), username }
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '3d' })

    cookies.set('AuthToken', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: ENV == 'production',
      maxAge: 60 * 60 * 24 * 3,
    })
    
    return { success: true }
  },
} satisfies Actions