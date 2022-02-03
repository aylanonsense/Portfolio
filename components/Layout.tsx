import Head from 'next/head'
import Link from 'next/link'
import type { SiteData } from 'types/contentData'
import renderRichText from 'helpers/renderRichText'
import ExternalLinks from 'components/ExternalLinks'
import styles from 'styles/components/Layout.module.scss'

type LayoutProps = {
  site: SiteData,
  title?: string,
  compact: boolean
  children?: React.ReactNode;
}

const Layout = ({ site, title, compact, children }: LayoutProps) => {
  let twitterHandle
  if (site.author.twitterUrl) {
    let matches = /.+\/(.+$)$/g.exec(site.author.twitterUrl)
    if (matches != null && matches.length > 1) {
      twitterHandle = matches[1];
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
        <div>
          <h1 className={styles.title}><Link href="/">{site.title}</Link></h1>
          {!compact && site.subtitle && <p className={styles.subtitle}>{site.subtitle}</p>}
          <ExternalLinks className={styles.icons} person={site.author} size={styles.compact ? 22 : 28} />
        </div>
      </header>
      {children}
      <footer className={styles.footer}>
        <div>
          {site.disclaimer && renderRichText(site.disclaimer)}
          <ExternalLinks className={styles.icons} person={site.author} size={22} />
        </div>
      </footer>
    </>
  )
}

export default Layout
