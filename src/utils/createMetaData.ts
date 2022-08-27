import {IGame, IGameMeta} from "../types/Game.types";

export const createMetaData = (data: IGame, targetUserName: string, id: string): IGameMeta => {
    const determinePlayer = (player: string) => {
        if (player === targetUserName) {
            return id
        } else return null
    }

    const determineWinner = (result: string) => {
        if (result === "1-0") {
            return "white"
        } else if (result === "0-1") {
            return "black"
        } else return "draw"
    }

    const assignWinner = (winner: string) => {
        if (winner === "white") {
            return determinePlayer(data.white)
        } else if (winner === "black") {
            return determinePlayer(data.black)
        } else return null
    }

    const winner = determineWinner(data.result)

    return {
        wElo: data.whiteElo || null,
        wProfileId: determinePlayer(data.white),
        bElo: data.blackElo || null,
        bProfileId: determinePlayer(data.black),
        winner: winner,
        winnerProfileId: assignWinner(winner)
    }
}
