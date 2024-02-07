import { events } from '$db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const event = structuredClone(await events.find().toArray())
  
  if (!event) {
    return error(404, 'Articles not found')
  }

  return { event }
}