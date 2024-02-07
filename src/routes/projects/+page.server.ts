import { projects } from '$db'
import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
  const project = structuredClone(await projects.find().toArray())
  
  if (!project.length) {
    return error(404, 'Projects not found')
  }

  return { project }
}