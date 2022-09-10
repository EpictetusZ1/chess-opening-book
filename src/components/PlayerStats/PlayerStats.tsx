import * as S from "./PlayerStats.styles";
import {IGame} from "../../types/Game.types";
import CreateOpeningMatrix from "../../utils/createOpeningMatrix";


type PSProps = {
    stats: any
}

const PlayerStats = ({stats}: PSProps) => {

    let sum = stats.WLD.win + stats.WLD.loss + stats.WLD.draw
    let winRate = ((stats.WLD.win / sum) * 100).toFixed(2)
    let drawRate = ((stats.WLD.draw / sum) * 100).toFixed(2)
    let lossRate = ((stats.WLD.loss / sum) * 100).toFixed(2)

    return (
        <S.PlayerStats>
            <span className={"gameCountCont"}>
                <h2 aria-label={"statistics on all games"}>
                    All Games
                </h2>
                 <span className={"accentText"}>{sum}</span>
            </span>

            <div className="inlineStats">
                <div className="statItem">
                    <p className="statTitle">
                        {stats.WLD.win} games won
                    </p>
                    <p className="statValue">
                        {winRate}%
                    </p>
                </div>

                <div className="statItem">
                    <p className="statTitle">
                      {stats.WLD.draw} games drew
                    </p>
                    <p className="statValue">
                        {drawRate}%
                    </p>
                </div>

                <div className="statItem">
                    <p className="statTitle">
                        {stats.WLD.loss} games lost
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