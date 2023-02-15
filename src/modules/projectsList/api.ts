import { type Project } from '../../utils/types'

export const fetchProjectsList = async (): Promise<Project[]> =>
  await fetch('http://localhost:4000/projects').then(async res => await res.json())
