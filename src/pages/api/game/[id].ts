import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../../lib/connect/prisma";
import {IGame} from "../../../types/Game.types";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    /**
     * @summary Get all games for a user
     * @const id - The id of the user
     */
    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const data = await prisma.game.findMany({
            where: {
                userId: id
            }
        })

        if (data === null) {
            res.status(200).json({ message: `No game found with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({ message: "Game found" , data, hasErrors: false })
        }
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const game = JSON.parse(req.body.data)

        const data = await prisma.game.create({
            data: {
                ...game
            }
        })

        res.status(200).json({ message: "Game successfully created",  data, hasErrors: false })
    }
}