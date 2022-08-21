import {NextApiRequest, NextApiResponse} from "next";
import { prisma } from "../../../../lib/connect/prisma";
import {IGame} from "../../../../types/Game.types";
import {handleFileUpload} from "../../../../utils/parseGame";


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
            res.status(200).json({ message: `No games found for user profile with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({ message: "Games found" , data, hasErrors: false })
        }
    }

    // TODO: Implement the ability to add an array of games at once
    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const gameArr = handleFileUpload(req.body)

        const newGame = await prisma.game.create({
            data: {
                ...gameArr[0],
                userId: id
            }
        })

        if  (newGame !== null) {
            const updateUserProfile = await prisma.userProfile.update({
                where: {
                    userId: id
                }, data: {
                    games: {
                        push: newGame.id
                    }
                }
            })
            if (updateUserProfile !== null) {
                return res.status(200).json({ message: "Game saved", newGame, hasErrors: false })
            }
            res.status(200).json({ message: "The game object is defined", newGame, hasErrors: true })
        }
    }
}