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
            <li className={"menuItem"}>
                <Link href={"/dashboard"}
                      className={"menu-link"}>
                    <S.NavBtn>
                        Dashboard &rarr;
                    </S.NavBtn>
                </Link>
            </li>

            <li className={"menuItem"}>
                <Link href="/src/components/UploadGameForm/UploadGameForm"
                      className={"menu-link"}>
                    <S.NavBtn>
                        Game Upload &rarr;
                    </S.NavBtn>
                </Link>
            </li>

            <li className={"menuItem"}>
                { !session && (
                    <Link href={"/api/auth/signIn"}
                          className={"menu-link"}>
                        <S.NavBtn onClick={(e) => {
                            e.preventDefault()
                            signIn("github")
                        }}>
                            Sign In &rarr;
                        </S.NavBtn>
                    </Link>
                )}

                { session && (
                    <Link href={"/api/auth/signOut"}
                          className={"menu-link"}>
                        <S.NavBtn onClick={(e) => {
                            e.preventDefault()
                            signOut()
                        }}>
                            Sign Out
                        </S.NavBtn>

                    </Link>
                )}
            </li>
        </S.NavBar>
    )
}


// Export the `session` prop to use sessions with Server Side Rendering
// export const getServerSideProps: GetServerSideProps<{
//     session: Session | null
// }> = async (context) => {
//     return {
//         props: {
//             session: await getSession(context),
//         },
//     }
// }