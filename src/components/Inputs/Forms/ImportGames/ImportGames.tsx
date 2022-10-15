import * as S from "./ImportGames.styles";
import GetChessCom from "../GetChessCom/GetChessCom";
import PrimaryBtn from "../../Buttons/PrimaryBtn/PrimaryBtn";



const ImportGames = () => {
    const handleSubmit = () => {

    }

    const handleInput = () => {

    }

    // Notes:
    // Here will be a control flow point about which component to display, either
    // display LiChess or chess com games.
    // Don't forget to add a step to make sure the user confirms their username (if possible?).


    return (
        <S.GetImportGames>
            <h1>Import Chess Games</h1>

            <div className="optionContainer">
                <PrimaryBtn text={"Get LiChess Games"} onClick={handleSubmit} />
                <PrimaryBtn text={"Get Chess.com Games"} onClick={handleSubmit} />
            </div>


        </S.GetImportGames>
    );
};

export default ImportGames;