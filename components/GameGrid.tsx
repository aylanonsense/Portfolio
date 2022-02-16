import type { GameData } from 'types/contentData'
import RichImage from 'components/RichImage'
import styles from 'styles/components/GameGrid.module.scss'

type GameGridProps = {
  games: GameData[]
  mini?: boolean | undefined
}

const GameGrid = ({ games, mini }: GameGridProps) => (
  <div className={`${styles.gameGrid} ${mini === true ? styles.mini : styles.full}`}>
    {games.map(game =>
      <div key={game.slug} style={{ imageRendering: game.image.isPixelArt ?'pixelated' : undefined }}>
        <RichImage
          image={game.thumbnail || game.image}
          linkUrl={`/games/${game.slug}`}
          externalLink={false}
          enforceMaxDimensions={false}
          alt={game.title} />
      </div>
    )}
  </div>
)

export default GameGrid
