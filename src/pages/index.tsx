import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={"container"}>
      <Head>
        <title>Accessibility first chess game analysis - Arcadia Chess</title>
        <meta name="description" content="A chess game analysis app for the visually impaired"/>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"main"}
            aria-label={`Main content`}
      >

        <h1 className={"title"}>
          Welcome to Arcadia Chess
        </h1>

        <p className={"description"}>
            A site dedicated to helping those with a visual impairment learn from their chess games
        </p>

        <div className={"grid"}>
            <Link href="/dashboard">
                <div className={"card"}>
                    <h2> Dashboard &rarr; </h2>
                    <p>Understand your chess data in a meaningful way</p>
                </div>
            </Link>

            <Link href="/GameData/uploadGame" className={"card"}>
                <div className={"card"}>
                    <h2> Game Upload &rarr; </h2>
                    <p>Upload a Chess Game (.pgn file) to start getting insights</p>
                </div>
            </Link>

            <Link href="/GameData/showGame" className={"card"}>
                <div className={"card"}>
                    <h2> Chess Game &rarr; </h2>
                    <p>View the Chess Board</p>
                </div>
            </Link>

        </div>
      </main>

      <footer className={"footer"}
              aria-hidden={"false"}>
      </footer>
    </div>
  )
}

export default Home
