import { IGame } from "./Game.types"
import { StaticImageData } from "next/image"


/* 
Game related data 
*/

export interface IShowGameInfoProps {
    gameData: IGame
}

export interface IMoveMatrixProps {
    gameData: [IGame]
}

export interface ITileProps {
    coordinate: string
    tenant: string
    darkSq: number
    img: StaticImageData | undefined
}


/* 
USER related data 
*/

export interface IStats {
    topFirstMove?: string
    mostSuccessfulOpening?: string
    mostPlayedTimeControl?: string
    WLD?: number[]
}

export interface IRatings {
    blitz?: number
    bullet?: number
    daily?: number
    rapid?: number
}

export interface User {
    _id: string
    email: string
    userName: string
    password: string
    games: string[]
    stats: IStats
    ratings?: IRatings
}
