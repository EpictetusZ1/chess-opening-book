import React, {useState} from "react";
import {IDisplayGameInfoProps} from "../../types/Main.types";
import * as S from "./ShowGameData.Styles"


const ShowGameData: React.FC<IDisplayGameInfoProps> = ({gameData}) => {

    const [showMoveList, setShowMoveList] = useState<boolean>(true)
    const gameObj: {[index: string]: any} = gameData

    const ShowMoves = () => {

        const formatMove = (item: any) => {
            const singleMoveArr = item.split(" ")

            return (
                <div className={"singleMoveCont"}>
                    <div className={"singleMove"}>
                        <span className={"moveIndex"}>{singleMoveArr[0]}</span>
                        <span className={"ply"}>{singleMoveArr[1]}</span>
                        <span className={"ply"}>{singleMoveArr[2]}</span>
                    </div>
                </div>
            )
        }

        return (
            <S.MovesList>
                { gameData["moves"]
                    .map( (item: any) => formatMove(item)) }
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

            { showMoveList ? <ShowMoves /> : <ShowInfo />}

        </S.MainContainer>
    )
}

export default ShowGameData;