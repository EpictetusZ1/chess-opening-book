import * as S from "./GetLiChess.styles";
import FormBtn from "../../Buttons/FormBtn/FormBtn";
import React, {useEffect} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import { useState } from "react";
import AddUserName from "../AddUserName/AddUserName";

type TGetLiChess = {
    closeModal: () => void
}

const GetLiChess = ({closeModal}: TGetLiChess) => {
    const { data: session, status } = useSession()
    const [userName, setUserName] = useState<string>('')
    const [needsToAddUserName, setNeedsToAddUserName] = useState<boolean>(true)
    const testUserName = "EpictetusZ1"

    const handleFindUserName = async () => {
        const findUserName = await axios.post(`/api/userProfile/userName/${session?.user?.id}`,
            { provider: "liChess" }
        )
        const userName = findUserName.data.userName

        if (userName) {
            setUserName(userName)
            setNeedsToAddUserName(false)
        }
    }

    // TODO: Put this in getServerSideProps after
    useEffect(() => {
        handleFindUserName()

    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const res = await axios.get(`/api/liChess/${testUserName}`)
        if (res) {
            const gameArr = res.data.gameArray.map((game: any) => (game.pgn))
            let gameString = gameArr.join(" ")
            const addGames = await axios.post(`/api/game/add/${session?.user?.id}`,
                { data: gameString, provider: "liChess" }
            )
        }
    }

    return (
        <S.GetLiChess>
            { needsToAddUserName ? (
                <AddUserName provider={"liChess"} userName={userName} proceed={() => setNeedsToAddUserName(false)} />
            ) : (
                <>
                    <h2>Request games</h2>
                    <form id={"getLiChess"} onSubmit={handleSubmit}>
                        {/* TODO: Later add request config options for user */}
                        <FormBtn text={"Request Games"}
                                 form={"getLiChess"}
                                 onClick={handleSubmit}
                                 aria-label={"request li chess games"}
                        />
                    </form>
                </>
            )}
        </S.GetLiChess>
    );
};

export default GetLiChess;