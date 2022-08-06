import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import SideNav from "../components/SideNav/SideNav";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Chess Opening Book</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
          <SideNav />
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>

            <a href="/signUp" className={styles.card}>
              <h2>Sign Up &rarr;</h2>
              <p>Get meaningful insights from your chess games, for free</p>
            </a>

            <a href="/GameData/uploadGame" className={styles.card}>
              <h2>Game Upload &rarr;</h2>
              <p>Upload a Chess Game (.pgn file), to MongoDB and view your game</p>
            </a>

            <a href="/GameData/showGame" className={styles.card}>
              <h2>Chess Game &rarr;</h2>
              <p>View the Chess Board. Which is going to be based off a previous project (In Python)</p>
            </a>

        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            {/*<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />*/}
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
