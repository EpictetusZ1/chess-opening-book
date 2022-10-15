import * as S from "./ImportGames.styles";
import GetChessCom from "../GetChessCom/GetChessCom";
import PrimaryBtn from "../../Buttons/PrimaryBtn/PrimaryBtn";
import { useState } from "react";
import GetLiChess from "../GetLiChess/GetLiChess";

enum E {
    CHESS_COM = "CHESS_COM",
    LI_CHESS = "LI_CHESS",
    NONE = "NONE"
}

type TImportGames = {
    closeModal: () => void
}

const ImportGames = ({closeModal}: TImportGames) => {
    const [chessProvider, setChessProvider] = useState<E>(E.NONE)

    const handleInput = () => {

    }

    // Notes:
    // Here will be a control flow point about which component to display, either
    // display LiChess or chess com games.
    // Don't forget to add a step to make sure the user confirms their username (if possible?).


    return (
        <S.GetImportGames>
            <h1>Import Chess Games</h1>
            <div className="contentBody">
                { chessProvider === E.NONE && (
                    <div className="optionContainer">
                        <PrimaryBtn text={"From LiChess"} onClick={() => setChessProvider(E.LI_CHESS)} />
                        <PrimaryBtn text={"From Chess.com"} onClick={() => setChessProvider(E.CHESS_COM)} />
                    </div>
                )}

                { chessProvider === E.CHESS_COM && <GetChessCom closeModal={closeModal} /> }
                { chessProvider === E.LI_CHESS && <GetLiChess closeModal={closeModal} /> }
            </div>
        </S.GetImportGames>
    );
};

export default ImportGames;
{/*<form onSubmit={handleSubmit}>*/}
{/*    <input type="text"*/}
{/*           id="liChessId"*/}
{/*           name="liChessId"*/}
{/*           aria-label={"enter your li chess user name"}*/}
{/*           required={true}*/}
{/*           onChange={handleInput}*/}
{/*    />*/}

{/*    <button type="submit"*/}
{/*            aria-label={"request li chess games"}*/}
{/*    >*/}
{/*        Request Games*/}
{/*    </button>*/}
{/*</form>*/}