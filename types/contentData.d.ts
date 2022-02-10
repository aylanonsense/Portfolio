import { Document } from '@contentful/rich-text-types'

export type SiteData = {
  title: string
  subtitle?: string | undefined
  description?: string | undefined
  author: PersonData
  shortBio?: Document | string | undefined
  bigProjects?: Document | string | undefined
  smallProjects?: Document | string | undefined
  speakingExperience?: Document | string | undefined
  contactInformation?: Document | string | undefined
  disclaimer?: Document | string | undefined
}

export type GameData = {
  title: string
  slug: string
  image: ImageAssetData
  images: ImageAssetData[]
  order: number
  role?: string | undefined
  releaseDate?: string | undefined
  playUrl?: string | undefined
  links: string[]
  overview?: Document | string | undefined
  development?: Document | string | undefined
  reception?: Document | string | undefined
  credits?: Document | string | undefined
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
  linkUrl?: string | undefined
  alt?: string | undefined
  caption?: Document | string | undefined
  width?: number | undefined
  height?: number | undefined
  isPixelArt: boolean
}

export type MediaBundleData = {
  media: ImageAssetData[]
}

export type PersonData = {
  name: string
  links: string[]
}
