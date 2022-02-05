import Link from 'next/link'
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import { parseGameData, parseTweetData } from 'helpers/contentApi'
import styles from 'styles/helpers/renderRichText.module.scss'

const baseOptions: Options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: ({ data }, children) => {
      switch (data.target.sys.contentType.sys.id) {
        case "tweet":
          const tweet = parseTweetData(data.target.fields)
          return <TwitterTweetEmbed
            tweetId={tweet.id}
            placeholder={<div className={styles.tweetPlaceholder}><p>Loading...</p></div>}
            options={{ conversation: 'none', align: 'center', dnt: true, theme: 'dark' }} />
        default:
          return <div>blah</div>
      }
    },
    [INLINES.HYPERLINK]: ({ data }, children) => <a href={data.uri} target="_blank" rel="noopener noreferrer">{children}</a>,
    [INLINES.ASSET_HYPERLINK]: ({ data }, children) => <a href={`https:${data.target.fields.file.url}`} target="_blank" rel="noopener noreferrer">{children}</a>,
    [INLINES.ENTRY_HYPERLINK]: ({ data }, children) => {
      switch (data.target.sys.contentType.sys.id) {
        case "game":
          const game = parseGameData(data.target.fields)
          return <Link href={`/games/${game.slug}`}>{(children as any)[0]}</Link>;
        default:
          return <span>[invalid link]</span>
      }
    }
  }
}

export default function renderRichText(richText: Document | string, options?: Options): JSX.Element {
  if (typeof richText == 'string') {
    return <p>{richText}</p>
  }
  else {
    return documentToReactComponents(richText, { ...baseOptions, ...options }) as JSX.Element
  }
}
