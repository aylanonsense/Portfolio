import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from 'styles/Home.module.css'
import { client } from 'helpers/prismicPosts'
import { fetchEntry, fetchEntries } from 'helpers/contentfulContent'
import Game from 'components/Game'
import { Console } from 'console'

type GameProps = {
  title: string,
  slug: string,
  role: string
}

const GamePage: NextPage<GameProps> = ({ title, slug, role }) => (
  <div className={styles.container}>
    <h1>{title}</h1>
    <p>BOOFAH</p>
    <p>{slug}</p>
    <p>{role}</p>
    <p>OOFAH</p>
  </div>
)

export default GamePage;

export async function getStaticPaths() {
  const res = await fetchEntries()

  const games = res.map((p: any) => {
    return {
      params: p.fields
    }
  })

  return {
    paths: games,
    fallback: false
  }
}

export async function getStaticProps({ params: { slug} }: any) {
  const entry = await fetchEntry(slug)
  return {
    props: entry[0].fields
  }
}

//export async function getStaticProps() {
//  const res = await fetchEntries()

//  const games = res.map((p) => {
//    return p.fields
//  })

//  console.log(games);

//  return {
//    props: {
//      games,
//    },
//  }
//}
