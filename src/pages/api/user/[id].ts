import { prisma } from "../../../lib/connect/prisma";
import {NextApiRequest, NextApiResponse} from "next";


export default function(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as { id: string }

    if (req.method === "GET") {
         return handleGET(id, res)
    } else if (req.method === "POST") {
         return handlePOST(id, res)
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

    async function handlePOST(id: string, res: NextApiResponse) {
        // TODO: Add logic to create a model of UserProfile if no record exists
        const { email } = req.body as { email: string }
        const newUser = await prisma.userProfile.create({
            data: {
                email: email,
                games: [],
                stats: {},
                ratings: {}
            }
        })

         res.status(200).json(newUser)
    }
}
