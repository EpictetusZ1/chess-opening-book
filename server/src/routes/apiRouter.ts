import express, { Request, Response, NextFunction} from "express";
import multer from "multer";
import {addGame, getGame} from "../controllers/gameController";


const router = express.Router()
const upload = multer({ storage: multer.memoryStorage() })

// ROOT OF API ENDPOINT //
export const apiRoute = router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("This is the ***/game-db/*** endpoint")
})

// Handle parse file
router.get("/upload", (req: Request, res: Response, next: NextFunction) => {
    res.sendFile("/Users/jackheaton/Documents/code_projects/chess-opening-book/server/mockUploadPage.html")
})

// Handle file upload
router.post("/upload", upload.single("chessGame"), addGame)

// Handle get game by user
router.get("/getGame", getGame)
