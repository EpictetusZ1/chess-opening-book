import React, {useState} from "react";
import {IShowGameInfoProps} from "../../types/Main.types";
import * as S from "./ShowGameData.styles"
import { IGame } from "../../types/Game.types";
import CreateMatrix from "../CreateMoveMatrix/createMatrix";


const ShowGameData: React.FC<IShowGameInfoProps> = ({gameData}) => {
    const [showMoveList, setShowMoveList] = useState<boolean>(true)
    const gameObj: { [index: string]: any } = gameData
    const moves: string[] = gameObj[0].moves
    // TODO: This should be a "card" in a time kinda, that can display a list of your games

    const ShowMoves = () => {
        const formatMove = (move: any, index: number) => {
            return (
                <div className={"singleMoveCont"}>
                    <div className={"singleMove"}>
                        <span className={"moveIndex"}>{index}.</span>
                        <span className={"ply"}>{move.w}</span>
                        <span className={"ply"}>{move.b}</span>
                    </div>
                </div>
            )
        }
        return (
            <S.MovesList>
                { moves.map( (item: any, index: number) => formatMove(item, index + 1)) }
            </S.MovesList>
        )
    }

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
            {/*<ShowMoves />*/}

            <S.MenuTabCont>
                <button
                    onClick={() => setShowMoveList(true)}
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