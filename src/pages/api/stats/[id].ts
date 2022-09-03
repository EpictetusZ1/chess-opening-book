import {prisma} from "../../../lib/connect/prisma";
import {NextApiRequest, NextApiResponse} from "next";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
        //TODO: Handle POST, the stats object should be kept in the userProfile, and if it hasn't been updated since the LENGTH of
        // the games array has changed, then update the stats object
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
            const bestWin = data.reduce((acc, curr) => {
                if (curr.gameMeta.winnerProfileId !== id) {
                    return Math.max(acc, curr.gameMeta.bElo || 0)
                } else {
                    return Math.max(acc, curr.gameMeta.wElo || 0)
                }
            }, 0)

            const peakRating = data.reduce((acc, curr) => {
                if (curr.gameMeta.winnerProfileId === id) {
                    return Math.max(acc, curr.gameMeta.bElo || 0)
                } else {
                    return Math.max(acc, curr.gameMeta.wElo || 0)
                }
            }, 0)
            const winDrawLoss = data.reduce((acc, curr) => {
                if (curr.gameMeta.winnerProfileId === id) {
                    return {
                        win: acc.win + 1,
                        draw: acc.draw,
                        loss: acc.loss
                    }
                } else if (curr.gameMeta.winnerProfileId === null) {
                    return {
                        win: acc.win,
                        draw: acc.draw,
                        loss: acc.loss + 1
                    }
                } else {
                    return {
                        win: acc.win,
                        draw: acc.draw + 1,
                        loss: acc.loss
                    }
                }
            }, { win: 0, draw: 0, loss: 0 })

            res.status(200).json({ bestWin, peakRating, WLD: winDrawLoss, hasErrors: false })
        } else {
            res.status(200).json({message: `No stats found for user profile with id: ${id}`, hasErrors: true})
        }
    }
}
