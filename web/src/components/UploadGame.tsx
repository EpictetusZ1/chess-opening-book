import React, {FormEvent, useState} from 'react';
import axios from "axios";


const UploadGame = () => {

    const [fileData, setFileData] = useState()
    const [succcess, setSuccess] = useState(false)
    const [gameData, setGameData] = useState({})

    const handleInputChange = (event: any) => {
        setFileData(event.target.files[0])
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        let fd = new FormData();
        fd.append('chessGame', fileData!);
        axios({
            method: 'post',
            url: '/game-db/upload',
            data: fd,
        })
            .then( (response) => {
                setSuccess(true)
                return setGameData(response.data)
            })
            .catch( (e) => {
                console.error(e)
            })
    }

    const displayGame = () => {
        const gameObj: {[index: string]: any} = gameData

        return (
            <ul>
                <li>White: {gameObj["white"]}</li>
                <li>Black: {gameObj["black"]}</li>
                <li>Result: {gameObj["result"]}</li>
                <p>Moves: </p>
                <span>{gameObj["moves"].map((item: any) => <p>{item}</p>)}</span>
            </ul>
        )
    }

    return (
        <div>
            <h1>Upload a Chess Game</h1>
            <h2>Hello from UploadGame.tsx</h2>

            <form encType="multipart/form-data"
                  onSubmit={handleSubmit}
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

            <h2>Your Game: </h2>
            <div>
                { succcess && displayGame()}
            </div>
        </div>
    )
}

export default UploadGame;