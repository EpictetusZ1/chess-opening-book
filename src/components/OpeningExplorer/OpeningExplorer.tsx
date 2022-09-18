import * as S from "./OpeningExplorer.styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {IGame} from "../../types/Game.types";
import CreateOpeningMatrix from "../../utils/createOpeningMatrix";
import {StyledComponent, StyledComponentBase, StyledInterface} from "styled-components";


type Props = {
    gameData: IGame[]
}


const OpeningExplorer = ({gameData}: Props) => {
    type TNextMove = {
        id: string
        freq: number
        prevMove: string
        variations: [TNextMove]
    }

    type TExplorerData = {
        possibleNextMoves: TNextMove[]
        currIndex: number
    }

    const initialExplorerData: TExplorerData = {
        possibleNextMoves: [],
        currIndex: 0
    }
    // const [moveList, setMoveList] = useState<string[]>([""])
    // const [nextMoves, setNextMoves] = useState<any[]>([])

    const [explorerData, setExplorerData] = useState<any>(initialExplorerData)
    const [showData, setShowData] = useState<boolean>(false)

    useEffect(() => {
        // const getMoveList = async () => {
        //     const res = await axios.post(`/api/game/byMoves`, data)
        //     if (res.data) {
        //         console.log("Res from game by moves: ", res.data.result)
        //         setMoveList(res.data.result)
        //     }
        // }
        // getMoveList()

        //@ts-ignore
        const result = CreateOpeningMatrix(gameData)
        let target = parseInt(explorerData.currIndex)
        setExplorerData({
            ...explorerData,
            possibleNextMoves: result[target]
        })
        setShowData(true)

    }, [])

    return (
        <S.OpeningExIsland>
            <thead>
            <tr>
                <th>Move</th>
                <th>Frequency</th>
            </tr>
            </thead>
            <S.MoveList>
                { showData && explorerData.possibleNextMoves.map((move: any, index: number) => {
                    return (
                        <tr key={index} className={"move"}>
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


            {/*            <thead>
            <tr>
                <th>Players</th>
                <th>Result</th>
                <th>Moves</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {games.map((game: IGame) => (
                <tr key={game.id}>
                    <td>
                        <div className={"playerInfo"}>
                            <span><b>{game.white}</b> ({game.whiteElo})</span>
                            <span><b>{game.black}</b> ({game.blackElo})</span>
                        </div>
                    </td>
                    <td>{game.result}</td>
                    <td>{Math.floor(game.moves.length / 2)}</td>
                    <td>{game.date}</td>
                </tr>
            ))}
            </tbody>*/}


        </S.OpeningExIsland>
    );
};

export default OpeningExplorer;
