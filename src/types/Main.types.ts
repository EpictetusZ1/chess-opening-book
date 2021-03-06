import {IGame} from "../lib/models/game"
import {StaticImageData} from "next/image";

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