import * as S from './GamesTable.styles';
import {IGame} from "../../types/Game.types";

type TProps = {
    games: IGame[]
}

const GamesTable = ({games}: TProps) => {
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
                <tr key={game._id}>
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
            ))}
            </tbody>

        </S.GamesTable>
    )
};

export default GamesTable;