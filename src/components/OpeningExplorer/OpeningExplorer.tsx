import * as S from "./OpeningExplorer.styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {IGame} from "../../types/Game.types";


type Props = {
    gameData: IGame[]
}

const OpeningExplorer = ({gameData}: Props) => {
    type TNextMove = {
        id: string
        freq: number
        prevMove: string
        variations: TNextMove[]
    }

    type TExplorerData = {
        possibleNextMoves: TNextMove[]
        currIndex: number
        currMove: string
    }

    const initialExplorerData: TExplorerData = {
        possibleNextMoves: [],
        currIndex: 0,
        currMove: ""
    }

    const [explorerData, setExplorerData] = useState<any>(initialExplorerData)
    const [showData, setShowData] = useState<boolean>(false)
    const [moveList, setMoveList] = useState<string[]>([])


    useEffect(() => {
        const getOpeningMatrix = async () => {
            const data = {
                startIndex: 0,
                moveList: moveList
            }
            const res = await axios.post(`/api/aggregateMatrix`, data)
            console.log("Res from aggregateMatrix: ", res.data)
        }

        setShowData(true)
        console.log("Move list: ", moveList)
        getOpeningMatrix()

    }, [moveList])

    // SAVE FIRST MOVE AGGREGATION PIPELINE.
    const handleClick = (e: any, key: any) => {
        const moveID = explorerData.possibleNextMoves[key].id
        console.log("Move ID: ", moveID)

        console.log("new explorer data: ", explorerData)

        setMoveList((prevState: any) => (
            [...prevState, explorerData.possibleNextMoves[key].id]
        ))
    }



    return (
        <>
            <S.MovesPlayed>
                <br/>
                {moveList.map((move: string, index: number) => (
                    <span key={index}>
                        {index + 1}. &nbsp;
                        {move}
                    </span>
                ))}
                &nbsp;
                <br/>
            </S.MovesPlayed>
            <S.OpeningExIsland>
                <thead>
                <tr>
                    <th>Move</th>
                    <th>Frequency</th>
                </tr>
                </thead>
                <S.MoveList>
                    { showData && explorerData.possibleNextMoves.map((move: any, index: number) => {
                        const id = move.id
                        return (
                            <tr
                                className={"move"}
                                onClick={(event) => handleClick(event, index)}
                                key={id}
                            >
                                <td className={"moveValue"}>
                                    {move.id}
                                </td>
                                <td className={"moveFreq"}>
                                    <S.MoveBar width={Math.floor((move.freq / gameData.length) * 100)}>
                                        <p className="moveFreqText">
                                            {move.freq}
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
