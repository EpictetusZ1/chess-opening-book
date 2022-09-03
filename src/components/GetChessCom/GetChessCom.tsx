import * as S from "./GetChessCom.styles"
import React, {ReactEventHandler, useState} from "react";
import axios from "axios";
import {fakeData} from "./fakeData";
import {handleFileUpload} from "../../utils/parseGame";
import {useSession} from "next-auth/react";

const GetChessCom = () => {
    const { data: session, status } = useSession()
    const [username, setUsername] = useState("")
    console.log("session", session)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setUsername(e.target.value)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const res = await axios.get(`/api/chessCom/${username}`)
        const gameArr = fakeData.games
        const res = await axios.post(`/api/game/add/${session?.user?.id}`,
            { data: gameArr[0].pgn, provider: "chessCom" }
        )
    }

    return (
        <S.GetChessCom>
            <form onSubmit={handleSubmit}>
                <input type="text"
                       id="chessComId"
                       name="chessComId"
                       aria-label={"enter your chess dot com user name"}
                       required={true}
                       onChange={handleInput}
                />

                <button type="submit"
                        aria-label={"Request chess dot com games"}
                >
                    Request Games
                </button>
            </form>
        </S.GetChessCom>
    )
};

export default GetChessCom;