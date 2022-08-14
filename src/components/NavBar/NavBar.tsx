import * as S from "./NavBar.styles"
import Link from "next/link";
import {GetServerSideProps, NextComponentType} from "next"
import  { Session } from "next-auth"
import {signIn, signOut, useSession, getSession} from "next-auth/react"

export const NavBar: NextComponentType = () => {
    const { data: session, status } = useSession()

    // TODO: Add aria tags to all components
    // TODO: Set HTML indent level to 2 spaces

    return (
        <S.NavBar className={`${!session && status ? "loading" : "loaded"}`}>
            <ul>
                <li>
                    <Link href={"/dashboard"}>
                        <a>
                             Dashboard &rarr;
                        </a>
                    </Link>
                </li>

                <li>
                    <Link href="/GameData/uploadGame">
                        <a>
                          Game Upload &rarr;
                        </a>
                    </Link>
                </li>

                <li>
                    { !session && (
                        <Link href={"/api/auth/signIn"}>
                            <a onClick={(e) => {
                                e.preventDefault()
                                signIn("github")
                            }}>
                                Sign In &rarr;
                            </a>
                        </Link>
                    )}

                    { session && (
                        <Link href={"/api/auth/signOut"}>
                            <a onClick={(e) => {
                                e.preventDefault()
                                signOut()
                            }}>
                                Sign Out &larr;
                            </a>

                        </Link>
                    )}

                </li>


            </ul>
        </S.NavBar>
    )
}


// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps<{
    session: Session | null
}> = async (context) => {
    return {
        props: {
            session: await getSession(context),
        },
    }
}