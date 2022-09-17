import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/connect/prisma";
import {IGame} from "../../../types/Game.types";
import {formatQuery} from "../../../utils/formatQuery";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const { startIndex, moveList } = req.body

        const getResult = async () => {
            const testForCompleteMatch = await prisma.game.findFirst({
                where: {
                    moves: {
                        equals: moveList
                    }
                }
            })
            if (testForCompleteMatch) {
                return testForCompleteMatch
            } else {
                for (let i = moveList.length; i >= 0; i--) {
                    const query = formatQuery.gameByMoves(startIndex, moveList.splice(0, i))
                    const result = await prisma.game.findRaw({
                        filter: {
                            $and: query
                        },
                        options: { projection: { _id: false } },
                    })
                    if (result) {
                        return result
                    }
                }
            }
        }

        const result = await getResult()
        if (result) {
            res.status(200).json({result})
        } else {
            res.status(404).json({ message: `No opening found with sequence: ${moveList}`, hasErrors: true })
        }
    }
}
