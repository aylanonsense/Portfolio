import Link from 'next/link'
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const options = {
  renderNode: {
    //[BLOCKS.PARAGRAPH]: (node: any, children: any): JSX.Element => (
    //  <p className={styles.whateva}>{children}</p>
    //),
    [INLINES.ENTRY_HYPERLINK]: (node: any, children: any) => {
      switch (node.data.target.sys.contentType.sys.id) {
        case "game":
          const game = node.data.target.fields as GameData
          return <Link href={`/games/${game.slug}`}>{children[0]}</Link>;
        default:
          return <span>[invalid link]</span>
      }
    }
  }
}

export default function renderRichText(richText: any): JSX.Element {
  return documentToReactComponents(richText, options) as JSX.Element
}
