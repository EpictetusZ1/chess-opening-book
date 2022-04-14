import React from 'react';


const UploadGame = () => {
    return (
        <div>
            <h1>Upload a Chess Game</h1>
            <form action="/upload" method="post" encType="multipart/form-data">
                <input type="file" id="chessGame" name="chessGame"/>
                    <button type="submit">Upload Game</button>
            </form>
        </div>
    )
}

export default UploadGame;