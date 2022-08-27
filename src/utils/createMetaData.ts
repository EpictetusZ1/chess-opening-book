import { IGame, IGameMeta } from "../types/Game.types";

export const createMetaData = (data: IGame, targetUserName: string, id: string): IGameMeta => {
    const determinePlayer = (player: string) => {
        if (player === targetUserName) {
            return id
        } else return undefined
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
        } else return undefined
    }

    const winner = determineWinner(data.result)

    const newMeta: IGameMeta = {
        wElo: data.whiteElo,
        wProfileId: determinePlayer(data.white),
        bElo: data.blackElo,
        bProfileId: determinePlayer(data.black),
        winner: winner,
        winnerProfileId: assignWinner(winner)
    }
    console.log("newMeta", newMeta)

   return newMeta
}