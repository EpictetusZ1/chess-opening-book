import {GameState} from "./ChessEngine";
import * as S from "./ChessGame.styles"
import {useEffect, useState} from "react";
import Image, {StaticImageData} from 'next/image'
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


const ChessGame = () => {
    const pieceImages = [
        bB,
        bK,
        bN,
        bP,
        bQ,
        bR,
        wB,
        wK,
        wN,
        wP,
        wQ,
        wR
    ]

    const images: { [index: string]: any } = {}
    const pieces = ["wP", "wR", "wN", "wB", "wQ", "wK", "bP", "bR", "bN", "bB", "bQ", "bK"]

    const [selectedPiece, setSelectedPiece] = useState<StaticImageData>(wP)
    const [doneLoadingImg, setDoneLoadingImg] = useState<boolean>(false)

    const getImages = () => {
        for (let i = 0; i < pieces.length; i++) {
            images[pieces[i]] = pieceImages[i]
        }
        setDoneLoadingImg(true)

    }


    useEffect(() => {
        getImages()
    }, [])
    const loadImages = () => {

    }

    const boardAlpha = new GameState()
    const dimension = 8
    const sqSize = 512 / dimension


    return (
        <S.BoardContainer>
            <Image src={selectedPiece} width="100" height="100" />

        </S.BoardContainer>
    );
}

export default ChessGame;