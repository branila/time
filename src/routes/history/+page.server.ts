import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types';
import { history } from '$db'

export const load: PageServerLoad = async () => {
  const articles = structuredClone(await history.find().toArray())
  
  if (!articles.length) {
    return error(404, 'Articles not found')
  }

  return { articles }
}