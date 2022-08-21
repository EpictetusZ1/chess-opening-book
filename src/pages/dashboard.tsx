import {GetServerSideProps, NextPage} from "next";
import {getSession, useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { InferGetServerSidePropsType } from "next";
import axios from "axios";
import UploadGameForm from "../components/UploadGameForm/UploadGameForm";
import * as S from "../styles/Dasboard.styles"


const Dashboard: NextPage = () => {
    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)
    const [myResult, setMyResult] = useState()
    const [openUploadGame, setOpenUploadGame] = useState(false)

    const findOrCreateProfile = async() => {
        // return await axios.get(`/api/userProfile/${session?.user?.id}`)
        return await axios.post(`/api/userProfile/${session?.user?.id}`, {
            userId: session?.user.id,
            email: session?.user.email,
            games: [],
            stats: {}
        })
    }

    useEffect(() => {
        if (status !== "loading") {
            findOrCreateProfile().then((res) => {
                console.log("Res from attempting to find user profile ", res)
            })
        }
    }, [status])



    return (
        <S.Dashboard
            aria-label={"Main content"}>
            <div className="dashboard">
                {openUploadGame && <UploadGameForm />}
                <div className="userWelcome">
                    <h1>Dashboard</h1>
                    <h2>Welcome to your chess data</h2>
                </div>
                <div className="uploadGame">
                    <button className={"uploadGameBtn"}
                            onClick={() => setOpenUploadGame(true)}
                    >
                        Upload games
                    </button>
                </div>

            </div>
        </S.Dashboard>
    )
}

export default Dashboard;
