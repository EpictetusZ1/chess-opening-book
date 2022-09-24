import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/connect/prisma";
import { IGame } from "../../types/Game.types";
import { FormatQuery } from "../../utils/formatQuery";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const { startIndex, moveList, isFirstMove } = req.body
        const pipeline = FormatQuery.matrixPipeline(startIndex, moveList, isFirstMove)
        const result = await prisma.game.aggregateRaw({
            pipeline: pipeline
        })

        if (result) {
            res.status(200).json({result})
        } else {
            res.status(404).json({ message: `Error building Matrix with: ${moveList}. Try to shorten the moves being evaluated`, hasErrors: true })
        }
    }
}

