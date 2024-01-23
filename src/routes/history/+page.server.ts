import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types';
import Database from '$db'

export const load: PageServerLoad = async () => {
  const articles = structuredClone(await Database.history.find().toArray())

  
  if (!articles) {
    return error(404, 'Articles not found')
  }

  return { articles }
}