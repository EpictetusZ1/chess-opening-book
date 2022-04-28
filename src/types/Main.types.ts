import {IGame} from "../lib/models/game"

export interface IShowGameInfoProps {
    gameData: IGame
}

export interface IMoveMatrixProps {
    gameData: [IGame]
}
