import "dotenv/config"
import express, { Application, Request, Response, NextFunction} from "express";
import mongoose from "mongoose";
import {apiRoute} from "./routes/apiRouter";
import path from "path";


const main = async () => {

    const mongoDB = `mongodb+srv://${process.env.MONGO_CLIENT_USER}:${process.env.MONGO_CLIENT_PASS}@cluster0.s0mtx.mongodb.net/${process.env.MONGO_CLIENT_DB}?retryWrites=true&w=majority`

    await mongoose.connect(mongoDB).catch(error => console.log(error))
    mongoose.connection.on("error", console.error.bind(console, "MongoDB connection error:"))

    const app: Application = express()

    app.get("/", (req: Request, res: Response) => {
       res.sendFile(path.join(__dirname, '../web/public', 'index.html'))
    })

    app.use("/game-db", apiRoute)

    app.listen(3001, () => {
        console.log("Server started on: http://localhost:3000/")
    })
}

main()
