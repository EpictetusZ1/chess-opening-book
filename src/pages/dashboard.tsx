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
        if (status !== "loading") {
            getUser()
                .then((res) => {
                    console.log("Res from getUser: ", res)
                })
                .catch((err) => {
                    console.log(err.code)
                })
            // TODO: Implement this check later or somewhere else
            // makeUser()
            //     .then((res) => {
            //         console.log("Res from MAKE USER", res)
            //     })
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
