import * as S from "./NavBar.styles"
import Link from "next/link";
import { GetServerSideProps, NextComponentType } from "next"
import  { Session } from "next-auth"
import { signIn, signOut, useSession, getSession } from "next-auth/react"

export const NavBar: NextComponentType = () => {
    const { data: session, status } = useSession()

    return (
        <S.NavBar
            className={`${!session && status ? "loading" : "loaded"}`}
            aria-label={"Main menu"}
        >
            <li className={"menu-item"}>
                <Link href={"/dashboard"}
                      className={"menu-link"}>
                    <a>
                        Dashboard &rarr;
                    </a>
                </Link>
            </li>

            <li className={"menu-item"}>
                <Link href="/GameData/uploadGame"
                      className={"menu-link"}>
                    <a>
                        Game Upload &rarr;
                    </a>
                </Link>
            </li>

            <li className={"menu-item"}>
                { !session && (
                    <Link href={"/api/auth/signIn"}
                          className={"menu-link"}>
                        <a onClick={(e) => {
                            e.preventDefault()
                            signIn("github")
                        }}>
                            Sign In &rarr;
                        </a>
                    </Link>
                )}

                { session && (
                    <Link href={"/api/auth/signOut"}
                          className={"menu-link"}>
                        <a onClick={(e) => {
                            e.preventDefault()
                            signOut()
                        }}>
                            Sign Out &larr;
                        </a>

                    </Link>
                )}

            </li>
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