import Link from 'next/link'
import { INLINES, Document } from '@contentful/rich-text-types';
import type { Options } from '@contentful/rich-text-react-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import type { GameData } from 'types/contentData'

const baseOptions: Options = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node, children) => <a href={`https:${node.data.target.fields.file.url}`} target="_blank" rel="noreferrer">{children}</a>,
    [INLINES.ENTRY_HYPERLINK]: (node, children) => {
      switch (node.data.target.sys.contentType.sys.id) {
        case "game":
          const game = node.data.target.fields as GameData
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
