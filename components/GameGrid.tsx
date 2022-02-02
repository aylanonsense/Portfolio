import Link from 'next/link'
import Image from 'next/image'
import styles from 'styles/components/GameGrid.module.scss'

type GameGridProps = {
  games: GameData[]
}

const GameGrid = ({ games }: GameGridProps) => (
  <div className={styles.gameGrid}>
    {games.map(game =>
      <GameGridCell
        key={game.slug}
        slug={game.slug}
        title={game.title}
        image={game.image} />
    )}
  </div>
)

type GameGridCellProps = {
  slug: string,
  title: string,
  image: ImageAssetData
}

const GameGridCell = ({ slug, title, image }: GameGridCellProps) => (
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

export default GameGrid
