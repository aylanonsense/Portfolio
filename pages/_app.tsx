import type { AppProps } from 'next/app'
import 'styles/globals.scss'

const PortfolioApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default PortfolioApp
