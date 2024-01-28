import type { Actions } from './$types'
import { fail } from '@sveltejs/kit'
import { users } from '$db'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, ENV } from '$env/static/private'

export const load = async ({ locals }) => {
  return { loggedIn: locals.user ? true : false }
}

export const actions = {
  login: async ({ request, cookies, locals }) => {
    if (locals.user) {
      cookies.delete('AuthToken', { path: '/' })
    }

    const data = await request.formData()
    const username = data.get('username') 
    const password = data.get('password')

    if (!username || !password) {
      return fail(400, { error: 'Email o password mancanti' })
    }

    const user = await users.findOne({ username })

    if (!user) {
      return fail(401, { error: 'Credenziali non valide' })
    }

    const match = bcrypt.compare(password as string, user.password)

    if (!match) {
      return fail(401, { error: 'Credenziali non valide' })
    }

    const payload = { id: user._id.toString() }
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

  logout: async ({ cookies }) => {
    cookies.delete('AuthToken', { path: '/' })

    return { loggedOut: true }
  }
} satisfies Actions