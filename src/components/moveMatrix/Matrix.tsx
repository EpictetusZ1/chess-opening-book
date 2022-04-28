import React from 'react';
import axios from "axios";
import * as S from "../ShowGameData/ShowGameData.Styles";
import {IMoveMatrixProps} from "../../types/Main.types";

const Matrix: React.FC<IMoveMatrixProps> = ({gameData}) => {

    // const handleGetMatrix = async (e: any) => {
    //     e.preventDefault()
    //
    //     return await axios.post('/api/handleMatrix/matrixRoute')
    //         .then( (r) => {
    //             console.log(r)
    //
    //         })
    //         .catch((e) => {
    //             console.log(e)
    //         })
    // }

    const ShowMoves = () => {

        /**
         * @param data is an Array containing N number of children Arrays
         * @summary
         *  1. Get all the moves at X, then get their frequency
         *  2. Get all the moves at Y where X comes before them in order
         *
         */
        const createMatrix = (data: any) => {


            let map = new Map()

            for (let i = 0; i < data.length; i++) {
                let moves = data[i]

                for (let p = 0; p < 1; p++) {
                    if (map.has(moves[p][0])) {
                        map.set(moves[p][0], map.get(moves[p][0]) + 1)
                    } else {
                        map.set(moves[p][0], 1)
                    }
                }
            }

        }

        // createMatrix(allMoveList)

        return (
            <S.MovesList>
                Formatting Bro
                {/*{ gameData[0]["moves"]*/}
                {/*    .map( (item: any) => formatMove(item)) }*/}
            </S.MovesList>
        )
    }


    return (
        <div>
            <br/>
            <br/>
            {/*<button onClick={handleGetMatrix}>*/}
            {/*    Show your Game Matrix*/}
            {/*</button>*/}
        </div>
    );
}

export default Matrix;