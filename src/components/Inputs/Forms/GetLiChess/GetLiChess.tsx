import * as S from "./GetLiChess.styles";
import FormBtn from "../../Buttons/FormBtn/FormBtn";
import React, {useEffect} from "react";
import axios from "axios";
import {useSession} from "next-auth/react";
import { useState } from "react";
import AddUserName from "../AddUserName";

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
        console.log("findUserName: ", findUserName)

        if (userName) {
            console.log("userName found", userName)
            setUserName(userName)
            setNeedsToAddUserName(false)
        }
    }

    // TODO: Put this in getServerSideProps after
    useEffect(() => {
        console.log("running find userName")
        console.log("userName")
        handleFindUserName()

    }, [])


    const handleInput = () => {

    }

    const handleClick = async () => {
        const res = await axios.get(`/api/liChess/${testUserName}`)
        console.log("RES")
        console.log(res.data)

        if (res) {
            const gameArr = res.data.gameArray.map((game: any) => game.pgn)
            const addGames = await axios.post(`/api/game/add/${session?.user?.id}`,
                { data: gameArr, provider: "liChess" }
            )
        }

    }

    const handleSubmit = () => {

    }


    return (
        <S.GetLiChess>
            { needsToAddUserName ? (
                <AddUserName provider={"liChess"} userName={userName} proceed={() => setNeedsToAddUserName(false)} />
            ) : (
                <>
                    <h2>Request games</h2>
                    <button onClick={handleClick}>
                        test api
                    </button>
                    <form id={"getLiChess"} onSubmit={handleSubmit}>

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