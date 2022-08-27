import {prisma} from "../../../lib/connect/prisma";
import {NextApiRequest, NextApiResponse} from "next";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const data = await prisma.game.findMany({
            where: {
                profileId: id
            },
            select: {
                gameMeta: true
            }
        })

        if (data !== null) {
            const highestElo = data.reduce((acc, curr) => {
                if (curr.gameMeta.winnerProfileId === id) {
                    return Math.max(acc, curr.gameMeta.bElo || 0)
                } else {
                    return Math.max(acc, curr.gameMeta.wElo || 0)
                }
            }, 0)
            res.status(200).json({ message: `The highest elo win was ${highestElo}`, hasErrors: false })
        }


        if (data === null) {
            res.status(200).json({ message: `No stats found for user profile with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({ message: "Stats found",  hasErrors: false })
        }
    }

}