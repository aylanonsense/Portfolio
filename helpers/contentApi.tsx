import { createClient, ContentfulClientApi, Asset, Entry, TagLink } from 'contentful'
import { ISiteFields, IGameFields, ITweetFields, ITrackFields, IRichImageFields, IMediaBundleFields } from 'types/generated/contentful'
import type { SiteData, GameData, TweetData, TrackData, ImageAssetData, SoundAssetData, MediaBundleData } from 'types/contentData'
import { url } from 'inspector'

let client: ContentfulClientApi

function getOrCreateClient() {
  if (!client) {
    if (!process.env.CONTENTFUL_SPACE_ID) {
      throw 'Environment variable CONTENTFUL_SPACE_ID is not defined!'
    }
    if (process.env.PREVIEW_UNPUBLISHED_CONTENT == 'true') {
      if (!process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN) {
        throw 'Environment variable CONTENTFUL_PREVIEW_API_ACCESS_TOKEN is not defined!'
      }
      client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_PREVIEW_API_ACCESS_TOKEN,
        host: 'preview.contentful.com'
      })
    }
    else {
      if (!process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN) {
        throw 'Environment variable CONTENTFUL_DELIVERY_API_ACCESS_TOKEN is not defined!'
      }
      client = createClient({
        space: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_DELIVERY_API_ACCESS_TOKEN
      })
    }
  }
  return client
}

export function parseSiteData(site: Entry<ISiteFields>): SiteData {
  const siteData: SiteData = {
    ...site.fields,
    author: {
      ...site.fields.author.fields,
      links: site.fields.author.fields.links || []
    }
  }
  if (site.fields.author.fields.resume) {
    siteData.author.resumeUrl = `https:${site.fields.author.fields.resume.fields.file.url}`
  }
  return siteData
}

export function parseGameData(entry: Entry<IGameFields>): GameData {
  return {
    ...entry.fields,
    links: entry.fields.links || [],
    image: parseImageData(entry.fields.image),
    images: entry.fields.images?.map(x => parseImageData(x)) || []
  }
}

export function parseSoundData(sound: Asset): SoundAssetData {
  return {
    url: `https:${sound.fields.file.url}`,
    description: sound.fields.description
  }
}

export function parseImageData(image: Asset | Entry<IRichImageFields>): ImageAssetData {
  if (isRichImage(image)) {
    if (image.fields.imageUrl) {
      return {
        url: image.fields.imageUrl,
        linkUrl: image.fields.linkUrl,
        alt: image.fields.description,
        caption: image.fields.caption,
        width: image.fields.width,
        height: image.fields.height,
        isPixelArt: image.fields.isPixelArt ?? false,
        animated: image.fields.imageUrl.includes('.gif')
      }
    }
    else if (image.fields.image) {
      const tags = image.fields.image.metadata.tags.map(x => parseTag(x))
      return {
        url: `https:${image.fields.image.fields.file.url}`,
        linkUrl: image.fields.linkUrl,
        alt: image.fields.description ?? image.fields.image.fields.description,
        caption: image.fields.caption,
        width: image.fields.width ?? image.fields.image.fields.file.details.image?.width,
        height: image.fields.height ?? image.fields.image.fields.file.details.image?.height,
        isPixelArt: image.fields.isPixelArt ?? tags.includes('pixelArt'),
        animated: image.fields.image.fields.file.url.includes('.gif')
      }
    }
    else {
      throw `RichImage "${image.sys.id}" does not have a URL or an image field`
    }
  }
  else {
    const tags = image.metadata.tags.map(x => parseTag(x))
    return {
      url: `https:${image.fields.file.url}`,
      alt: image.fields.description ?? null,
      width: image.fields.file.details.image?.width,
      height: image.fields.file.details.image?.height,
      isPixelArt: tags.includes('pixelArt'),
      animated: image.fields.file.url.includes('.gif')
    }
  }
}
function isRichImage(image: Asset | Entry<IRichImageFields>): image is Entry<IRichImageFields> {
  return (image as Entry<IRichImageFields>).sys?.contentType?.sys?.id == 'richImage';
}

export function parseTweetData(tweet: Entry<ITweetFields>): TweetData {
  let id
  let matches = /.+\/(.+$)$/g.exec(tweet.fields.url)
  if (matches != null && matches.length > 1) {
    id = matches[1]
  }
  if (id == undefined) {
    throw `Could not parse Tweet ID from url \"${tweet.fields.url}\"`
  }
  return {
    ...tweet.fields,
    id
  }
}

export function parseTrackData(track: Entry<ITrackFields>): TrackData {
  return {
    soundCloudUrl: track.fields.soundCloudUrl
  }
}

export function parseMediaBundle(bundle: Entry<IMediaBundleFields>): MediaBundleData {
  const media: ImageAssetData[] = []
  if (bundle.fields.assets) {
    for (let asset of bundle.fields.assets) {
      media.push(parseImageData(asset))
    }
  }
  if (bundle.fields.entries) {
    for (let entry of bundle.fields.entries) {
      if (isEntryARichImage(entry)) {
        media.push(parseImageData(entry))
      }
    }
  }
  return {
    media
  }
}
function isEntryARichImage(image: Entry<any>): image is Entry<IRichImageFields> {
  return (image as Entry<IRichImageFields>).sys?.contentType?.sys?.id == 'richImage';
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
        links: []
      },
      shortBio: '[placeholder bio]',
      lookingForWork: '[placeholder lfw]',
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
    return parseSiteData(entries.items[0])
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
        alt: '[placeholder description]',
        isPixelArt: true,
        animated: false
      },
      images: [],
      order: 0,
      role: '[placeholder role]',
      releaseDate: '2020-01-01',
      links: [],
      overview: '[placeholder overview]',
      development: '[placeholder development]',
      reception: '[placeholder reception]',
      credits: '[placeholder credits]'
    }
  }
  else {
    const entries = await getOrCreateClient().getEntries<IGameFields>({
      content_type: 'game',
      'fields.slug': slug,
      include: 3
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
