import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import type { SiteData, GameData } from 'types/contentData'
import { getSiteData, getGameData, getAllGameData } from 'helpers/contentApi'
import renderRichText from 'helpers/renderRichText'
import Layout from 'components/Layout'
import styles from 'styles/pages/game.module.scss'

type GamePageParams = {
  params: {
    slug: string
  }
}

type GamePageProps = {
  site: SiteData,
  game: GameData
}

const GamePage: NextPage<GamePageProps> = ({ site, game }) => {
  let releaseDate
  if (game.releaseDate) {
    releaseDate = new Date(game.releaseDate).toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', year: 'numeric' })
  }
  let details: string | undefined = undefined
  if (releaseDate && game.role) {
    details = `${game.role} / ${releaseDate}`
  }
  else if (releaseDate) {
    details = releaseDate
  }
  else if (game.role) {
    details = game.role
  }
  return (
    <Layout site={site} title={game.title} compact={true}>
      <main className={styles.main}>
        <div className={styles.mainImage} style={{ imageRendering: game.image.isPixelArt ?'pixelated' : undefined }}>
          <Image
            src={game.image.url}
            alt={game.image.description}
            width={game.image.width}
            height={game.image.height} />
        </div>
        <div className={styles.basicInfo}>
          <h1>{game.title}</h1>
          {details && <p className={styles.details}>{details}</p>}
          <ul className={styles.links}>
            {game.itchUrl && <li><a href={game.itchUrl} target="_blank" rel="noopener noreferrer">itch.io</a></li>}
            {game.lexaloffleUrl && <li><a href={game.lexaloffleUrl} target="_blank" rel="noopener noreferrer">Lexaloffle</a></li>}
            {game.newgroundsUrl && <li><a href={game.newgroundsUrl} target="_blank" rel="noopener noreferrer">Newgrounds</a></li>}
            {game.gameJoltUrl && <li><a href={game.gameJoltUrl} target="_blank" rel="noopener noreferrer">Game Jolt</a></li>}
            {game.gitHubUrl && <li><a href={game.gitHubUrl} target="_blank" rel="noopener noreferrer">GitHub</a></li>}
          </ul>
        </div>
        {game.overview &&
          <section id="overview" className={styles.overview}>
            <h2>Overview</h2>
            {renderRichText(game.overview)}
          </section>
        }
        {game.credits &&
          <section id="credits" className={styles.credits}>
            <h2>Credits</h2>
            {renderRichText(game.credits)}
          </section>
        }
        {game.development &&
          <section id="development" className={styles.development}>
            <h2>Development</h2>
            {renderRichText(game.development)}
          </section>
        }
        {game.reception &&
          <section id="reception" className={styles.reception}>
            <h2>Reception</h2>
            {renderRichText(game.reception)}
          </section>
        }
      </main>
    </Layout>
  )
}

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
      game
    }
  }
}
