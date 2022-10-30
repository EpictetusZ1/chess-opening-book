import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../../lib/connect/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } = req.query as { id: string }
        const data = await prisma.game.findUniqueOrThrow({
            where: {
                id: id
            }
        })

        if (data) {
            res.status(200).json({ data, hasErrors: false })
        } else {
            res.status(404).json({ message: `No game found for id: ${id}`, hasErrors: true })
        }

    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }
}
