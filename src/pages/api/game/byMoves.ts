import {NextApiRequest, NextApiResponse} from "next";
import { formatQuery } from "../../../utils/formatQuery";
import { prisma } from "../../../lib/connect/prisma";


export default function (req: NextApiRequest, res: NextApiResponse) {

   if (req.method === "POST") {
       return handlePOST(req, res)

   } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const { startIndex, moveList } = req.body

        const query = formatQuery.byMoves(startIndex, moveList)
        const result = await prisma.game.findRaw({
            filter: {
                $and: query
            },
            options: { projection: { _id: false } },
        })

        if (result) {
            return res.status(200).json({result})
        }
        res.status(200).json({ message: "No matching game found", hasErrors: false })

    }
}
