import config from '@/../docs/index.json'

export function getTableOfContents() {
  return config.docs
}

export function* getFlatTableOfContents() {
  for (const doc of config.docs) {
    yield doc
    if (doc.docs) {
      yield* doc.docs
    }
  }
}

export function getDocDescriptor(path: string) {
  const docs = Array.from(getFlatTableOfContents())
  const index = docs.findIndex((doc) => doc.path === path)
  return { index, ...docs[index] }
}