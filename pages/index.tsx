import type { NextPage, GetStaticProps } from 'next'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
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
      {site.bigProjects != undefined || games.length > 0 ?
        <section>
          <div>
            {site.bigProjects != undefined && renderRichText(site.bigProjects)}
            {games.length > 0 && <GameGrid games={games} />}
          </div>
        </section>
      :
        undefined
      }
      { site.shortBio != undefined &&
        <section className={styles.bio}>
          <div>
            {renderRichText(site.shortBio, {
              renderMark: {
                [MARKS.ITALIC]: text => <span className={styles.big}>{text}</span>,
                [MARKS.BOLD]: text => <span className={styles.colorHighlight}>{text}</span>
              }
            })}
          </div>
        </section>
      }
      { site.smallProjects != undefined &&
        <section>
          <div>
            {renderRichText(site.smallProjects)}
          </div>
        </section>
      }
      { site.speakingExperience != undefined &&
        <section className={styles.talks}>
          <div>
            {renderRichText(site.speakingExperience)}
          </div>
        </section>
      }
      { site.contactInformation != undefined && 
        <section className={styles.contact}>
          <div>
            {renderRichText(site.contactInformation)}
          </div>
        </section>
      }
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
