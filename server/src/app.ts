import "dotenv/config"
import express, { Application, Request, Response, NextFunction} from "express";
import multer from "multer";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query, Arg, ObjectType, Field, ID } from "type-graphql";
import { uploadGameResolver } from "./graphql/resolvers/game.resolver";
import { handleFileUpload } from "./graphql/resolvers/gameController";


const main = async () => {

    const upload = multer({ storage: multer.memoryStorage() })

    const schema = await buildSchema({
        resolvers: [uploadGameResolver]
    })

    const server = new ApolloServer({ schema})
    const app = express()

    app.get("/", (req: Request, res: Response) => {
        res.send("Hello World!")
    })


    app.get("/upload", (req: Request, res: Response, next: NextFunction) => {
        res.sendFile("/Users/jackheaton/Documents/code_projects/chess-opening-book/server/index.html")
    })

    app.post("/upload", upload.single("chessGame"), handleFileUpload)

    await server.start()

    server.applyMiddleware({ app })

    app.listen(3000, () => {
        console.log("Server started on:  http://localhost:3000/graphql")
    })
}

main()
