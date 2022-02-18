import { createClient, ContentfulClientApi, Asset, Entry, TagLink } from 'contentful'
import { ISiteFields, IGameFields, ITalkFields, ITweetFields, ITrackFields, IRichImageFields, IMediaBundleFields } from 'types/generated/contentful'
import type { SiteData, GameData, TalkData, TweetData, TrackData, ImageAssetData, SoundAssetData, MediaBundleData } from 'types/contentData'

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

export function parseSiteData(entry: Entry<ISiteFields>): SiteData {
  if (!entry) {
    throw `${entry} entry passed to parseSiteData`
  }
  if (!entry.fields) {
    throw `Entry with ${entry.fields} fields passed to parseSiteData`
  }
  const siteData: SiteData = {
    title: entry.fields.title,
    subtitle: entry.fields.subtitle || null,
    description: entry.fields.description || null,
    author: {
      name: entry.fields.author.fields.name,
      links: entry.fields.author.fields.links || [],
      resumeUrl: entry.fields.author.fields.resume ? `https:${entry.fields.author.fields.resume.fields.file.url}` : null
    },
    shortBio: entry.fields.shortBio || null,
    lookingForWork: entry.fields.lookingForWork || null,
    bigProjects: entry.fields.bigProjects || null,
    smallProjects: entry.fields.smallProjects || null,
    speakingExperience: entry.fields.speakingExperience || null,
    contactInformation: entry.fields.contactInformation || null,
    disclaimer: entry.fields.disclaimer || null
  }
  return siteData
}

export function parseGameData(entry: Entry<IGameFields>): GameData {
  if (!entry) {
    throw `${entry} entry passed to parseGameData`
  }
  if (!entry.fields) {
    throw `Entry with ${entry.fields} fields passed to parseGameData`
  }
  const gameData: GameData = {
    title: entry.fields.title,
    slug: entry.fields.slug,
    thumbnail: entry.fields.thumbnail ? parseImageData(entry.fields.thumbnail) : null,
    image: parseImageData(entry.fields.image),
    images: entry.fields.images?.map(x => parseImageData(x)) || [],
    isBigProject: entry.fields.isBigProject,
    order: entry.fields.order || -9999,
    role: entry.fields.role || null,
    releaseDate: entry.fields.releaseDate || null,
    playUrl: entry.fields.playUrl || null,
    links: entry.fields.links || [],
    overview: entry.fields.overview || null,
    development: entry.fields.development || null,
    reception: entry.fields.reception || null,
    credits: entry.fields.credits || null
  }
  return gameData
}

export function parseTalkData(entry: Entry<ITalkFields>): TalkData {
  if (!entry) {
    throw `${entry} entry passed to parseTalkData`
  }
  if (!entry.fields) {
    throw `Entry with ${entry.fields} fields passed to parseTalkData`
  }
  const gameData: TalkData = {
    title: entry.fields.title,
    thumbnail: parseImageData(entry.fields.thumbnail),
    order: entry.fields.order || -9999,
    event: entry.fields.event || null,
    eventUrl: entry.fields.eventUrl || null,
    recordingUrl: entry.fields.recordingUrl || null
  }
  return gameData
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
        linkUrl: image.fields.linkUrl || null,
        alt: image.fields.description || null,
        caption: image.fields.caption || null,
        width: image.fields.width || null,
        height: image.fields.height || null,
        isPixelArt: image.fields.isPixelArt ?? false,
        animated: image.fields.imageUrl.includes('.gif')
      }
    }
    else if (image.fields.image) {
      const tags = image.fields.image.metadata.tags.map(x => parseTag(x))
      return {
        url: `https:${image.fields.image.fields.file.url}`,
        linkUrl: image.fields.linkUrl || null,
        alt: image.fields.description ?? image.fields.image.fields.description,
        caption: image.fields.caption || null,
        width: image.fields.width || image.fields.image.fields.file.details.image?.width || null,
        height: image.fields.height || image.fields.image.fields.file.details.image?.height || null,
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
      linkUrl: null,
      alt: image.fields.description ?? null,
      caption: null,
      width: image.fields.file.details.image?.width || null,
      height: image.fields.file.details.image?.height || null,
      isPixelArt: tags.includes('pixelArt'),
      animated: image.fields.file.url.includes('.gif')
    }
  }
}
function isRichImage(image: Asset | Entry<IRichImageFields>): image is Entry<IRichImageFields> {
  return (image as Entry<IRichImageFields>).sys?.contentType?.sys?.id == 'richImage';
}

export function parseTweetData(entry: Entry<ITweetFields>): TweetData {
  if (!entry) {
    throw `${entry} entry passed to parseTweetData`
  }
  if (!entry.fields) {
    throw `Entry with ${entry.fields} fields passed to parseTweetData`
  }
  let id
  let matches = /.+\/(.+$)$/g.exec(entry.fields.url)
  if (matches != null && matches.length > 1) {
    id = matches[1]
  }
  if (id == undefined) {
    throw `Could not parse Tweet ID from url \"${entry.fields.url}\"`
  }
  return {
    ...entry.fields,
    id
  }
}

export function parseTrackData(entry: Entry<ITrackFields>): TrackData {
  if (!entry) {
    throw `${entry} entry passed to parseTrackData`
  }
  if (!entry.fields) {
    throw `Entry with ${entry.fields} fields passed to parseTrackData`
  }
  return {
    soundCloudUrl: entry.fields.soundCloudUrl
  }
}

export function parseMediaBundle(entry: Entry<IMediaBundleFields>): MediaBundleData {
  if (!entry) {
    throw `${entry} entry passed to parseMediaBundle`
  }
  if (!entry.fields) {
    throw `Entry with ${entry.fields} fields passed to parseMediaBundle`
  }
  const media: ImageAssetData[] = []
  if (entry.fields.assets) {
    for (let asset of entry.fields.assets) {
      media.push(parseImageData(asset))
    }
  }
  if (entry.fields.entries) {
    for (let subEntry of entry.fields.entries) {
      if (isEntryARichImage(subEntry)) {
        media.push(parseImageData(subEntry))
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
      subtitle: '[placeholder subtitle]',
      description: '[placeholder description]',
      author: {
        name: '[placeholder name]',
        links: [],
        resumeUrl: '#'
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
      thumbnail: null,
      image: {
        url: '/images/placeholder.png',
        linkUrl: null,
        width: 128,
        height: 128,
        alt: '[placeholder description]',
        caption: null,
        isPixelArt: true,
        animated: false
      },
      images: [],
      isBigProject: true,
      order: 0,
      role: '[placeholder role]',
      releaseDate: '2020-01-01',
      playUrl: null,
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

export async function getAllTalkData(): Promise<TalkData[]> {
  if (process.env.MOCK_CONTENT == 'true') {
    return []
  }
  else {
    const entries = await getOrCreateClient().getEntries<ITalkFields>({
      content_type: 'talk'
    })
    return entries.items.map(x => parseTalkData(x)).sort((a, b) => b.order - a.order)
  }
}
