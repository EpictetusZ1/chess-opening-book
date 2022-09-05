import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";
import {prisma} from "../../../lib/connect/prisma";


export default function(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const reqData = req.body

        const data = await prisma.opening.findFirst({
            where: {
                sequence: {
                    equals: reqData.sequence
                }
            }
        })

        if (data !== null) {
            res.status(200).json({ data })
        } else {
            res.status(200).json({ message: `No opening found with sequence: ${reqData.sequence}`, hasErrors: true })
        }
    }

}
