import {GetServerSideProps, NextPage} from "next";
import {getSession, signIn, useSession} from "next-auth/react";
import { useState, useEffect } from "react";
import {Session} from "next-auth";
import {InferGetServerSidePropsType} from "next";

const Dashboard = ({session}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const securePage = async() => {
            const session = await getSession()
            if (!session) {
                signIn()
            } else {
                setLoading(false)
            }
        }
        securePage()
    },[])

    if (loading) {
        return <h2>Loading...</h2>
    }

    return (
        <div>

        </div>
    )
}

export default Dashboard;

export const getServerSideProps: GetServerSideProps<{
    session: Session | null
}> = async (context) => {
    return {
        props: {
            session: await getSession(context),
        },
    }
}