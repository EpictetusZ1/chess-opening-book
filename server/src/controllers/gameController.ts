import {Request, Response, NextFunction} from "express";
import {Game} from "../models/game";

export const getGame = (req: Request, res: Response, next: NextFunction) => {
    Game.find()
        .exec((err, gameData) => {
            if (err) return next(err)
            res.send(gameData)
        })
}