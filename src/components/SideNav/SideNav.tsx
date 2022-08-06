import * as S from "./SideNav.styles"
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react"

function SideNav() {

    const { data: session } = useSession()

    console.log("Session: ", session)

    return (
        <S.SNAv>
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



            <Link href={"/api/auth/signOut"}>
                <a onClick={(e) => {
                    e.preventDefault()
                    signOut()
                }}>
                    Sign Out &larr;
                </a>

            </Link>
        </S.SNAv>
    )
}

export default SideNav