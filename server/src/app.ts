import "dotenv/config"
import express, { Application, Request, Response, NextFunction} from "express";
import multer from "multer";
import { handleFileUpload } from "./controllers/handleGameUpload";
import mongoose from "mongoose";
import {getGame} from "./controllers/gameController";


const main = async () => {

    const mongoDB = `mongodb+srv://${process.env.MONGO_CLIENT_USER}:${process.env.MONGO_CLIENT_PASS}@cluster0.s0mtx.mongodb.net/${process.env.MONGO_CLIENT_DB}?retryWrites=true&w=majority`

    await mongoose.connect(mongoDB).catch(error => console.log(error))
    mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"))

    const app: Application = express()

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!")
    })

    app.get("/gameOne", getGame)

    app.get("/upload", (req: Request, res: Response, next: NextFunction) => {
        res.sendFile("/Users/jackheaton/Documents/code_projects/chess-opening-book/server/index.html")
    })

    const upload = multer({ storage: multer.memoryStorage() })

    // Perhaps I should use upload.none()???
    app.post("/upload", upload.single("chessGame"), handleFileUpload)


    app.listen(3000, () => {
        console.log("Server started on: http://localhost:3000/")
    })
}

main()
