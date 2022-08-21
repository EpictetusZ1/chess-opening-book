import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import axios, {AxiosResponse} from "axios";
import UploadGameForm from "../components/UploadGameForm/UploadGameForm";
import * as S from "../styles/Dasboard.styles"
import {IGame} from "../types/Game.types";
import GamesTable from "../components/GamesView/GamesTable";


const Dashboard: NextPage = () => {

    const { data: session, status } = useSession()
    const [loading, setLoading] = useState(true)
    const [games, setGames] = useState<IGame[]>([])
    const [openUploadGame, setOpenUploadGame] = useState(false)
    const getGames = async () => {
       const res = await axios.get(`/api/game/add/${session?.user?.id}`)
        if (res) {
            console.log("res", res)
            setGames(res.data.data)
        }
    }

    const upsertUserProfile = async() => {
        return await axios.post(`/api/userProfile/${session?.user?.id}`, {
            userId: session?.user.id,
            email: session?.user.email,
            stats: {}
        })
    }


        useEffect(() => {
            upsertUserProfile()
                .then((res) => {
                console.log("res", res)
            })

        getGames()
    } , [])

    return (
        <S.Dashboard
            aria-label={"Main content"}>
            <div className="dashboard">
                {openUploadGame && <UploadGameForm closeForm={() => setOpenUploadGame(false)}/>}
                <div className="userWelcome">
                    <h2>Welcome back, {session?.user?.name}</h2>
                </div>
                <div className="uploadGame">
                    <button className={"uploadGameBtn"}
                            onClick={() => setOpenUploadGame(true)}
                    >
                        Upload games
                    </button>
                </div>

                <div className="userGameInfo">
                    <h2>Your games</h2>
                    {games  && <GamesTable games={games} />}
                </div>

            </div>
        </S.Dashboard>
    )
}

export default Dashboard;
