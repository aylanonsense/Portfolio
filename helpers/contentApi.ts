import type { ContentfulClientApi } from 'contentful'
import { createClient } from 'contentful'
import { ISiteFields, IGameFields } from 'types/generated/contentful'

let client: ContentfulClientApi

function getOrCreateClient() {
  if (client == undefined) {
    if (process.env.CONTENTFUL_SPACE_ID == undefined) {
      throw 'Environment variable CONTENTFUL_SPACE_ID is not defined!'
    }
    if (process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN == undefined) {
      throw 'Environment variable CONTENTFUL_DELIVERY_API_ACCESS_TOKEN is not defined!'
    }
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN
    })
  }
  return client
}

export async function getSiteData(): Promise<SiteData> {
  const entries = await getOrCreateClient().getEntries<ISiteFields>({
    content_type: 'site'
  })
  return {
    ...entries.items[0].fields,
    author: entries.items[0].fields.author.fields
  } as SiteData
}

export async function getGameData(slug: string): Promise<GameData> {
  const entries = await getOrCreateClient().getEntries<IGameFields>({
    content_type: 'game',
    'fields.slug': slug
  })
  return entries.items[0].fields as GameData
}

export async function getAllGameData(): Promise<GameData[]> {
  const entries = await getOrCreateClient().getEntries<IGameFields>({
    content_type: 'game'
  })
  return entries.items.map(x => x.fields as GameData)
}
