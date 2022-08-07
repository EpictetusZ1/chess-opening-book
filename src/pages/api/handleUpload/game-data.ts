import type {NextApiRequest, NextApiResponse} from 'next'
import {handleFileUpload} from "../../../utils/parseGame";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const getGame = async () => {
        return handleFileUpload(req.body)
    }

    const uploadToMongo = async (r: any) => {
        const game = r

        const user = await prisma.user.findUnique({
            where: {
                id: "62effbc443f79c79d7f2c615"
            },
        })
        if (user) {
            user.games.push(JSON.stringify(game))

            const updatedUser = await prisma.user.update({
                where: {
                    id: "62effbc443f79c79d7f2c615"
                },
                data: {
                    games: user.games
                }
            })
        }
    }
//     { _id: ObjectId("60e8792d4655cbf49ff7cb89") },
//     { $set: { grade_level: 3 } }
// )
//

    return getGame()
        .then( (r) => {
            uploadToMongo(r)
            res.status(200).json(r)
        })
}

