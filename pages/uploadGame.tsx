import React, { useState } from 'react';
import axios from "axios"


const UploadGame = () => {

    const [fileData, setFileData] = useState()
    const [success, setSuccess] = useState(false)
    const [gameData, setGameData] = useState({})

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

    const displayGame = () => {
        const gameObj: {[index: string]: any} = gameData
        return (
            <div>
                <h3>Your Game: </h3>
                <ul>
                    <li><strong>White: </strong> {gameObj["white"]}</li>
                    <li><strong>Black: </strong> {gameObj["black"]}</li>
                    <li><strong>Result: </strong> {gameObj["result"]}</li>
                    <li><strong>Termination: </strong> {gameObj["termination"]}</li>

                </ul>
                <h4>Moves: </h4>
                <ul className="moves">{gameObj["moves"].map((item: any) => <li>{item}</li>)}</ul>
            </div>
        )
    }

    return (
        <div>
            <h1>Upload a Chess Game</h1>

            <form onSubmit={handleSubmit}
            >
                <input type="file"
                       id="chessGame"
                       name="chessGame"
                       onChange={handleInputChange}
                />

                <button type="submit">
                    Upload Game
                </button>

            </form>

            <div>
                { success && displayGame()}
            </div>
        </div>
    )
}

export default UploadGame;