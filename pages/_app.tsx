import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.scss'

const PortfolioApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="viewport-fit=cover" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default PortfolioApp
