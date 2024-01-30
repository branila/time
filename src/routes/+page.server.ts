import { events } from '$db';

import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const ev = structuredClone(await events.find().toArray())
  
  if (!ev) {
    return error(404, 'Articles not found')
  }

  return { ev }
}