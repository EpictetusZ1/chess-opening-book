import type { NextPage } from 'next'
import Head from 'next/head'
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={"container"}>
      <Head>
        <title>Accessibility first chess game analysis - Arcadia Chess</title>
        <meta name="description" content="A chess game analysis app for the visually impaired"/>
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

            <Link href="/analysis" className={"card"}>
                <div className={"card"}>
                    <h2> Explore &rarr; </h2>
                    <p>Explore how your openings play out</p>
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
