import * as S from "./OpeningExplorer.styles";
import { useEffect, useState } from "react";
import axios from "axios";
import {IGame} from "../../types/Game.types";


type Props = {
    gameData: IGame[]
}

const OpeningExplorer = ({gameData}: Props) => {
    // TODO Note to self:
    // So when componentMounts we want to have the moveList set to nothing, and show all games
    // then I want to show the next possible moves as buttons or something,
    // When a user clicks on a "move" it should update the state of the moveList and programmatically render out
    // onto the screen the new "byMoves" data.

    const [moveList, setMoveList] = useState<string[]>([""])
    const [potentialVariations, setPotentialVariations] = useState<any[]>([])

    useEffect(() => {
        const data = {
            startIndex: 0,
            moveList: ["e4", "c5"]
        }

        const getMoveList = async () => {
            const res = await axios.post(`/api/game/byMoves`, data)
            // const res = await axios.post(`/api/opening`, data)
            if (res.data) {
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