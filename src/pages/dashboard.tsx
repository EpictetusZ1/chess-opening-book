import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import { IUserApi } from "../types/Api.types";


const Dashboard = ({session, result}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    // const [loading, setLoading] = useState(true)
    const [myResult, setMyResult] = useState(result)

    const getUser = async() => {
        const id = "62effbc443f79c79d7f2c615"

        const req = await axios.get(`/api/users/${id}`)
            .then((res) => {
                console.log("Response: ", res)
            })
            .catch((err) => {
                console.log(err)
            })
        const response = await req

        setMyResult(response)
    }

    useEffect(() => {
        // setMyResult(result)
        getUser()
    }, [])

    useEffect(() => {
        const securePage = async() => {
            if (!session) {
                await signIn("github")
            } else {
                console.log("Session: ", session)
            }
        }
        securePage()
    },[])

    // if (loading) {
    //     return <h2>Loading...</h2>
    // }

    const addUser = async() => {
        const testUser = {
            id: "",
            email: "jack@jack.com",
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
        </div>
    )
}

export default Dashboard;



export const getServerSideProps: GetServerSideProps<{
    session: Session | null
    result: any | null
}> = async (context) => {
    const session = await getSession(context)

    return {
        props: {
            session: session,
            result: "Placeholder",
        },
    }
}