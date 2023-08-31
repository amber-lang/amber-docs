import { promises as fs } from 'fs'
import path from 'path'

export async function getDoc(givenPath: string) {
  const PATH = path.join(process.cwd(), 'docs', `${givenPath}.md`)  
  try { await fs.access(PATH) } catch {
    return null
  }
  return await fs.readFile(PATH, 'utf-8')
}
