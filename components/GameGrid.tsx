import Link from 'next/link'
import Image from 'next/image'
import GamePanel from 'components/GamePanel'
import styles from 'styles/components/GameGrid.module.scss'

type GameGridProps = {
  games: GameData[]
}

const GameGrid = ({ games }: GameGridProps) => (
  <div className={styles.gameGrid}>
    {games.map(game =>
      <GamePanel
        key={game.slug}
        slug={game.slug}
        title={game.title}
        image={game.image} />
    )}
  </div>
)

export default GameGrid
