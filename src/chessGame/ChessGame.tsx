import {GameState} from "./ChessEngine";
import * as S from "./ChessGame.styles"
import {useState} from "react";
import {StaticImageData} from 'next/image'
import bB from "../public/pieceImages/bB.png"
import bK from "../public/pieceImages/bK.png"
import bN from "../public/pieceImages/bN.png"
import bP from "../public/pieceImages/bP.png"
import bQ from "../public/pieceImages/bQ.png"
import bR from "../public/pieceImages/bR.png"
import wB from "../public/pieceImages/wB.png"
import wK from "../public/pieceImages/wK.png"
import wN from "../public/pieceImages/wN.png"
import wP from "../public/pieceImages/wP.png"
import wQ from "../public/pieceImages/wQ.png"
import wR from "../public/pieceImages/wR.png"
import Tile from "./Tile"


const ChessGame = () => {
    const pieceImages: { [index: string]: any } =  {
        bB: bB,
        bK: bK,
        bN: bN,
        bP: bP,
        bQ: bQ,
        bR: bR,
        wB: wB,
        wK: wK,
        wN: wN,
        wP: wP,
        wQ: wQ,
        wR: wR
    }

    // Y Axis (Vertical Axis)
    const files = ["a", "b", "c", "d", "e", "f", "g", "h"]

    // X Axis (Horizontal Axis)
    const ranks = ["1", "2", "3", "4", "5", "6", "7", "8"]

    const [selectedPiece, setSelectedPiece] = useState<StaticImageData>(wP)

    // Inverted for loop so a1 gets output at the correct location on board
    const loadBoard = () => {
        let squares = []
        for (let i = files.length - 1; i >= 0; i--) {
            for (let j = 0; j < ranks.length; j++) {
                const number = j + i + 2
                const tenant = boardAlpha.board[i][j]

                squares.push( <Tile coordinate={`${files[j]}${ranks[i]}`}
                                    tenant={tenant}
                                    img={loadImages(tenant)}
                                    key={`${files[j]}${ranks[i]}`}
                                    darkSq={(number % 2)}
                />)
            }
        }
        return squares
    }

    const loadImages = (piece: string) => {
        return pieceImages[piece] || undefined
    }


    const boardAlpha = new GameState()
    const makeBoardSquares = loadBoard()
    const dimension = 8
    const sqSize = 512 / dimension


    return (
        <S.BoardContainer>

            {makeBoardSquares.map( (item) => item)}
        </S.BoardContainer>
    );
}

export default ChessGame;