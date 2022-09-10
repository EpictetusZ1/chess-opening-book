import * as S from "./analysis.styles"
import CreateOpeningMatrix from "../../utils/createOpeningMatrix";
import {IGame} from "../../types/Game.types";
import {Session} from "next-auth";
import {useState, useEffect} from "react";
import {GetServerSideProps} from "next";
import {getSession} from "next-auth/react";
import axios from "axios";


type Props = {
    session: Session | null
    gameData: [IGame]
}

const Analysis = ({gameData, session}: Props) => {
    const [moveList, setMoveList] = useState<string[]>([""])
    const [potentialVariations, setPotentialVariations] = useState<any[]>([])



    useEffect(() => {
        const matrix = CreateOpeningMatrix(gameData)
        console.log("Matrix: ", matrix)

    }, [])




    return (
        <S.OpeningExplorerContainer>
            <h2>Explore your openings</h2>
            <div>
                <h3>Move list</h3>
                {moveList.map((move, i) => {
                    return (
                        <div key={move+i}>
                            <p>{move}</p>
                        </div>
                    )
                })}

            </div>
            <h3>Variations</h3>

            <S.VariationContainer>
                {potentialVariations.map((variation, i) => {
                    return (
                        <div key={variation + i} className={"variationItem"}>
                            <p>{variation.move} </p>
                            &nbsp;
                            <p>{variation.freq}</p>
                            {/*<p>{variation.variations}</p>*/}
                        </div>
                    )
                })}



            </S.VariationContainer>
        </S.OpeningExplorerContainer>
    );
};

export default Analysis;


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
