import type { Actions } from './$types'

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const username = data.get('username')
    const password = data.get('password')

    console.log(`${username}:${password}`)

    return { success: true }
  },
} satisfies Actions