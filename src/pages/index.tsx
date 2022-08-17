import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className={"container"}>
      <Head>
        <title>Chess Opening Book</title>
        <meta name="description" content="A chess analysis app for the visually impaired"
              aria-label={"A chess analysis app for the visually impaired"}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"main"}
            aria-label={`Main content`}>

        <h1 className={"title"}>
          Welcome to Arcadia Chess
        </h1>

        <p className={"description"}>
            A site dedicated to helping those with a visual impairment learn from their chess games
        </p>

        <div className={"grid"}>
            <a href="/dashboard" className={"card"}>
              <h2> Dashboard &rarr; </h2>
              <p>Understand your chess data in a meaningful way</p>
            </a>

            <a href="/GameData/uploadGame" className={"card"}>
              <h2> Game Upload &rarr; </h2>
              <p>Upload a Chess Game (.pgn file) to start getting insights</p>
            </a>

            <a href="/GameData/showGame" className={"card"}>
              <h2> Chess Game &rarr; </h2>
              <p>View the Chess Board</p>
            </a>

        </div>
      </main>

      <footer className={"footer"}
              aria-hidden={"false"}>

      </footer>
    </div>
  )
}

export default Home
