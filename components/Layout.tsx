import Head from 'next/head'
import Link from 'next/link'
import ExternalLinks from 'components/ExternalLinks'
import styles from 'styles/layout.module.scss'

type LayoutProps = {
  host: string,
  title: string,
  subtitle?: string,
  description: string,
  author: PersonData,
  thumbnail: string,
  twitterUrl?: URL,
  children: JSX.Element
}

const Layout = ({ host, title, subtitle, description, author, thumbnail, twitterUrl, children }: LayoutProps) => {
  let twitterHandle
  if (twitterUrl != undefined) {
    let matches = /.+\/(.+$)$/g.exec(twitterUrl.toString())
    if (matches != null && matches.length > 1) {
      twitterHandle = matches[1];
    }
  }
  return (
    <>
      <Head>
        <title>{(subtitle == undefined ? title : `${title} | ${subtitle}`)}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
        <meta name="og:image" content={thumbnail} />
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
        <h1><Link href="/">{title}</Link></h1>
        <p className={styles.subtitle}>Indie game dev</p>
        <div className={styles.icons}>
          <ExternalLinks person={author} />
        </div>
      </header>
      {children}
      <footer>
        <ExternalLinks person={author} />
        <p>There is no user tracking on this site&mdash;consider this the cookie and privacy policy.</p>
        <p>Site made by yours truly~</p>
      </footer>
    </>
  )
}

export default Layout
