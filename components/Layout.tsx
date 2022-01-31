import Head from 'next/head'

type LayoutProps = {
  title: string,
  subtitle?: string,
  description: string,
  thumbnail: string,
  twitterUrl?: string,
  children: JSX.Element
}

const Layout = ({ title, subtitle, description, thumbnail, twitterUrl, children }: LayoutProps) => {
  let twitterHandle
  if (twitterUrl != undefined) {
    let matches = /.+\/(.+$)$/g.exec(twitterUrl)
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
      </Head>
      <header>
        <h1>{title}</h1>
      </header>
      {children}
      <footer>
        <p>Footer</p>
      </footer>
    </>
  )
}

export default Layout
