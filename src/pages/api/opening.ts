import { Opening } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../lib/connect/prisma";
import {FormatQuery} from "../../utils/formatQuery";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const {startIndex, moveList} = req.body
        const limit = (moveList.length > 28) ? 28 : moveList.length

        const testForExact = async (moveListClone: any[]) => {
            const testForCompleteMatch = await prisma.opening.findFirstOrThrow({
                where: {
                    sequence: {
                        equals: moveListClone
                    }
                }
            })
            if (testForCompleteMatch) {
                return testForCompleteMatch
            }
        }

        const getResult = async () => {
            for (let i = limit; i > 0; i--) {
                const clone = [...moveList]
                const clone2 = clone.splice(0, i)
                const query = FormatQuery.openingByMoves(startIndex, clone2)
                const result = await prisma.opening.findRaw({
                    filter: {
                        $and: query
                    },
                    options: { projection: {_id: false} }
                })
                if (result !== undefined && result !== null && result.length !== 0) {
                    const isMatch = await testForExact(clone2)
                    if (isMatch) {
                     return isMatch
                    }
                }
            }
        }

        const data = await getResult()

        if (data) {
            res.status(200).json({data})
        } else {
            res.status(404).json({ message: `No opening found with sequence: ${moveList}`, hasErrors: true })
        }
    }
}
