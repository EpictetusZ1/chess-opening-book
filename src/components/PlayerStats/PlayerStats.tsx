import * as S from "./PlayerStats.styles";
import {IGame} from "../../types/Game.types";


type PSProps = {
    stats: any
}

const PlayerStats = ({stats}: PSProps) => {
    console.log("win loss draw rate: ", stats.WLD)

    let sum = stats.WLD.win + stats.WLD.loss + stats.WLD.draw
    let winRate = ((stats.WLD.win / sum) * 100).toFixed(2)
    let drawRate = ((stats.WLD.draw / sum) * 100).toFixed(2)
    let lossRate = ((stats.WLD.loss / sum) * 100).toFixed(2)

    return (
        <S.PlayerStats>
            <h2 aria-label={"game statistics"}>
                Statistics
            </h2>
            <span className={"gameCountCont"}>
                <p className="statTitle">
                    All Games
                </p>
            <span className={"accentText"}>({sum})</span>
            </span>

            <div className="inlineStats">
                <div className="statItem">
                    <p className="statTitle">
                        You won {stats.WLD.win} games
                    </p>
                    <p className="statValue">
                        {winRate}%
                    </p>
                </div>

                <div className="statItem">
                    <p className="statTitle">
                        You drew {stats.WLD.draw} games
                    </p>
                    <p className="statValue">
                        {drawRate}%
                    </p>
                </div>

                <div className="statItem">
                    <p className="statTitle">
                        You lost {stats.WLD.loss} games
                    </p>
                    <p className="statValue">
                        {lossRate}%
                    </p>
                </div>
            </div>

            <div className="inlineStats">
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
            </div>

        </S.PlayerStats>
    )
}

export default PlayerStats;