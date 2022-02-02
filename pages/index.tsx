import type { NextPage, GetStaticProps } from 'next'
import { getSiteData, getAllGameData } from 'helpers/contentApi'
import renderRichText from 'helpers/renderRichText'
import Layout from 'components/Layout'
import GamePanel from 'components/GamePanel'
import styles from 'styles/pages/home.module.scss'

type HomePageProps = {
  site: SiteData,
  games: GameData[]
}

const HomePage: NextPage<HomePageProps> = ({ site, games }) => (
  <Layout site={site}>
    <main className={styles.main}>
      <section>
        {renderRichText(site.bigProjects)}
        {games.map(game =>
          <GamePanel key={game.slug} title={game.title} role={game.role} />
        )}
      </section>
      <section className={styles.bio}>
        {renderRichText(site.shortBio)}
      </section>
      <section>
        {renderRichText(site.smallProjects)}
      </section>
      <section className={styles.talks}>
        {renderRichText(site.speakingExperience)}
      </section>
      <section className={styles.contact}>
        {renderRichText(site.contactInformation)}
      </section>
    </main>
  </Layout>
)

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const siteRequest = getSiteData()
  const gamesRequest = getAllGameData()
  const site = await siteRequest
  const games = await gamesRequest
  return {
    props: {
      site,
      games
    }
  }
}
