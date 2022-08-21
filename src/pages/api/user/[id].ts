import { prisma } from "../../../lib/connect/prisma";
import {NextApiRequest, NextApiResponse} from "next";


export default function(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string }

    if (req.method === "GET") {
         return handleGET(id, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handleGET(id: string, res: NextApiResponse) {
        let data = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        if (data === null) {
             res.status(200).json({ message: "No user found with that id", hasErrors: true})
        } else {
             res.status(200).json(data)
        }
    }
}
