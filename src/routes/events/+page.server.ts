import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types';
import { events } from '$db'

export const load: PageServerLoad = async () => {
  const eventsList = structuredClone(await events.find().toArray())

  if (!eventsList.length) {
    return error(404, 'Events not found')
  }

  return { events: eventsList}
}