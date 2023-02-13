import { type Stroke } from '../../utils/types'

export const newProject = async (name: string, strokes: Stroke[], image: string): Promise<any> =>
  await fetch('http://localhost:4000/projects/new', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      strokes,
      image
    })
  }).then(async res => await res.json())
