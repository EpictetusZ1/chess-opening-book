import React, {useState} from 'react';
import axios from "axios"
import ShowGameData from "../ShowGameData/ShowGameData";
import { IGame } from "../../types/Game.types";
import { NextComponentType } from "next";
import * as S from "./UploadGameForm.styles"
import { useSession } from "next-auth/react";
import CloseBtn from "../Inputs/CloseBtn/CloseBtn";

type TProps = {
    closeForm: () => void
}


const UploadGameForm = ({closeForm}: TProps) => {
    const { data: session, status } = useSession()
    const [fileData, setFileData] = useState()
    const [gameData, setGameData] = useState<IGame>()

    const handleInputChange = (event: any) => {
        setFileData(event.target.files[0])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        // @ts-ignore
        const gameObjRaw = await axios.post(`/api/game/add/${session.user.id}`, fileData, config)
        console.log("gameObjRaw", gameObjRaw)
        setGameData(gameObjRaw.data) // May need to pass the newly added game back into the dashboard component
        closeForm()
    }


    return (
        <S.UploadGameFormCont>
            <div className="modal-main">
                <CloseBtn ariaLabel={"close upload game form"}
                          onClick={closeForm}
                />
                <h1>Upload a Chess Game</h1>

                <S.UploadGameForm onSubmit={handleSubmit}>
                    <input type="file"
                           id="chessGame"
                           name="chessGame"
                           aria-label={"upload a chess game"}
                           required={true}
                           onChange={handleInputChange}
                    />
                    <button type="submit"
                            aria-label={"upload now"}
                    >
                        Upload Game
                    </button>
                </S.UploadGameForm>
            </div>
        </S.UploadGameFormCont>
    )
}

export default UploadGameForm;