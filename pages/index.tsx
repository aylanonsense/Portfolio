import type { NextPage, GetStaticProps } from 'next'
import { getSiteData, getAllGameData } from 'helpers/contentApi'
import renderRichText from 'helpers/renderRichText'
import Layout from 'components/Layout'
import GameGrid from 'components/GameGrid'
import styles from 'styles/pages/index.module.scss'

type HomePageProps = {
  site: SiteData,
  games: GameData[]
}

const HomePage: NextPage<HomePageProps> = ({ site, games }) => (
  <Layout site={site}>
    <main className={styles.main}>
      <section>
        <div>
          {renderRichText(site.bigProjects)}
          <GameGrid games={games} />
        </div>
      </section>
      <section className={styles.bio}>
        <div>
          {renderRichText(site.shortBio)}
        </div>
      </section>
      <section>
        <div>
          {renderRichText(site.smallProjects)}
        </div>
      </section>
      <section className={styles.talks}>
        <div>
          {renderRichText(site.speakingExperience)}
        </div>
      </section>
      <section className={styles.contact}>
        <div>
          {renderRichText(site.contactInformation)}
        </div>
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
