import { ReactNode } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types'
import { documentToReactComponents, Options as ContentfulOptions } from '@contentful/rich-text-react-renderer'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import { ImageAssetData, TrackData } from 'types/contentData'
import { parseGameData, parseTweetData, parseTrackData, parseImageData, parseSoundData, parseMediaBundle } from 'helpers/contentApi'
import RichImage from 'components/RichImage'
import styles from 'styles/helpers/renderRichText.module.scss'

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false })

export type Options = {
  imageClassName?: string | undefined
  renderOptions?: ContentfulOptions
  renderImage?: (image: ImageAssetData, baseRenderImage: (image: ImageAssetData) => ReactNode) => ReactNode,
  renderTrack?: (track: TrackData, baseRenderTrack: (track: TrackData) => ReactNode) => ReactNode
}

export default function renderRichText(richText: Document | string, options?: Options): JSX.Element {
  const baseRenderImage = (image: ImageAssetData): ReactNode => <RichImage className={options?.imageClassName} image={image} />
  const baseRenderTrack = (track: TrackData): ReactNode => <ReactPlayer className={styles.soundCloudPlayer} url={track.soundCloudUrl} width="100%" height="150px" />

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
              return (
                <div className={styles.tweetEmbed}>
                  <TwitterTweetEmbed
                    tweetId={tweet.id}
                    options={{ conversation: 'none', align: 'center', dnt: true, theme: 'dark' }} />
                </div>
              )
            case "richImage":
              const image = parseImageData(data.target)
              return options?.renderImage ? options.renderImage(image, baseRenderImage) : baseRenderImage(image)
            case "track":
              const track = parseTrackData(data.target)
              return options?.renderTrack ? options.renderTrack(track, baseRenderTrack) : baseRenderTrack(track)
            case "mediaBundle":
              const bundle = parseMediaBundle(data.target)
              return (
                <div className={styles.mediaBundle}>
                  {bundle.media.map(x => {
                    const image = (x as ImageAssetData)
                    return <div key={image.url}>
                      {options?.renderImage ? options.renderImage(image, baseRenderImage) : baseRenderImage(image)}
                    </div>
                  })}
                </div>
              )
            default:
              return <div>[unsure how to display entry of type "{data.target.sys.contentType.sys.id}"]</div>
          }
        },
        [BLOCKS.EMBEDDED_ASSET]: ({ data }, children) => {
          if (data.target.fields.file.details.image) {
            const image = parseImageData(data.target)
            return options?.renderImage ? options.renderImage(image, baseRenderImage) : baseRenderImage(image);
          }
          else if (data.target.fields.file.contentType == 'audio/x-wav') {
            const sound = parseSoundData(data.target)
            return (
              <figure>
                {sound.description && <figcaption>{sound.description}</figcaption>}
                <audio controls src={sound.url}>
                  Your browser does not support the <code>audio</code> element.
                </audio>
              </figure>
            )
          }
          else {
            console.log(data.target)
            return <div>[unsure how to display asset "{data.target.fields.title}"]</div>
          }
        },
        [INLINES.HYPERLINK]: ({ data }, children) => <a href={data.uri} target="_blank" rel="noopener noreferrer">{children}</a>,
        [INLINES.ASSET_HYPERLINK]: ({ data }, children) => <a href={`https:${data.target.fields.file.url}`} target="_blank" rel="noopener noreferrer">{children}</a>,
        [INLINES.ENTRY_HYPERLINK]: ({ data }, children) => {
          switch (data.target.sys.contentType.sys.id) {
            case "game":
              const game = parseGameData(data.target)
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
