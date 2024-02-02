import { projects } from '$db';

import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const prog = structuredClone(await projects.find().toArray())
  
  if (!prog) {
    return error(404, 'Projects not found')
  }

  return { prog }
}