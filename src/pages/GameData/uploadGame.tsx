import React, { useState } from 'react';
import axios from "axios"
import ShowGameData from "../../components/ShowGameData/ShowGameData";
import { IGame } from "../../types/Game.types";


const UploadGame = () => {

    const [fileData, setFileData] = useState()
    const [success, setSuccess] = useState(false)
    const [gameData, setGameData] = useState<IGame>()

    const handleInputChange = (event: any) => {
        setFileData(event.target.files[0])
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault()

        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }

        return await axios.post('/api/handleUpload/apiRoute', fileData, config)
            .then( (r) => {
                setGameData(r.data)
                setSuccess(true)
            })
            .catch((e) => {
                console.log(e)
            })
    }


    return (
        <div>
            <h1>Upload a Chess Game</h1>

            <form onSubmit={handleSubmit}>
                <input type="file"
                       id="chessGame"
                       name="chessGame"
                       required={true}
                       onChange={handleInputChange}
                />

                <button type="submit">
                    Upload Game
                </button>

            </form>

            { success && <ShowGameData gameData={gameData!} />}
        </div>
    )
}

export default UploadGame;