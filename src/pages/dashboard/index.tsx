import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import { useState, useEffect} from "react";
import axios from "axios";
import UploadGameForm from "../../components/Inputs/Forms/UploadGameForm/UploadGameForm";
import * as S from "./dasboard.styles"
import {IGame} from "../../types/Game.types";
import GamesTable from "../../components/GamesTable/GamesTable";
import PlayerStats from "../../components/PlayerStats/PlayerStats";
import {Session} from "next-auth";
import PrimaryBtn from "../../components/Inputs/Buttons/PrimaryBtn/PrimaryBtn";
import ModalPrimary from "../../components/Modals/ModalPrimary/ModalPrimary";
import ImportGames from "../../components/Inputs/Forms/ImportGames/ImportGames";

type Props = {
    session: Session | null
}

type TGameResponse = {
    message: string
    data: IGame[]
    hasErrors: boolean
}

const Dashboard = ({session}: Props ) => {
    const [loading, setLoading] = useState<boolean>(true)
    const [games, setGames] = useState<IGame[]>([])
    const [stats, setStats] = useState<any>(null)
    const [openUploadGame, setOpenUploadGame] = useState<boolean>(false)
    const [openImportGames, setOpenImportGames] = useState<boolean>(false)

    useEffect(() => {
        const getGames = async() => {
            const res = await axios.get<TGameResponse>(`/api/game/add/${session?.user?.id}`)
            if (res) {
                setGames(res.data.data)
                setLoading(false)
            }
        }

        const getStats = async () => {
            const res = await axios.get(`/api/stats/${session?.user?.id}`)
            if (res) {
                setStats(res.data)
            }
        }

        try {
            getGames()
            getStats()
        } catch (error) {
            console.log("Error:", error)
        }
    }, [])


    return (
        <S.Dashboard aria-label={"Main content"}>
            {openUploadGame && (
                <ModalPrimary closeModal={() => setOpenUploadGame(false)}>
                    <UploadGameForm closeModal={() => setOpenUploadGame(false)} />
                </ModalPrimary>
            )}

            {openImportGames && (
                <ModalPrimary closeModal={() => setOpenImportGames(false)}>
                    <ImportGames closeModal={() => setOpenImportGames(false)} />
                </ModalPrimary>
            )}


            <div className="dashboard">
                <div className="userWelcome">
                    <h2>{`Welcome back, ${session?.user.name}`}</h2>
                </div>
                <div className="uploadGame">
                    <PrimaryBtn
                        text={"Upload Game"}
                        onClick={() => setOpenUploadGame(true)}
                    />
                    <PrimaryBtn
                        text={"Import Games"}
                        onClick={() => setOpenImportGames(true)}
                    />
                </div>


                <div className="playerInfo">
                    {stats && <PlayerStats stats={stats}/>}
                </div>
                <div className="gameInfo">
                    <h2>Your games</h2>
                    {games && <GamesTable games={games} /> }
                </div>

            </div>
        </S.Dashboard>
    )
}

export default Dashboard;


export const getServerSideProps: GetServerSideProps<{
    session: Session | null
}> = async (context) => {
    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    const upsertUserProfile = async() => {
        await axios.post(`${process.env.BASE_URL}/api/userProfile/${session?.user?.id}`, {
            userId: session?.user.id,
            email: session?.user.email,
            stats: {}
        })
    }

    await upsertUserProfile()

    return {
        props: {
            session: session,
        },
    }
}
