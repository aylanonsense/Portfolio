import type { AppProps } from 'next/app'
import 'styles/globals.css'

const PortfolioApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
)

export default PortfolioApp
