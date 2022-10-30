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