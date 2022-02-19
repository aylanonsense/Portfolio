import { useState, useEffect } from 'react'
import type { NextPage, GetStaticPaths, GetStaticProps } from 'next'
import type { SiteData, GameData, ImageAssetData } from 'types/contentData'
import { Document } from '@contentful/rich-text-types'
import { getSiteData, getGameData, getAllGameData } from 'helpers/contentApi'
import baseRenderRichText from 'helpers/renderRichText'
import parseExternalSite from 'helpers/parseExternalSite'
import ExternalLinks from 'components/ExternalLinks'
import RichImage from 'components/RichImage'
import Layout from 'components/Layout'
import styles from 'styles/pages/game.module.scss'

type GamePageParams = {
  params: {
    slug: string
  }
}

type GamePageProps = {
  site: SiteData
  game: GameData
}

const GamePage: NextPage<GamePageProps> = ({ site, game }) => {
  const [ fullScreenImage, setFullScreenImage ] = useState<ImageAssetData>()

  useEffect(() => {
    document.body.className = fullScreenImage ? "noscroll" : ""
    return () => { document.body.className = "" }
  })

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

  function renderRichText(richText: Document | string) {
    return baseRenderRichText(richText, {
      renderImage: (image, baseRenderImage) => 
        <div className={styles.contentImage}>
          <RichImage
            image={image}
            onClick={() => setFullScreenImage(image)}
            tabbable={false}
            onKeyDown={evt => {
              if (evt.key == 'Enter') {
                setFullScreenImage(image)
              }
            }} />
        </div>,
      renderTrack: (track, baseRenderTrack) =>
        <div className={styles.track}>
          {baseRenderTrack(track)}
        </div>
    })
  }

  return (
    <Layout site={site} title={game.title} compact={true} skipLinks={<a href="#main">Skip to main content</a>}>
      {fullScreenImage &&
        <aside
          className={styles.fullImageModal}
          onClick={() => setFullScreenImage(undefined)}
          onKeyDown={evt => {
            if (evt.key == 'Enter') {
              setFullScreenImage(undefined)
            }
          }} >
          <div>
            <RichImage
              image={fullScreenImage}
              enforceMaxDimensions={false}
              />
          </div>
        </aside>
      }
      <main id="main" className={styles.main}>
        <div>
          <RichImage className={styles.mainImage} image={game.image} enforceMaxDimensions={false} />
          <div className={styles.basicInfo}>
            <h1>{game.title}</h1>
            {details && <p className={styles.details}>{details}</p>}
            <ExternalLinks className={styles.icons} urls={game.links} size={24} />
            {game.playUrl && (
              <p className={styles.playLink}>
                <a href={game.playUrl} target="_blank" rel="noopener noreferrer">Play on {parseExternalSite(game.playUrl)}</a>
              </p>
            )}
          </div>
          {game.overview &&
            <section id="overview" className={styles.overview}>
              <h2>Overview</h2>
              {renderRichText(game.overview)}
            </section>
          }
          {game.images.length > 0 &&
            <section id="images" className={styles.images}>
              {game.images.map(image =>
                <div key={image.url} style={{ imageRendering: image.isPixelArt ?'pixelated' : undefined }}>
                  <RichImage
                    image={image}
                    style={{ cursor: 'pointer' }}
                    tabbable={false}
                    onClick={() => setFullScreenImage(image)}
                    onKeyDown={evt => {
                      if (evt.key == 'Enter') {
                        setFullScreenImage(image)
                      }
                    }} />
                </div>
              )}
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
          {game.credits &&
            <section id="credits" className={styles.credits}>
              <h2>Credits</h2>
              {renderRichText(game.credits)}
            </section>
          }
        </div>
      </main>
    </Layout>
  )
}

export default GamePage

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
