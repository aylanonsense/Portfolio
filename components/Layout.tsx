import Head from 'next/head'
import Link from 'next/link'
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
    let matches = /.+\/(.+$)$/g.exec(site.author.twitterUrl.toString())
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
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Gelasio&family=Montserrat:wght@400&family=Noto+Sans:wght@400;700&family=Raleway:wght@400;700&family=Source+Serif+Pro&family=Nanum+Myeongjo&display=swap" rel="stylesheet" />
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
