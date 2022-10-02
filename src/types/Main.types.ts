import { IGame } from "./Game.types"

/*
  A11y Context Types
*/

// Create the actual object that tracks saved DB state after.

export interface ITheme {
  colors: IColors
  typography: ITypography
  fontFamily: string
}


export interface IColors {
  // COLOR
  primary: string
  secondary: string
  tertiary: string

  // HIGHLIGHT
  highlightPrimary: string
  highlightSecondary: string

  // BUTTON
  btnPrimary: string
  btnSecondary: string
  buttonClose: string

  // MODAL
  modalPrimary: string
  modalText: string

  // TEXT COLOR
  textPrime: string
  btnText: string
  accentTextColor: string

  // // TYPOGRAPHY
  // typography: ITypography
}

export interface ITypography {
  headerSize: string
  subHeaderSize: string
  subHeaderWeight: number

  pSize: string
  accentTextSize: string
}



// TODO: ADD a11y preferences here after.


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
