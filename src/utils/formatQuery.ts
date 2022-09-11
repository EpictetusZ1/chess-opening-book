export const formatQuery = (() => {

    type TQueryByMoves = {
        [key: string]: string
    }

    const byMoves = (startIndex: number, moveList: string[]): TQueryByMoves[] => {
        if (moveList.length === 0) {
            throw new Error("moveList must be an array of strings")
        } else {
            let query = []
            for (let i = 0; i < moveList.length; i++) {
                query.push({ [`moves.${startIndex + i}`]: moveList[i] })
            }
            return query
        }
    }

    return {
        byMoves
    }

})();