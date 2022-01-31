import type { NextPage, GetStaticProps } from 'next'
import { getSiteData, getAllGameData } from 'helpers/contentApi'
import Layout from 'components/Layout'
import GamePanel from 'components/GamePanel'
import styles from 'styles/HomePage.module.scss'

type HomePageProps = {
  host: string,
  site: SiteData,
  thumbnail: string,
  games: GameData[]
}

const HomePage: NextPage<HomePageProps> = ({ host, site, thumbnail, games }) => (
  <Layout host={host} title={site.title} description={site.description} author={site.author} thumbnail={thumbnail} twitterUrl={site.author.twitterUrl}>
    <main className={styles.main}>
      {games.map(game =>
        <GamePanel key={game.slug} title={game.title} role={game.role} />
      )}
    </main>
  </Layout>
)

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  if (process.env.HOST_NAME == undefined) {
    throw 'Environment variable HOST_NAME is not defined!'
  }
  const siteRequest = getSiteData()
  const gamesRequest = getAllGameData()
  const host = process.env.HOST_NAME
  const site = await siteRequest
  const games = await gamesRequest
  return {
    props: {
      host,
      site,
      thumbnail: 'TODO.png',
      games
    }
  }
}
