import React from 'react';
import {IMoveMatrixProps} from "../../types/Main.types";
import {IGame, IMove} from "../../lib/models/game";

/**
 * @summary
 *  1. Get all the moves at X, then get their frequency
 *  2. Get all the moves at Y where X comes before them in order
 *
 * @param gameData is an array of the Game objects,
 *
 */
const CreateMatrix: React.FC<IMoveMatrixProps> = ({gameData}) => {

    const accessMoves = (data1: [IGame]) => {
        let allMoveList = []

        for (let i = 0; i < data1.length; i++) {
            let moves = data1[i]["moves"]
            allMoveList.push(moves)
        }
        return allMoveList
    }

    const data2 = accessMoves(gameData)

    const createMatrix = (data3: any) => { // data2 is an array of IMove objects
        let map = new Map()

        for (let i = 0; i < data3.length; i++) {
            let moves = data3[i]

            for (let p = 0; p < 1; p++) {
                let ply = { w: moves[p].w, b: moves[p].b }
                if ( map.has(ply.w) ) {
                    map.set(ply.w, map.get(ply.w) + 1)
                } else {
                    map.set(ply.w, 1)
                }
                if (map.has(ply.b)) {
                    map.set(ply.b, map.get(ply.b) + 1)
                } else {
                    map.set(ply.b, 1)
                }
            }
        }
        return map
    }

    const firstResult = createMatrix(data2)

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

export default CreateMatrix;