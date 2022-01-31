import type { NextPage } from 'next'
import styles from 'styles/Home.module.css'
import { getGame, getAllGames } from 'helpers/contentApi'

type GamePageParams = {
  params: {
    slug: string
  }
}

type GamePageProps = {
  title: string,
  role: string
}

const GamePage: NextPage<GamePageProps> = ({ title, role }) => (
  <div className={styles.container}>
    <h1>{title}</h1>
    <p>{role}</p>
  </div>
)

export default GamePage;

export async function getStaticPaths() {
  const games = await getAllGames()
  const gamePageParams: GamePageParams[] = games.map(game => {
    return { params: { slug: game.slug } } as GamePageParams
  })
  return {
    paths: gamePageParams,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }: GamePageParams) {
  const game = await getGame(slug)
  return {
    props: game as GamePageProps
  }
}
