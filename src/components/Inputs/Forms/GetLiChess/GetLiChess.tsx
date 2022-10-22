import * as S from "./GetLiChess.styles";
import FormBtn from "../../Buttons/FormBtn/FormBtn";
import React from "react";
import axios from "axios";
import {useSession} from "next-auth/react";

type TGetLiChess = {
    closeModal: () => void
}

const GetLiChess = ({closeModal}: TGetLiChess) => {
    const { data: session, status } = useSession()
    const userName = "EpictetusZ1"

    const handleInput = () => {

    }

    const handleClick = async () => {
        const res = await axios.get(`/api/liChess/${userName}`)
        console.log("RES")
        console.log(res.data)

    // Add games to users profiles
        if (res) {
            const gameArr = res.data.gameArray.map((game: any) => game.pgn)
            const addGames = await axios.post(`/api/game/add/${session?.user?.id}`,
                { data: gameArr, provider: "lichess" }
            )
            console.log("Add Games: ", addGames)
        }

    }

    const handleSubmit = () => {

    }

    return (
        <S.GetLiChess>
            <h2>Enter your LiChess user name</h2>

            <button onClick={handleClick}>
                test api
            </button>
            <form id={"getLiChess"} onSubmit={handleSubmit}>
                <input type="text"
                       id="liChessId"
                       name="liChessId"
                       aria-label={"enter your li chess user name"}
                       required={true}
                       onChange={handleInput}
                />

                <FormBtn text={"Request Games"}
                         form={"getLiChess"}
                         onClick={handleSubmit}
                         aria-label={"request chess dot com games"}
                />
            </form>
        </S.GetLiChess>
    );
};

export default GetLiChess;