// This is actually going to be a funtion that takes args. Like game/byMoves.ts
export const matrixByMoves = [
    {
        '$match': {
            '$and': [
                {
                    'moves.0': 'e4'
                }, {
                    'moves.1': 'c5'
                }
            ]
        }
    }, {
        '$project': {
            '_id': 1,
            'winner': '$gameMeta.winner',
            'nextMove': {
                '$arrayElemAt': [
                    '$moves', 2
                ]
            }
        }
    }, {
        '$set': {
            'nextPlyIndex': 2
        }
    }, {
        '$group': {
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
                        'if': {
                            '$eq': [
                                '$winner', 'black'
                            ]
                        },
                        'then': 1,
                        'else': 0
                    }
                }
            },
            'white': {
                '$push': {
                    '$cond': {
                        'if': {
                            '$eq': [
                                '$winner', 'white'
                            ]
                        },
                        'then': 1,
                        'else': 0
                    }
                }
            },
            'draw': {
                '$push': {
                    '$cond': {
                        'if': {
                            '$eq': [
                                '$winner', 'draw'
                            ]
                        },
                        'then': 1,
                        'else': 0
                    }
                }
            }
        }
    }, {
        '$project': {
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