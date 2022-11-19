import * as S from "../../styles/pageStyles/Game.styles"
import {IGame} from "../../types/Game.types";
import {GetServerSideProps} from "next";
import axios from "axios";


interface IGamePageProps {
    game: IGame | any
}

const Game = ({game}: IGamePageProps) => {
    const formattedDate = new Date(game.date).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric"
    })

    const renderMoves = (moves: string[]) => {
        let moveIndex = 0
        return moves.map((move, index) => {
            if (index % 2 === 0) {
                moveIndex++
                return (
                    <div key={index} className={"ply"}>
                        <b>{moveIndex}.</b>
                        &nbsp;
                        <p>{moves[index]} {moves[index + 1]}</p>
                    </div>
                )
            }
        })
    }

    const parseSite = (site: string | null) => {
        const liChessPattern = /lichess/gi
        const chessComPattern = /chess.com/gi

        if (site) {
            if (liChessPattern.test(site)) {
                return "LiChess"
            } else if (chessComPattern.test(site)) {
                return "chess.com"
            } else {
                return site
            }
        }
    }

    const renderOtherTags = (tags: IGame["otherTags"]) => {
        type TTag = {
            name: string
            value: string
        }
        return tags.map((tag: TTag, index) => {
            console.log("Tag:", tag)
            return (
                <div key={index} className={"stat"}>
                    <b>{tag.name}</b>
                    <p>{tag.value}</p>
                </div>
            )
        })
    }


    return (
        <S.Game>
            <div className={"pageHeader"}>
                <h1>Game</h1>
                <hr/>
                <div className={"playerData"}>
                    <span>
                        <b>White </b> -
                        &nbsp;
                        <p aria-label={"user name"}>{game.white} {" "}</p>
                        <p className={"playerElo"}
                           aria-label={"player elo"}>
                            ({game.whiteElo})
                        </p>
                    </span>
                    <span>
                        <b>Black </b> -
                        &nbsp;
                        <p aria-label={"user name"}>{game.black}</p>
                        <p className={"playerElo"}
                           aria-label={"player elo"}>
                            ({game.blackElo})
                        </p>
                    </span>
                </div>


                <div className={"statContainer"}>
                   <h2>General Stats</h2>
                    <div className={"statsDisplay"}>
                        <span className={"stat"}>
                            <b>Event</b>
                            <p>{game.event}</p>
                        </span>
                        <span className={"stat"}>
                            <b>Site</b>
                            <p>{parseSite(game.site)}</p>
                        </span>
                        <span className={"stat"}>
                            <b>Time Control</b>
                            <p>{game.timeControl}</p>
                        </span>
                        <span className={"stat"}>
                           <b>Played On</b>
                            <p>{formattedDate}</p>

                        </span>
                        <span className={"stat"}>
                            <b>Result</b>
                            <p>{game.result}</p>
                        </span>

                        <span className={"stat"}>
                            <b>Termination</b>
                            <p>{game.termination}</p>
                        </span>
                    </div>
                </div>

                <div className={"statContainer"}>
                    <h2>Opening Information</h2>
                    <div className={"statsDisplay"}>
                        <span className={"stat"}>
                            <b>ECO</b>
                            <p>{game.opening.openingECO}</p>
                        </span>
                        <span className={"stat"}>
                            <b>Opening Name</b>
                            <p>{game.opening.openingName}</p>
                        </span>

                    </div>
                </div>

                <div className={"statContainer"}>
                    <h2>Additional Data</h2>
                    <div className="statsDisplay">
                        {renderOtherTags(game.otherTags)}
                    </div>
                </div>

                <div className="moveListCont">
                    <h2>Moves</h2>
                    <div className={"moveList"}>
                        {renderMoves(game.moves)}
                    </div>
                </div>
            </div>

        </S.Game>
    )
}

export default Game

export const getServerSideProps: GetServerSideProps<{
    game: IGame | any
}> = async (context) => {
    const id = context.params?.id
    const game = await axios.get<IGame>(`${process.env.BASE_URL}/api/game/view/${id}`)

    return {
        props: {
            game: game.data.data
        },
    }
}