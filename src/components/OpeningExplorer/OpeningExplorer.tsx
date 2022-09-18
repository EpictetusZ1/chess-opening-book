import * as S from "./OpeningExplorer.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import {IGame} from "../../types/Game.types";


type Props = {
    gameData: IGame[]
}

const OpeningExplorer = ({gameData}: Props) => {
    const [moveList, setMoveList] = useState<string[]>([""])
    const [potentialVariations, setPotentialVariations] = useState<any[]>([])

    //TODO: Fix round parsing


    useEffect(() => {
        const data = {
            startIndex: 0,
            moveList: ["e4", "c5"]
        }

        const data2 = {
            startIndex: 0,
            // moveList: ["e4", "c5", "Nc3", "Nc6", "Nf3", "e6", "d4", "cxd4", "Nxd4", "a6", "Nxc6", "bxc6", "Bd3", "Be7", "O-O", "O-O", "Qe2", "d6", "Rfd1", "Qc7", "Qg4", "Rac8", "Qxg7", "Rxc2", "Qh6+", "Kf8", "Qxh7", "Rc1+", "Kg2"]
            moveList: ["e4", "c5", "Nc3", "Nc6", "Nf3", "e6",]

        }

        const getMoveList = async () => {
            const res = await axios.post(`/api/game/byMoves`, data2)
            // const res = await axios.post(`/api/opening`, data)
            if (res.data) {
                console.log("Res from game by moves: ", res.data.result)
                setMoveList(res.data.result)
            }
        }
        getMoveList()

    }, [])



    return (
        <S.OpeningExIsland>

        </S.OpeningExIsland>
    );
};

export default OpeningExplorer;

// {potentialVariations.map((variation, i) => {
//     return (
//         <div key={variation + i} className={"variationItem"}>
//             <p>{variation.move} </p>
//             &nbsp;
//             <p>{variation.freq}</p>
//             {/*<p>{variation.variations}</p>*/}
//         </div>
//     )
// })}