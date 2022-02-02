import Link from 'next/link'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import type { Options } from '@contentful/rich-text-react-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

let host

const baseOptions: Options = {
  renderNode: {
    [INLINES.ASSET_HYPERLINK]: (node, children) => <a href={`https:${node.data.target.fields.file.url}`} target="_blank">{children}</a>,
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

export default function renderRichText(richText: any, options?: Options): JSX.Element {
  return documentToReactComponents(richText, { ...baseOptions, ...options }) as JSX.Element
}
