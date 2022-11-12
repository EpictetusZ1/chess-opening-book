import * as S from "./GetChessCom.styles"
import React, { useEffect, useState} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import FormBtn from "../../Buttons/FormBtn/FormBtn";
import AddUserName from "../AddUserName/AddUserName";

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

    // Apparently this is needed to keep the gameArray as a bunch of strings.
    const mockDataFormatter = (games: string[]) => {
        let allGames = ""
        games.forEach(game => {
            allGames += game + "\n\n"
        })
        return allGames
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const chessComGames = await axios.get(`/api/chessCom/${userName}`)
        const gameArr = chessComGames.data
        const pgnArray = gameArr.map((game: { pgn: any; }) => game.pgn)
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
                <AddUserName provider={"chessCom"} userName={userName} setUserName={setUserName} proceed={() => setNeedsToAddUserName(false)} />
            ) : (
                <>
                    <h2>Request Games</h2>
                    <form id={"getChessCom"} onSubmit={handleSubmit}>
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
