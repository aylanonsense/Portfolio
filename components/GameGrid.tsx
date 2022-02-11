import type { GameData } from 'types/contentData'
import RichImage from 'components/RichImage'
import styles from 'styles/components/GameGrid.module.scss'

type GameGridProps = {
  games: GameData[]
}

const GameGrid = ({ games }: GameGridProps) => (
  <div className={styles.gameGrid}>
    {games.map(game =>
      <div key={game.slug} style={{ imageRendering: game.image.isPixelArt ?'pixelated' : undefined }}>
        <RichImage
          image={game.image}
          linkUrl={`/games/${game.slug}`}
          externalLink={false}
          alt={game.title} />
      </div>
    )}
  </div>
)

export default GameGrid
