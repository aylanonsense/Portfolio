import type { NextPage } from 'next'
import Link from 'next/link'
import styles from 'styles/pages/styleCheck.module.scss'

const StyleCheck: NextPage = () => (
  <main className={styles.main}>
    <h1>Style Check</h1>
    <p>This page just exists for me to check styles.</p>
    <p>You aren&apos;t really supposed to be here, but that&apos;s okay! Welcome!</p>
    <p className={styles.backLink}><Link href="/">Back to the actual site</Link></p>
    <div className={styles.cards}>
      <div className={styles.blackOnWhite}><p><span className={styles.highlight}>highlight</span> Black text on white <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.redOnWhite}><p><span className={styles.highlight}>highlight</span> Red text on white <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.greenOnWhite}><p><span className={styles.highlight}>highlight</span> Green text on white <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.blueOnWhite}><p><span className={styles.highlight}>highlight</span> Blue text on white <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.whiteOnBlack}><p><span className={styles.highlight}>highlight</span> White text on black <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.redOnBlack}><p><span className={styles.highlight}>highlight</span> Red text on black <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.greenOnBlack}><p><span className={styles.highlight}>highlight</span> Green text on black <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.blueOnBlack}><p><span className={styles.highlight}>highlight</span> Blue text on black <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.whiteOnRed}><p><span className={styles.highlight}>highlight</span> White text on red <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.whiteOnGreen}><p><span className={styles.highlight}>highlight</span> White text on green <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.whiteOnBlue}><p><span className={styles.highlight}>highlight</span> White text on blue <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.blackOnRed}><p><span className={styles.highlight}>highlight</span> Black text on red <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.blackOnGreen}><p><span className={styles.highlight}>highlight</span> Black text on green <span className={styles.subdued}>subdued</span></p></div>
      <div className={styles.blackOnBlue}><p><span className={styles.highlight}>highlight</span> Black text on blue <span className={styles.subdued}>subdued</span></p></div>
    </div>
  </main>
)

export default StyleCheck
