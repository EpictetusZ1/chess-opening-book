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
        const length = reqData.sequence.length

        const data = await prisma.opening.findMany({
            where: {
                sequence: {
                    hasEvery: reqData.sequence
                }
            }
        })

        const getClosestMatch = (opening: any) => {
            let isMatch = true
            for (let i = 0; i < length; i++) {
                isMatch = opening.sequence[i] === reqData.sequence[i];
            }
            return isMatch
        }

        const closestMatch = data.find(getClosestMatch)

        if (closestMatch !== null) {

            res.status(200).json({ data: closestMatch })
        } else {
            res.status(200).json({ message: `No opening found with sequence: ${reqData.sequence}`, hasErrors: true })
        }
    }

}
