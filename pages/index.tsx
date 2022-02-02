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
        <section id="games" className={styles.games}>
          <h2>Games</h2>
          <div>
            {site.bigProjects != undefined && renderRichText(site.bigProjects)}
            {games.length > 0 && <GameGrid games={games} />}
          </div>
        </section>
      :
        undefined
      }
      { site.shortBio != undefined &&
        <section id="bio" className={styles.bio}>
          <h2>About Me</h2>
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
        <section id="lil-things">
          <h2>lil things</h2>
          <div>
            {renderRichText(site.smallProjects)}
          </div>
        </section>
      }
      { site.speakingExperience != undefined &&
        <section id="talks" className={styles.talks}>
          <h2>Talks</h2>
          <div>
            {renderRichText(site.speakingExperience)}
          </div>
        </section>
      }
      { site.contactInformation != undefined && 
        <section id="contact" className={styles.contact}>
          <div>
            <div>
              <h2>Contact</h2>
              <div>
                {renderRichText(site.contactInformation)}
              </div>
            </div>
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
