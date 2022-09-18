import { IGame } from "./Game.types"

/* 
Game related data 
*/

export interface IShowGameInfoProps {
  gameData: IGame
}

// gameData is an array of games
export interface IMoveMatrixProps {
  gameData: [IGame]
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
