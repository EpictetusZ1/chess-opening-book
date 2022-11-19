import React, {useState} from 'react';
import axios from "axios"
import ShowGameData from "../../../ShowGameData/ShowGameData";
import { IGame } from "../../../../types/Game.types";
import * as S from "./UploadGameForm.styles"
import { useSession } from "next-auth/react";

type TUplodGameFormProps = {
    closeModal: () => void
}

const UploadGameForm = ({closeModal}: TUplodGameFormProps) => {
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

        const res = await axios.post(`/api/game/add/${session?.user?.id}`, fileData, config)
        // May need to pass the newly added game back into the dashboard component
        // setGameData(res.data)
        closeModal()
    }


    return (
        <>
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
        </>
    )
}

export default UploadGameForm;