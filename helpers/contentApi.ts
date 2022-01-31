import { ContentfulClientApi, createClient } from 'contentful'

let client: ContentfulClientApi

function getOrCreateClient() {
  if (client == undefined) {
    if (process.env.CONTENTFUL_SPACE_ID == undefined) {
      throw 'Environment variable CONTENTFUL_SPACE_ID is not defined!'
    }
    if (process.env.CONTENTFUL_ACCESS_TOKEN == undefined) {
      throw 'Environment variable CONTENTFUL_ACCESS_TOKEN is not defined!'
    }
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
    })
  }
  return client
}

export async function getGame(slug: string): Promise<Game> {
  const entries = await getOrCreateClient().getEntries({
    content_type: 'game',
    'fields.slug': slug
  })
  return entries.items[0].fields as Game
}

export async function getAllGames(): Promise<Game[]> {
  const entries = await getOrCreateClient().getEntries({
    content_type: 'game'
  })
  return entries.items.map(x => x.fields as Game)
}
