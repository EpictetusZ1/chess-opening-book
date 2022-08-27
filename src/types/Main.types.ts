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

// TODO: Add fields to this interface
// consider adding "C" to WLD for count of games played
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

export interface IUserNames {
  liChess: string | undefined
  chessCom: string | undefined
}

export interface IUserProfile {
  userId: string
  email: string
  games: string[]
  stats: IStats
  ratings?: IRatings
  userNames?: IUserNames
}
