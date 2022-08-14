import {GetServerSideProps, GetStaticProps, NextPage} from "next";
import { getSession} from "next-auth/react";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";


const Dashboard = ({session, result}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [loading, setLoading] = useState(true)
    const [myResult, setMyResult] = useState(result)

    const getUser = async() => {
        return await axios.get(`/api/user/${session?.user?.id}`)
    }

    const makeUser = async() => {
        return await axios.get(`/api/userProfile/${session?.user?.id}`)
        // return await axios.get(`/api/userProfile/${session?.user?.id}`, {
        //     userId: session?.user.id,
        //     email: session?.user.email,
        //     games: [],
        //     stats: {}
        // })
    }

    useEffect(() => {
        getUser()
            .then((res) => {
            })
            .catch((err) => {
                console.log(err.code)
            })
        // setMyResult(response)
        makeUser().then((res) => {
            console.log("Res", res)
        })

    }, [])

    // useEffect(() => {
    //     const securePage = async() => {
    //         if (!session) {
    //             await signIn("github")
    //         } else {
    //             console.log("Session: ", session)
    //         }
    //
    //     }
    //     // getUser()
    //     securePage()
    // },[])
    //
    // if (loading) {
    //     return <h2>Loading...</h2>
    // }


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