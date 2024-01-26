import type { Actions } from './$types'
import { redirect, fail } from '@sveltejs/kit'

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    if (!username || !password) {
      return fail(400, { error: 'Missing email or password' })
    }
    

    return { success: true }
  },
} satisfies Actions