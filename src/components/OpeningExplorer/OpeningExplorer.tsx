import * as S from "./OpeningExplorer.styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {IGame} from "../../types/Game.types";


type Props = {
    gameData: IGame[]
}

type TNextMove = {
    id: string
    freq: number
    prevMove: string
    variations: TNextMove[]
}
// {
//     "nextPlyIndex": 0,
//     "_id": "e4",
//     "nextMove": "e4",
//     "gamesInBranch": 103,
//     "white": 62,
//     "black": 37,
//     "draw": 4
// }
type TExplorerData = {
    nextPlyIndex: number
    _id: string
    nextMove: string
    gamesInBranch: number
    white: number
    black: number
    draw: number
}


const OpeningExplorer = () => {
    const initExplorerData: TExplorerData[] = []
    const [explorerData, setExplorerData] = useState<TExplorerData[]>([])
    const [gamesAtPly, setGamesAtPly] = useState<number>(0)
    const [showData, setShowData] = useState<boolean>(false)
    const [moveList, setMoveList] = useState<string[]>([])


    useEffect(() => {
        const getOpeningMatrix = async () => {
            const data = {
                startIndex: 0,
                moveList: moveList,
                isFirstMove: !showData
            }
            console.log("data", data)
            const res = await axios.post(`/api/aggregateMatrix`, data)
            console.log("Res from aggregateMatrix: ", res.data.result)
            setExplorerData(res.data.result)
            setShowData(true)

            // Do this elsewhere later, not efficient for larger data sets
            setGamesAtPly(res.data.result.reduce((acc: number, curr: any) => acc + curr.gamesInBranch, 0))
        }
        getOpeningMatrix()

    }, [moveList])

    const handleClick = (e: any, key: any) => {
        const moveID = explorerData.find((move: any) => move._id === key)
        setMoveList((prevState: any) => (
            [...prevState, key]
        ))
    }
    type MoveProps = {
        moveList: string[]
    }

    // TODO" Convert something here to be a ply
    const RenderMoveList = ({moveList}: MoveProps) => {
        const wholeMove = []
        for (let i = 0; i < moveList.length; i++) {
            if (moveList[i + 1]) {
                wholeMove.push(`${moveList[i]} ${moveList[i + 1]}`)
                i++
            } else {
                wholeMove.push(moveList[i])
            }
        }
        return (
            <div>
                {wholeMove.map((move: string, index: number) => (
                    <span key={move}>
                        {index + 1}. &nbsp;
                        {move}  &nbsp;
                    </span>
                ))}
            </div>
        )
    }


    return (
        <>
            <S.MovesPlayed>
                <br/>

                <RenderMoveList moveList={moveList}/>

                <br/>
            </S.MovesPlayed>
            <S.OpeningExIsland>
                <thead>
                <tr>
                    <th>Move</th>
                    <th>Frequency</th>
                    <th>Win Rates</th>
                </tr>
                </thead>
                <S.MoveList>
                    { showData && explorerData.map((move: any, index: number) => {
                        return (
                            <tr className={"move"}
                                onClick={(event) => handleClick(event, move._id)}
                                key={move._id}
                            >
                                <td className={"moveValue"}>
                                    {move.nextMove} &nbsp;
                                </td>
                                <td className={"gameOutcomes"}>
                                    <S.WLDBar sum={move.gamesInBranch}
                                              white={move.white}
                                              draw={move.draw}
                                              black={move.black}>
                                        <div className={"whiteVal"}>{move.white}</div>
                                        <div className={"drawVal"}>{move.draw}</div>
                                        <div className={"blackVal"}>{move.black}</div>
                                    </S.WLDBar>
                                </td>
                                <td className={"moveFreq"}>
                                    <S.MoveBar width={Math.floor((move.gamesInBranch / gamesAtPly) * 100)}>
                                        <p className="moveFreqText">
                                            {move.gamesInBranch}
                                        </p>

                                    </S.MoveBar>
                                </td>

                            </tr>
                        )
                    })}
                </S.MoveList>
            </S.OpeningExIsland>
        </>
    );
};

export default OpeningExplorer;
