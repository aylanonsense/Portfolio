import type { Asset, ContentfulClientApi } from 'contentful'
import { createClient } from 'contentful'
import { ISiteFields, IGameFields } from 'types/generated/contentful'

let client: ContentfulClientApi

function getOrCreateClient() {
  if (!client) {
    if (!process.env.CONTENTFUL_SPACE_ID) {
      throw 'Environment variable CONTENTFUL_SPACE_ID is not defined!'
    }
    if (!process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN) {
      throw 'Environment variable CONTENTFUL_DELIVERY_API_ACCESS_TOKEN is not defined!'
    }
    client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN
    })
  }
  return client
}

function parseSiteData(fields: ISiteFields): SiteData {
  return {
    ...fields,
    author: fields.author.fields
  } as SiteData
}

function parseGameData(fields: IGameFields): GameData {
  return {
    ...fields,
    image: parseImageData(fields.image)
  } as GameData
}

function parseImageData(image: Asset): ImageAssetData {
  return {
    url: `https:${image.fields.file.url}`,
    width: image.fields.file.details.image?.width,
    height: image.fields.file.details.image?.height
  } as ImageAssetData
}

export async function getSiteData(): Promise<SiteData> {
  if (process.env.MOCK_CONTENT == 'true') {
    return {
      title: '[placeholder title]',
      description: '[placeholder description]',
      author: {
        name: '[placeholder name]',
        twitterUrl: '[placeholder url]',
        instagramUrl: '[placeholder url]',
        itchUrl: '[placeholder url]',
        gitHubUrl: '[placeholder url]'
      }
    }
  }
  else {
    const entries = await getOrCreateClient().getEntries<ISiteFields>({
      content_type: 'site'
    })
    return parseSiteData(entries.items[0].fields)
  }
}

export async function getGameData(slug: string): Promise<GameData> {
  if (process.env.MOCK_CONTENT == 'true') {
    return {
      title: '[placeholder title]',
      slug: '[placeholder slug]',
      image: {
        url: '/images/placeholder.png',
        width: 128,
        height: 128
      },
      order: 0
    }
  }
  else {
    const entries = await getOrCreateClient().getEntries<IGameFields>({
      content_type: 'game',
      'fields.slug': slug
    })
    return parseGameData(entries.items[0].fields)
  }
}

export async function getAllGameData(): Promise<GameData[]> {
  if (process.env.MOCK_CONTENT == 'true') {
    return [{
      title: '[placeholder title]',
      slug: '[placeholder slug]',
      image: {
        url: '/images/placeholder.png',
        width: 128,
        height: 128
      },
      order: 0
    }]
  }
  else {
    const entries = await getOrCreateClient().getEntries<IGameFields>({
      content_type: 'game'
    })
    return entries.items.map(x => parseGameData(x.fields)).sort((a, b) => b.order - a.order)
  }
}
