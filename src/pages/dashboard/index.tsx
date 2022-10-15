import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import {useState} from "react";
import axios from "axios";
import UploadGameForm from "../../components/Inputs/UploadGameForm/UploadGameForm";
import * as S from "./dasboard.styles"
import {IGame} from "../../types/Game.types";
import GamesTable from "../../components/GamesTable/GamesTable";
import PlayerStats from "../../components/PlayerStats/PlayerStats";
import {Session} from "next-auth";
import GetChessCom from "../../components/GetChessCom/GetChessCom";
import PrimaryBtn from "../../components/Inputs/PrimaryBtn/PrimaryBtn";

type Props = {
    gameArr: IGame[]
    stats: any
    session: Session | null
}

const Dashboard = ({gameArr, session, stats}: Props ) => {
    const [loading, setLoading] = useState(true)
    const [games, setGames] = useState<IGame[]>(gameArr)
    const [openUploadGame, setOpenUploadGame] = useState(false)


    return (
        <S.Dashboard aria-label={"Main content"}>

            <div className="dashboard">
                {openUploadGame && <UploadGameForm closeForm={() => setOpenUploadGame(false)}/>}
                <div className="userWelcome">
                    <h2>{`Welcome back, ${session?.user.name}`}</h2>
                </div>
                <div className="uploadGame">
                    <PrimaryBtn
                        text={"Upload Game"}
                        onClick={() => setOpenUploadGame(true)}
                    />
                    <GetChessCom />
                </div>


                <div className="playerInfo">
                    <PlayerStats stats={stats}/>
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
    gameArr: IGame[]
    stats: any
}> = async (context) => {
    type TGameResponse = {
        message: string
        data: IGame[]
        hasErrors: boolean
    }

    const session = await getSession(context)

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    // TODO: Convert this to an API call on Component Mount, instead of here because its data is too large.
    const getGames = async() => {
        const res = await axios.get<TGameResponse>(`${process.env.BASE_URL}/api/game/add/${session?.user?.id}`)
        return res.data.data
    }

    const upsertUserProfile = async() => {
        await axios.post(`${process.env.BASE_URL}/api/userProfile/${session?.user?.id}`, {
            userId: session?.user.id,
            email: session?.user.email,
            stats: {}
        })
    }

    const getStats = async () => {
        const res = await axios.get(`${process.env.BASE_URL}/api/stats/${session?.user?.id}`)
        return res.data
    }

    await upsertUserProfile()
    const gameData = await getGames()
    const stats = await getStats()

    return {
        props: {
            session: session,
            gameArr: gameData,
            stats: stats
        },
    }

}
