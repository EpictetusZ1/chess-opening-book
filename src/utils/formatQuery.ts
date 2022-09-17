export const formatQuery = (() => {

    type TQueryByMoves = {
        [key: string]: string
    }

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

    // TODO: Incorporate this: { $setIntersection: [ <array1>, <array2>, ... ] } into the query?
    const gameByMoves = (startIndex: number = 0, moveList: string[]): TQueryByMoves[] => {
        if (moveList.length === 0) {
            throw new Error("moveList must not be empty")
        } else {
            let query = []
            for (let i = 0; i < moveList.length; i++) {
                query.push({ [`moves.${startIndex + i}`]: moveList[i] })
            }
            return query
        }
    }

    return {
        openingByMoves,
        gameByMoves
    }
})();