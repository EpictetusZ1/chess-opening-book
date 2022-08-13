import {NextApiRequest, NextApiResponse} from "next";
import { PrismaClient } from "@prisma/client"
import {IGame} from "../../types/Game.types";


const prisma = new PrismaClient()

export default async function addGame(req: NextApiRequest, res: NextApiResponse) {
    const game = JSON.parse(req.body.data)
    // TODO: Need to incorporate the relationship between the user and the game
    // TODO: Fix camel casing of elo, time control, and "round -> int not string" in the game object (parser)

    const data = prisma.game.create({
        data: {
            ...game
        }
    }).then( (r) => {
        console.log(r)
    })
    console.log(data)

    return res.status(200).json("game added")
}