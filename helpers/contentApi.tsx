import { createClient, ContentfulClientApi, Asset, Entry, TagLink } from 'contentful'
import { ISiteFields, IGameFields, ITweetFields } from 'types/generated/contentful'
import type { SiteData, GameData, TweetData, ImageAssetData } from 'types/contentData'

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

export function parseSiteData(fields: ISiteFields): SiteData {
  return {
    ...fields,
    author: fields.author.fields
  }
}

export function parseGameData(entry: Entry<IGameFields>): GameData {
  return {
    ...entry.fields,
    image: parseImageData(entry.fields.image)
  }
}

export function parseImageData(image: Asset): ImageAssetData {
  const tags = image.metadata.tags.map(x => parseTag(x))
  return {
    ...image.fields,
    url: `https:${image.fields.file.url}`,
    width: image.fields.file.details.image?.width,
    height: image.fields.file.details.image?.height,
    isPixelArt: tags.includes('pixelArt')
  }
}

export function parseTweetData(fields: ITweetFields): TweetData {
  let id
  let matches = /.+\/(.+$)$/g.exec(fields.url)
  if (matches != null && matches.length > 1) {
    id = matches[1];
  }
  if (id == undefined) {
    throw `Could not parse Tweet ID from url \"${fields.url}\"`
  }
  return {
    ...fields,
    id
  }
}

export function parseTag(tag: TagLink): string {
  return tag.sys.id
}

export async function getSiteData(): Promise<SiteData> {
  if (process.env.MOCK_CONTENT == 'true') {
    return {
      title: '[placeholder title]',
      description: '[placeholder description]',
      author: {
        name: '[placeholder name]',
        twitterUrl: '#',
        instagramUrl: '#',
        itchUrl: '#',
        gitHubUrl: '#'
      },
      shortBio: '[placeholder bio]',
      bigProjects: '[placeholder big projects]',
      smallProjects: '[placeholder small projects]',
      speakingExperience: '[placeholder speaking experience]',
      contactInformation: '[placeholder contact information]',
      disclaimer: '[placeholder disclaimer]'
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
      slug: slug,
      image: {
        url: '/images/placeholder.png',
        width: 128,
        height: 128,
        description: '[placeholder description]',
        tags: []
      },
      order: 0,
      role: '[placeholder role]',
      releaseDate: '2020-01-01',
      itchUrl: '[placeholder itch.io URL]',
      lexaloffleUrl: '#',
      newgroundsUrl: '#',
      gameJoltUrl: '#',
      gitHubUrl: '#',
      overview: '[placeholder overview]',
      development: '[placeholder development]',
      reception: '[placeholder reception]',
      credits: '[placeholder credits]'
    }
  }
  else {
    const entries = await getOrCreateClient().getEntries<IGameFields>({
      content_type: 'game',
      'fields.slug': slug
    })
    return parseGameData(entries.items[0])
  }
}

export async function getAllGameData(): Promise<GameData[]> {
  if (process.env.MOCK_CONTENT == 'true') {
    return [
      await getGameData('placeholder-slug-1'),
      await getGameData('placeholder-slug-2'),
      await getGameData('placeholder-slug-3'),
      await getGameData('placeholder-slug-4'),
      await getGameData('placeholder-slug-5'),
      await getGameData('placeholder-slug-6'),
      await getGameData('placeholder-slug-7'),
      await getGameData('placeholder-slug-8'),
      await getGameData('placeholder-slug-9'),
      await getGameData('placeholder-slug-10'),
      await getGameData('placeholder-slug-11'),
      await getGameData('placeholder-slug-12')
    ]
  }
  else {
    const entries = await getOrCreateClient().getEntries<IGameFields>({
      content_type: 'game'
    })
    return entries.items.map(x => parseGameData(x)).sort((a, b) => b.order - a.order)
  }
}
