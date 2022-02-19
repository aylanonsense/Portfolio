import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="index, follow" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <link href="https://fonts.googleapis.com/css2?family=Gelasio&family=Montserrat:wght@400&family=Noto+Sans:wght@400;700&family=Raleway:wght@400;700&family=Source+Serif+Pro&family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <svg width="0" height="0">
            <filter id="chromatic-abberation">
              <feColorMatrix type="matrix"
                result="red_"
                values="1 0 0 0 0
                        0 0 0 0 0
                        0 0 0 0 0
                        0 0 0 1 0"/>
              <feOffset in="red_" dx="1" dy="0" result="red" />
              <feColorMatrix type="matrix"
                in="SourceGraphic"
                result="blue_"
                values="0 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"/>
              <feOffset in="blue_" dx="-1" dy="0" result="blue" />
              <feBlend mode="screen" in="red" in2="blue" />
            </filter>
          </svg>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument