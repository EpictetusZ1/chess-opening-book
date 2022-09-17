export const formatQuery = (() => {

    type TQueryByMoves = {
        [key: string]: string
    }

    // { $setIntersection: [ <array1>, <array2>, ... ] }
    // TODO: Need to change "sequence" in opening to moveList

    const byMoves = (startIndex: number, moveList: string[]): TQueryByMoves[] => {
        if (moveList.length === 0) {
            throw new Error("moveList must not be empty")
        } else {
            let query = []
            for (let i = 0; i < moveList.length; i++) {
                query.push({ [`sequence.${startIndex + i}`]: moveList[i] })
            }
            console.log("query", query)
            return query
        }
    }

    return {
        byMoves
    }

})();