import { promises as fs } from 'fs'

export async function getDoc(path: string) {
  const PATH = `./docs/${path}.md`
  try { await fs.access(PATH) } catch {
    return null
  }
  return await fs.readFile(PATH, 'utf-8')
}
