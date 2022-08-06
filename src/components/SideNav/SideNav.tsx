import * as S from "./SideNav.styles"
import Link from "next/link";
import {GetServerSideProps, NextComponentType} from "next"
import  { Session } from "next-auth"
import {signIn, signOut, useSession, getSession} from "next-auth/react"


export const SideNav: NextComponentType = () => {

    const { data: session, status } = useSession()

    return (
        <S.SNAv className={`${!session && status ? "loading" : "loaded"}`}>
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
        </S.SNAv>
    )
}


// Export the `session` prop to use sessions with Server Side Rendering
export const getServerSideProps: GetServerSideProps<{
    session: Session | null
}> = async (context) => {
    console.log("my stuff")
    return {
        props: {
            session: await getSession(context),
        },
    }
}