import Head from 'next/head'
import Link from 'next/link'
import renderRichText from 'helpers/renderRichText'
import ExternalLinks from 'components/ExternalLinks'
import styles from 'styles/components/layout.module.scss'

type LayoutProps = {
  site: SiteData,
  title?: string,
  children: JSX.Element
}

const Layout = ({ site, title, children }: LayoutProps) => {
  let twitterHandle
  if (site.author.twitterUrl != undefined) {
    let matches = /.+\/(.+$)$/g.exec(site.author.twitterUrl.toString())
    if (matches != null && matches.length > 1) {
      twitterHandle = matches[1];
    }
  }
  return (
    <>
      <Head>
        <title>{(title == undefined ? site.title : `${title} | ${site.title}`)}</title>
        <meta name="description" content={site.description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={site.description} />
        {/*<meta name="og:image" content="todo.png" />*/}
        <meta name="og:type" content="website" />
        {twitterHandle != undefined && <meta name="twitter:creator" content={`@${twitterHandle}`} />}
        <meta name="twitter:card" content="summary" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="robots" content="index, follow" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link href="https://fonts.googleapis.com/css?family=Raleway:700&display=swap" rel="stylesheet" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}><Link href="/">{site.title}</Link></h1>
        <p className={styles.subtitle}>{site.subtitle}</p>
        <ExternalLinks className={styles.icons} person={site.author} size={28} />
      </header>
      {children}
      <footer className={styles.footer}>
        <ExternalLinks className={styles.icons} person={site.author} size={22} />
        {site.disclaimer != undefined && renderRichText(site.disclaimer)}
      </footer>
    </>
  )
}

export default Layout
