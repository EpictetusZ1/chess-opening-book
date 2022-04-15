import {Request, Response, NextFunction} from "express";
import {Game} from "../models/game";
import {handleFileUpload} from "./handleGameUpload";

export const getGame = (req: Request, res: Response, next: NextFunction) => {
    Game.find()
        .exec((err, gameData) => {
            if (err) return next(err)
            res.send(gameData)
        })
}

export const addGame = async (req: Request, res: Response, next: NextFunction) => {
    const data = String(req?.file?.buffer)

    const addToDb = async() => {
        const target = await handleFileUpload(data)

        // target.save( function (err) {
        //     if (err) return next(err)
        //     return res.redirect(target.url)
        // })
        return target
    }

    const finalFormat = await addToDb()

    res.send(finalFormat)
}