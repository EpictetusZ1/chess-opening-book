import { PrismaClient } from "@prisma/client"
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient()

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case "GET":
            const { id } = req.query as { id: string }
            const data1 = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })

            return res.status(200).json(data1)
        // case "POST":
        //     return await prisma.user.create({
        //         data: {
        //             email: data.email,
        //             games: data.games,
        //             stats: data.stats,
        //             ratings: data.ratings
        //         }
        //     })
        default:
            res.status(405).end("Method Not Allowed")
            break

    }

}
