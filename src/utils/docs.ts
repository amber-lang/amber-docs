import config from '@/../docs/index.json'

export function getTableOfContents() {
  return config.docs
}

export function getDocDescriptor(path: string) {
  const index = config.docs.findIndex((doc) => doc.path === path)
  return { index, ...config.docs[index] }
}