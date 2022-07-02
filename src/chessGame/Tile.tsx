import React, {useState} from "react";
import {ITileProps} from "../types/Main.types";
import * as S from "./ChessGame.styles"
import {StaticImageData} from "next/image";
import Image from 'next/image'


const Tile: React.FC<ITileProps> = ({coordinate, tenant = "--", img, darkSq }) => {

    const [occupant, setOccupant] = useState<StaticImageData | undefined>(img)

    return (
        <>
            {/*@ts-ignore*/}
            { darkSq === 1 ? <S.BlackSquare coord={coordinate}>
                <h5>{coordinate}</h5>
                {occupant !== undefined && <Image src={occupant}  width="75" height="75" />}
                {/*@ts-ignore*/}
            </S.BlackSquare> : <S.WhiteSquare coord={coordinate}>
                <h5>{coordinate}</h5>
                {occupant !== undefined && <Image src={occupant}  width="75" height="75" />}
            </S.WhiteSquare> }
        </>
    );
}

export default Tile;