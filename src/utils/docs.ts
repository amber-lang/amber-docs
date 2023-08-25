import config from '@/../docs/index.json'

export function getTableOfContents() {
  return config.docs
}

export function getDocDescriptor(path: string) {
  return config.docs.find((doc) => doc.path === path)
}