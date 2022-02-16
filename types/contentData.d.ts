import { Document } from '@contentful/rich-text-types'

export type SiteData = {
  title: string
  subtitle: string | null
  description: string | null
  author: PersonData
  shortBio: Document | string | null
  lookingForWork: Document | string | null
  bigProjects: Document | string | null
  smallProjects: Document | string | null
  speakingExperience: Document | string | null
  contactInformation: Document | string | null
  disclaimer: Document | string | null
}

export type GameData = {
  title: string
  slug: string
  thumbnail: ImageAssetData | null
  image: ImageAssetData
  images: ImageAssetData[]
  isBigProject: boolean
  order: number
  role: string | null
  releaseDate: string | null
  playUrl: string | null
  links: string[]
  overview: Document | string | null
  development: Document | string | null
  reception: Document | string | null
  credits: Document | string | null
}

export type TweetData = {
  id: string
  url: string
}

export type TrackData = {
  soundCloudUrl: string
}

export type ImageAssetData = {
  url: string
  linkUrl: string | null
  alt: string | null
  caption: Document | string | null
  width: number | null
  height: number | null
  isPixelArt: boolean
  animated: boolean
}

export type SoundAssetData = {
  url: string
  description: string | null
}

export type MediaBundleData = {
  media: ImageAssetData[]
}

export type PersonData = {
  name: string
  links: string[]
  resumeUrl: string | null
}
