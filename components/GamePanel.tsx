import Link from 'next/link'
import Image from 'next/image'

type GamePanelProps = {
  slug: string,
  title: string,
  image: ImageAssetData
}

const GamePanel = ({ slug, title, image }: GamePanelProps) => (
  <div style={{ imageRendering: 'pixelated' }}>
    <Link href={`/games/${slug}`}>
      <Image
        src={image.url}
        alt={title}
        width={image.width}
        height={image.height} />
    </Link>
  </div>
)

export default GamePanel
