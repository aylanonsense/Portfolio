import { ReactNode } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import type { SiteData } from 'types/contentData'
import renderRichText from 'helpers/renderRichText'
import ExternalLinks from 'components/ExternalLinks'
import styles from 'styles/components/Layout.module.scss'
import parseExternalSite from 'helpers/parseExternalSite'
import { ExternalSite } from 'helpers/enums'

type LayoutProps = {
  site: SiteData
  title?: string
  compact: boolean
  skipLinks?: ReactNode
  children?: ReactNode
}

const Layout = ({ site, title, compact, skipLinks, children }: LayoutProps) => {
  let twitterHandle
  for (let url of site.author.links) {
    if (parseExternalSite(url) == ExternalSite.Twitter) {
      let matches = /.+\/(.+$)$/g.exec(url)
      if (matches != null && matches.length > 1) {
        twitterHandle = matches[1];
      }
    }
  }
  return (
    <>
      <Head>
        <title>{(title ? `${title} | ${site.title}` : site.title)}</title>
        <meta name="description" content={site.description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={site.description} />
        {/*<meta name="og:image" content="todo.png" />*/}
        <meta name="og:type" content="website" />
        {twitterHandle && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
        <meta name="twitter:card" content="summary" />
      </Head>
      <header className={`${styles.header} ${compact ? styles.compact : styles.full}`}>
        {skipLinks && (
          <nav className={styles.skipLinks}>
            {skipLinks}
          </nav>
        )}
        <div>
          <h1 className={styles.title}><Link href="/">{site.title}</Link></h1>
          {!compact && site.subtitle && <p className={styles.subtitle}>{site.subtitle}</p>}
          {site.author.links.length > 0 && <ExternalLinks className={styles.icons} urls={site.author.links} size={styles.compact ? 22 : 28} />}
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div>
          {site.disclaimer && renderRichText(site.disclaimer)}
          {site.author.links.length > 0 && <ExternalLinks className={styles.icons} urls={site.author.links} size={22} />}
        </div>
      </footer>
    </>
  )
}

export default Layout
