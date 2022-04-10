import "dotenv/config"
import express, { Application, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import multer, {Multer} from "multer";
import handler from "./api/graphql";
const pgn = require("./utils/gameController")


const upload: Multer  = multer({ dest: "uploads/" })

const app: Application = express()


app.get("/", (req: Request, res: Response) => {
    console.log("hello world")
    res.send("Hello World!")
})

app.get("/upload", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile("/Users/jackheaton/Documents/code_projects/chess-opening-book/server/index.html")
})

app.post("/upload", upload.single("chessGame"), pgn.handleFileUpload)



app.listen(3000, () => console.log("Server listening"))
