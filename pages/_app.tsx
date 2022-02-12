import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.scss'

const PortfolioApp = ({ Component, pageProps }: AppProps) => (
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
  </>
)

export default PortfolioApp
