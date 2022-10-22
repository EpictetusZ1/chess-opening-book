import * as S from "./GetChessCom.styles"
import React, {ReactEventHandler, useEffect, useState} from "react";
import axios from "axios";
import {fakeData} from "./fakeData";
import {handleFileUpload} from "../../../../utils/parseGame";
import {useSession} from "next-auth/react";
import FormBtn from "../../Buttons/FormBtn/FormBtn";
import AddUserName from "../AddUserName";

type TGetChessCom = {
    closeModal: () => void
}

const GetChessCom = ({closeModal}: TGetChessCom) => {
    const { data: session, status } = useSession()
    const [needsToAddUserName, setNeedsToAddUserName] = useState<boolean>(true)
    const [userName, setUserName] = useState("")

    const handleFindUserName = async () => {
        const findUserName = await axios.post(`/api/userProfile/userName/${session?.user?.id}`,
            { provider: "chessCom" }
        )
        const userName = findUserName.data.userName
        if (userName) {
            setUserName(userName)
            setNeedsToAddUserName(false)
        }
    }

    useEffect(() => {
        handleFindUserName()

    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== "") {
            setUserName(e.target.value)
        }
    }

    const mockDataFormatter = (games: string[]) => {
        let allGames = ""
        games.forEach(game => {
            allGames += game + "\n\n"
        })
        return allGames
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // const res = await axios.get(`/api/chessCom/${username}`)

        // This is a mock response
        const gameArr = fakeData.games
        const pgnArray = gameArr.map(game => game.pgn)
        const gameStr = mockDataFormatter(pgnArray)

        const res = await axios.post(`/api/game/add/${session?.user?.id}`,
            { data: gameStr, provider: "chessCom" }
        )

        closeModal()
        // const addChessComUserName = await axios.patch(`/api/userProfile/${session?.user?.id}`, { userNames: { chessCom: username }})
    }

    return (
        <S.GetChessCom>
            { needsToAddUserName ? (
                <AddUserName provider={"chessCom"} userName={userName} proceed={() => setNeedsToAddUserName(false)} />
            ) : (
                <>
                    <h2>Enter your chess.com user name</h2>
                    <form id={"getChessCom"} onSubmit={handleSubmit}>
                        <input type="text"
                               id="chessComId"
                               name="chessComId"
                               aria-label={"enter your chess dot com user name"}
                               required={true}
                               onChange={handleInput}
                        />

                        <FormBtn text={"Request Games"}
                                 form={"getChessCom"}
                                 onClick={handleSubmit}
                                 aria-label={"request chess dot com games"}
                        />
                    </form>
                </>
            )}
        </S.GetChessCom>
    )
};

export default GetChessCom;