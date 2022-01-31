const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchEntries() {
  const entries = await client.getEntries({
    content_type: 'game' //,
    //'fields.title[ne]': '8 Legs to Love'
  })
  return entries.items
}

export async function fetchEntry(slug: string) {
  const entries = await client.getEntries({
    content_type: 'game',
    'fields.slug': slug
    //'fields.title[ne]': '8 Legs to Love'
  })
  return entries.items
}

export default { fetchEntries }
