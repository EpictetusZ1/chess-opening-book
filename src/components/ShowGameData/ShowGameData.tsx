import React, {useState} from "react";
import {IShowGameInfoProps} from "../../types/Main.types";
import * as S from "./ShowGameData.Styles"
import CreateMatrix from "../moveMatrix/createMatrix";


const ShowGameData: React.FC<IShowGameInfoProps> = ({gameData}) => {
    const [showMoveList, setShowMoveList] = useState<boolean>(true)
    const gameObj: { [index: string]: any } = gameData
    console.log("Game data in ShowGameData: ", gameData)


    const ShowInfo = () => {
        const termination = gameData.termination
        const myDate = gameData.date
        return (
            <S.GameInfo>
                <div>{termination}</div>
                <br/>
                <div>{myDate}</div>
                <br/>
                <div>{gameData.site}</div>
                <br/>
                <div>{gameData.event}</div>
            </S.GameInfo>
        )
    }


    return (
        <S.MainContainer>
            Handle showing multiple uploads later

            <S.MenuTabCont>
                <button
                    onClick={() => setShowMoveList(prevState => !prevState)}
                >
                    Moves
                </button>
                <button
                    onClick={() => setShowMoveList(prevState => !prevState)}
                >
                    Info
                </button>
            </S.MenuTabCont>
            {/*@ts-ignore*/}
            { showMoveList ? <CreateMatrix gameData={gameData} /> : "none"}

        </S.MainContainer>
    )
}

export default ShowGameData;