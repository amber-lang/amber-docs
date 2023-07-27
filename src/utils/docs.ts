import config from '@/../docs/index.json'
import { promises as fs } from 'fs'

export function getTableOfContents() {
  return config.docs
}