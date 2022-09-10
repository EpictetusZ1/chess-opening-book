import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../lib/connect/prisma";


export default function(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const reqData = req.body
        const sequence = reqData.sequence
        const length = reqData.sequence.length

        const data = await prisma.opening.findMany({
            where: {
                sequence: {
                    hasEvery: sequence
                }
            }
        })

        const analyzer = (prev: any, currMove: any, currIndex: number) => {
            if (currMove === sequence[currIndex]) {
                return prev + 1
            } else {
                return prev
            }
        }

        const result = data.map((opening: any) => {
            const matches = opening.sequence.reduce(analyzer, 0)
            return {opening, matches}
        })

        const bestMatch = result.reduce((prev: any, curr: any) => {
            if (curr.matches > prev.matches) {
                return curr
            } else {
                return prev
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
