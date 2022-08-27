import * as S from "./PlayerStats.styles";
import {IGame} from "../../types/Game.types";


type PSProps = {
   stats: any
}

const PlayerStats = ({stats}: PSProps) => {


    return (
        <S.PlayerStats>
            <h2>Statistics</h2>
            <div className={"statItem"}>
                <p className="statTitle">
                    Best Win
                </p>
                <p className="statValue">
                    {stats.bestWin}
                </p>
            </div>
            <div className={"statItem"}>
                <p className="statTitle">
                    Peak Rating
                </p>
                <p className="statValue">
                    {stats.peakRating}
                </p>
            </div>

        </S.PlayerStats>
    )
}

export default PlayerStats;