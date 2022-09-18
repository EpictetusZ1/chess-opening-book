import * as S from "./analysis.styles"
import CreateOpeningMatrix from "../../utils/createOpeningMatrix";
import {IGame} from "../../types/Game.types";
import {Session} from "next-auth";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import axios from "axios";
import OpeningExplorer from "../../components/OpeningExplorer/OpeningExplorer";


type Props = {
    session: Session | null
    gameData: [IGame]
}

const Analysis = ({gameData, session}: Props) => {


    return (
        <S.AnalysisCont>
            <h2>Meaningful insights about your chess games</h2>
            <OpeningExplorer gameData={gameData} />
        </S.AnalysisCont>
    );
};

export default Analysis;


// TODO: Make this api call client side. Data load is too big for page load

export const getServerSideProps: GetServerSideProps<{
    session: Session | null
    gameData: [IGame]
}> = async (context) => {
    type TGameResponse = {
        message: string
        data: [IGame]
        hasErrors: boolean
    }

    const session = await getSession(context)
    const getGames = async () => {
        const res = await axios.get<TGameResponse>(`${process.env.BASE_URL}/api/game/add/${session?.user?.id}`)
        return res.data.data
    }

    const gameData = await getGames()

    return {
        props: {
            session: session,
            gameData: gameData,
        },
    }
}
