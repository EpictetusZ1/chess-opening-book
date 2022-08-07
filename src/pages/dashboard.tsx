import {GetServerSideProps, NextPage} from "next";
import {getSession, signIn, useSession} from "next-auth/react";
import { useState, useEffect } from "react";
import {Session} from "next-auth";
import {InferGetServerSidePropsType} from "next";
import {PrismaClient} from "@prisma/client";
// import {getUserById} from "./api/User";

const Dashboard = ({session, result}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // const [loading, setLoading] = useState(true)
    const [myResult, setMyResult] = useState(result)

    const getUser = async() => {
        const response = await fetch("/api/User");
        const data = await response.json();
        setMyResult(data)
    }

    useEffect(() => {
        // setMyResult(result)
        getUser()
            .then((r) => {
            })
    }, [])

/*    useEffect(() => {
        const securePage = async() => {
            if (!session) {
                signIn()
            } else {
                console.log("Session: ", session)
                setLoading(false)
            }
        }
        securePage()
    },[])*/

    // if (loading) {
    //     return <h2>Loading...</h2>
    // }

    const addUser = async() => {
        const testUser = {
            _id: "",
            email: "jack@jack.com",
            userName: "Epictetus",
            password: "123456",
            games: ["1", "2", "3"],
            stats: {
                topFirstMove: "e4",
                mostSuccessfulOpening: "Vienna Game",
                mostPlayedTimeControl: "Blitz",
            },
            ratings: {
                blitz: 1602,
                bullet: 1200,
            },
        }
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome to your chess data</h2>
            <button
               onClick={addUser}
            >
               Test Add user
            </button>
        </div>
    )
}

export default Dashboard;



export const getServerSideProps: GetServerSideProps<{
    session: Session | null
    result: any | null
}> = async (context) => {
    const session = await getSession(context)
    const result = "potato"
    //
    // if (!session) {
    //     return {
    //         redirect: {
    //             destination: "/api/auth/signIn",
    //             permanent: false,
    //         }
    //     }
    // }

    // let prisma = new PrismaClient()
    // await prisma.$connect()
    // const data = await prisma.user.findUnique({
    //     where: {
    //         id: "62effbc443f79c79d7f2c615"
    //     }
    // })
    // console.log("Data: ", data)


    return {
        props: {
            session: session,
            result: result
            // result: JSON.stringify(data)
        },
    }
}