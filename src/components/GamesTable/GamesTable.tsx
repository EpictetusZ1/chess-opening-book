import * as S from './GamesTable.styles';
import {IGame} from "../../types/Game.types";
import Link from "next/link";

type TProps = {
    games: IGame[]
}

const GamesTable = ({games}: TProps) => {
    console.log("game data (single): ", games[0])
    return (
        <S.GamesTable>
            <thead>
            <tr>
                <th>Players</th>
                <th>Result</th>
                <th>Moves</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {games.map((game: IGame) => (
                <Link href={`/game/${game.id}`} key={game.id}>
                <tr key={game.id}>
                    <td>
                        <div className={"playerInfo"}>
                            <span><b>{game.white}</b> ({game.whiteElo})</span>
                            <span><b>{game.black}</b> ({game.blackElo})</span>
                        </div>
                    </td>
                    <td>{game.result}</td>
                    <td>{Math.floor(game.moves.length / 2)}</td>
                    <td>{game.date}</td>
                </tr>
                </Link>
            ))}
            </tbody>

        </S.GamesTable>
    )
};

export default GamesTable;