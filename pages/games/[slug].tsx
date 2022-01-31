import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import { getSiteData, getGameData, getAllGameData } from 'helpers/contentApi'
import Layout from 'components/Layout'
import styles from 'styles/Home.module.css'

type GamePageParams = {
  params: {
    slug: string
  }
}

type GamePageProps = {
  site: SiteData,
  thumbnail: string,
  game: GameData
}

const GamePage: NextPage<GamePageProps> = ({ site, thumbnail, game }) => (
  <Layout title={site.title} subtitle={game.title} description={site.description} thumbnail={thumbnail} twitterUrl={site.author.twitterUrl}>
    <div className={styles.container}>
      <h1>{game.title}</h1>
      <p>{game.role}</p>
    </div>
  </Layout>
)

export default GamePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await getAllGameData()
  const gamePageParams: GamePageParams[] = games.map(game => {
    return { params: { slug: game.slug } } as GamePageParams
  })
  return {
    paths: gamePageParams,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<GamePageProps> = async ({ params: { slug } }: any) => {
  const siteRequest = getSiteData()
  const gameRequest = getGameData(slug)
  const site = await siteRequest
  const game = await gameRequest
  return {
    props: {
      site,
      thumbnail: 'TODO.png',
      game
    }
  }
}
