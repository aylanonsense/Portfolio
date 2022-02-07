import { ReactNode } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options as ContentfulOptions } from '@contentful/rich-text-react-renderer'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { ImageAssetData } from 'types/contentData'
import { parseGameData, parseTweetData, parseTrackData, parseImageData } from 'helpers/contentApi'
import BetterImage from 'components/BetterImage'
import styles from 'styles/helpers/renderRichText.module.scss'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export type Options = {
  imageClassName?: string | undefined
  renderOptions?: ContentfulOptions
  renderImage?: (image: ImageAssetData) => ReactNode
}

export default function renderRichText(richText: Document | string, options?: Options): JSX.Element {
  if (typeof richText == 'string') {
    return <p>{richText}</p>
  }
  else {
    return documentToReactComponents(richText, {
      renderNode: {
        [BLOCKS.EMBEDDED_ENTRY]: ({ data }, children) => {
          switch (data.target.sys.contentType.sys.id) {
            case "tweet":
              const tweet = parseTweetData(data.target)
              return <TwitterTweetEmbed
                tweetId={tweet.id}
                placeholder={<div className={styles.tweetPlaceholder}><p>Loading...</p></div>}
                options={{ conversation: 'none', align: 'center', dnt: true, theme: 'dark' }} />
            case "richImage":
              const image = parseImageData(data.target)
              if (options?.renderImage) {
                return options.renderImage(image)
              }
              else {
                return <BetterImage className={options?.imageClassName} image={image} />
              }
            case "track":
              const track = parseTrackData(data.target)
              return <ReactPlayer className={styles.soundCloudPlayer} url={track.soundCloudUrl} height="150px" />
            default:
              return <div>[unsure how to display entry of type "{data.target.sys.contentType.sys.id}"]</div>
          }
        },
        [BLOCKS.EMBEDDED_ASSET]: ({ data }, children) => {
          if (data.target.fields.file.details.image) {
            const image = parseImageData(data.target)
            if (options?.renderImage) {
              return options.renderImage(image)
            }
            else {
              return <BetterImage className={options?.imageClassName} image={image} />
            }
          }
          else {
            return <div>[unsure how to display asset "{data.target.fields.title}"]</div>
          }
        },
        [INLINES.HYPERLINK]: ({ data }, children) => <a href={data.uri} target="_blank" rel="noopener noreferrer">{children}</a>,
        [INLINES.ASSET_HYPERLINK]: ({ data }, children) => <a href={`https:${data.target.fields.file.url}`} target="_blank" rel="noopener noreferrer">{children}</a>,
        [INLINES.ENTRY_HYPERLINK]: ({ data }, children) => {
          switch (data.target.sys.contentType.sys.id) {
            case "game":
              const game = parseGameData(data.target.fields)
              return <Link href={`/games/${game.slug}`}>{(children as any)[0]}</Link>
            default:
              return <span>[unsure how to link to entry of type "{data.target.sys.contentType.sys.id}"]</span>
          }
        }
      },
      ...options?.renderOptions
    }) as JSX.Element
  }
}
