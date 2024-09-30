import config from '@/../docs/index.json'

export function getTableOfContents() {
  return config.docs
}

export type FlatDoc = { path: string, title: string };

export function* getFlatTableOfContents(): Generator<FlatDoc, undefined, undefined> {
  for (const doc of config.docs) {
    yield doc as FlatDoc
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
