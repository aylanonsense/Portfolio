import type { NextPage, GetStaticProps } from 'next'
import { MARKS } from '@contentful/rich-text-types'
import MailIcon from 'icons/mail.svg'
import ResumeIcon from 'icons/resume.svg'
import type { SiteData, GameData } from 'types/contentData'
import { getSiteData, getAllGameData } from 'helpers/contentApi'
import renderRichText from 'helpers/renderRichText'
import Layout from 'components/Layout'
import GameGrid from 'components/GameGrid'
import styles from 'styles/pages/index.module.scss'

type HomePageProps = {
  site: SiteData
  games: GameData[]
}

const HomePage: NextPage<HomePageProps> = ({ site, games }) => (
  <Layout site={site} compact={false} skipLinks={<a href="#main">Skip to main content</a>}>
    <main id="main" className={styles.main}>
      {(site.bigProjects || games.length > 0) &&
        <section id="games" className={styles.games}>
          <h2>Games</h2>
          <div>
            {site.bigProjects && renderRichText(site.bigProjects)}
            {games.length > 0 && <GameGrid games={games} />}
          </div>
        </section>
      }
      { site.shortBio &&
        <section id="about" className={styles.about}>
          <h2>About Me</h2>
          <div className={styles.shortBio}>
            {renderRichText(site.shortBio, {
              renderOptions: {
                renderMark: {
                  [MARKS.ITALIC]: text => <span className={styles.big}>{text}</span>,
                  [MARKS.BOLD]: text => <span className={styles.highlight}>{text}</span>
                }
              }
            })}
          </div>
          { site.lookingForWork &&
            <>
              <div className={styles.lookingForWork}>
                {renderRichText(site.lookingForWork)}
              </div>
              <div className={styles.contactLinks}>
                {site.author.resumeUrl &&
                  <p><a href={site.author.resumeUrl} target="_blank" rel="noopener noreferrer"><ResumeIcon width={28} height={28} alt="" /> <span>Résumé</span></a></p>
                }
                {site.contactInformation &&
                  <p><a href="#contact"><MailIcon width={28} height={28} alt="" /> <span>Contact</span></a></p>
                }
              </div>
            </>
          }
        </section>
      }
      { site.smallProjects &&
        <section id="lil-things">
          <h2>lil things</h2>
          <div>
            {renderRichText(site.smallProjects)}
          </div>
        </section>
      }
      { site.speakingExperience &&
        <section id="talks" className={styles.talks}>
          <h2>Talks</h2>
          <div>
            {renderRichText(site.speakingExperience)}
          </div>
        </section>
      }
      { site.contactInformation && 
        <section id="contact" className={styles.contact}>
          <div>
            <div>
              <h2>Contact</h2>
              <p className={styles.from}><span>Please feel free</span> <span>to reach out!</span></p>
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

export default HomePage

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
