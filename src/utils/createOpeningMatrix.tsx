import React from 'react';
import {IGame} from "../types/Game.types";

/**
 *
 * @summary
 *  1. Get all the moves at X, then get their frequency
 *  2. Get all the moves at Y where X comes before them in order
 *
 * @param gameData is an array of the Game objects,
 *
 */

    // TODO: Add ability to accept args, like how many variations to show, the depth, etc.
    // Consider changing this to a class, and then have utilities on it as methods
    // TODO: Later add a check to see if the next item in the list exists for step 2.


interface IPlyDataInput {
    [key: string]: {
        freq: number
        prevMove: string
    }
}

interface IPlyData {
    [key: number]: {
        id: string
        freq: number
        prevMove: string
    }
}

interface IVariationsContainer {
    id: string
    freq: number
    prevMove: string
    variations: IPlyData
}

interface IPlyMatrix {
    // key is the ply number
    [key: number]: {
        [key: string]: IVariationsContainer // This is the variations' container, the key is the current move i.e. "e4"
    }
}


const CreateOpeningMatrix = (gameData: [IGame]) => {


    const accessMoves = (data1: [IGame]) => {
        let allMoveList = []

        for (let i = 0; i < data1.length; i++) {
            let moves = data1[i]["moves"]
            allMoveList.push(moves)
        }
        return allMoveList
    }

    const moveMatrix = accessMoves(gameData)

    const createMatrix = (moveList: string[][], depth: number, baseMatrix: IPlyMatrix = {}) => { // data2 is an array of IMove objects
        let moveMatrix = baseMatrix

        const sortAndCleanVariation = (variation: IPlyDataInput) => {
            let sortedVariation = []
            const variationKeys = Object.keys(variation)
            for (let i = 0; i < variationKeys.length; i++) {
                sortedVariation.push({...variation[variationKeys[i]], id: variationKeys[i]})
            }

            sortedVariation.sort((a, b) => {
                return b.freq - a.freq
            })
            return sortedVariation
        }

        const makeVariation = (plyIndex: number, prevMove: string, currMove: string): IPlyData => {
        //    Define a variable called result, this will be all the variations.
        //   1. Check all games in moveList, then access the element at index, to make sure it is === prevMove
        //   2. If it is proceeded with creating/checking the variation: IPlyData and pass it the next move (which is index +1), else break out of the loop because that is not the correct path equality
        //   3. Create / check if the variation - which is referenced by its move name - exists, if it doesn't - create it. Else increment the frequency with which it occurs in that position of the moveList

            let result: IPlyDataInput = {}
            moveList.forEach( (game) => {
                if (game[plyIndex] === currMove) {
                    if (plyIndex > 0) {
                        if (game[plyIndex - 1] === prevMove) {
                            if (result[game[plyIndex + 1]] === undefined) {
                                result[game[plyIndex + 1]] = {
                                    freq: 1,
                                    prevMove: currMove
                                }
                            } else {
                                result[game[plyIndex + 1]].freq++
                            }
                        }
                    } else if (plyIndex === 0) {
                        if (result[game[plyIndex + 1]] === undefined) {
                            result[game[plyIndex + 1]] = {
                                freq: 1,
                                prevMove: currMove
                            }
                        } else {
                            result[game[plyIndex + 1]].freq++
                        }
                    }
                }
            })

            return sortAndCleanVariation(result)
        }

        const checkIfExists = (index: number, currMove: string, previousMove: string) => {
            if (moveMatrix[index] === undefined) {
                moveMatrix[index] = {}
            }
            if (moveMatrix[index][currMove] === undefined) {
                moveMatrix[index][currMove] = {  id: currMove, freq: 1, prevMove: previousMove, variations: {} }
                moveMatrix[index][currMove].variations = makeVariation(index, previousMove, currMove)
            } else if (moveMatrix[index][currMove]) {
                moveMatrix[index][currMove].freq++
            }
        }


        for (let i = 0; i < moveList.length; i++) { // The ONLY purpose of i is to control how many games we look at
            /**
             * @param moves
             * is the entire list of moves for a single game object
             *
             * @param i controls how many games to evaluate
             */
            let moves = moveList[i]
            let previousMove: string = ""

            for (let p = 0; p <= depth; p++) {
                if (p > 0) previousMove = moves[p - 1]
                let move: string = moves[p]
                checkIfExists(p, move, previousMove)
            }
        }

        return moveMatrix
    }


    const freqMatrix = createMatrix(moveMatrix, 3)

    const sortByFreq = (obj: IPlyMatrix) => {
        let sortedObj: {[key: number]: any} = {}
        for (let key in obj) {
            sortedObj[key] = Object.values(obj[key]).sort((a, b) => {
                return b.freq - a.freq
            })
        }

        return sortedObj
    }

    return sortByFreq(freqMatrix)
}

export default CreateOpeningMatrix;