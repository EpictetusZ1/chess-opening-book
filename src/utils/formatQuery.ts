export const FormatQuery = (() => {

    type TQueryByMoves = {
        [key: string]: string
    }

    // Query Opening Model
    const openingByMoves = (startIndex: number, moveList: string[]): TQueryByMoves[] => {
        if (moveList.length === 0) {
            throw new Error("moveList must not be empty")
        } else {
            let query = []
            for (let i = 0; i < moveList.length; i++) {
                query.push({ [`sequence.${startIndex + i}`]: moveList[i] })
            }
            return query
        }
    }

    // Query Game Model
    // TODO: Incorporate this: { $setIntersection: [ <array1>, <array2>, ... ] } into the query?
    const gameByMoves = (startIndex: number = 0, moveList: string[]): TQueryByMoves[] => {
        let query = []
        for (let i = 0; i < moveList.length; i++) {
            query.push({ [`moves.${startIndex + i}`]: moveList[i] })
        }
        return query
    }

    // Building a Matrix
    const matrixPipeline = (startIndex: number = 0, moveList: string[], notFirstMove = false) => {
        const initialQuery = gameByMoves(startIndex, moveList)
        const nextPlyIndex = moveList.length

        const handleFirstMove = (): any => {

        }

        return [
            { '$match': { '$and': initialQuery } },
            { '$project': {
                    '_id': 1,
                    'winner': '$gameMeta.winner',
                    'nextMove': {
                        '$arrayElemAt': ['$moves', nextPlyIndex ]
                    }
            }},
            { '$set': { 'nextPlyIndex': nextPlyIndex } },
            { '$group': {
                    '_id': '$nextMove',
                    'gamesInBranch': {
                        '$count': {}
                    },
                    'nextPlyIndex': {
                        '$first': '$nextPlyIndex'
                    },
                    'black': {
                        '$push': {
                            '$cond': {
                                'if': { '$eq': [ '$winner', 'black']},
                                'then': 1,
                                'else': 0
                            }
                        }
                    },
                    'white': {
                        '$push': {
                            '$cond': {
                                'if': { '$eq': [ '$winner', 'white']},
                                'then': 1,
                                'else': 0
                            }
                        }
                    },
                    'draw': {
                        '$push': {
                            '$cond': {
                                'if': { '$eq': [ '$winner', 'draw']},
                                'then': 1,
                                'else': 0
                            }
                        }
                    }
                }
            },
            { '$project': {
                    '_id': '$_id',
                    'nextMove': '$_id',
                    'gamesInBranch': '$gamesInBranch',
                    'nextPlyIndex': 1,
                    'white': {
                        '$sum': '$white'
                    },
                    'black': {
                        '$sum': '$black'
                    },
                    'draw': {
                        '$sum': '$draw'
                    }
                }
            }
        ]
    }

    return {
        openingByMoves,
        gameByMoves,
        matrixPipeline
    }
})();