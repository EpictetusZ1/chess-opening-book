import type {NextApiRequest, NextApiResponse} from 'next'
import {handleFileUpload} from "../../../utils/parseGame";
import { prisma } from "../../../lib/connect/prisma";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const getGame = async () => {
        return handleFileUpload(req.body)
    }

    const uploadToMongo = async (res: any) => {
        const game = res

        const user = await prisma.userProfile.findUnique({
            where: {
                id: "62effbc443f79c79d7f2c615"
            },
        })
        if (user) {
            user.games.push(JSON.stringify(game))

            const updatedUser = await prisma.userProfile.update({
                where: {
                    id: "62effbc443f79c79d7f2c615"
                },
                data: {
                    games: user.games
                }
            })
        }
    }

    return getGame()
        .then( (r) => {
            uploadToMongo(r)
            res.status(200).json(r)
        })
}

