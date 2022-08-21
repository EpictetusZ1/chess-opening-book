import {NextApiRequest, NextApiResponse} from "next";
import { IUserProfile } from "../../../types/Main.types";
import { prisma } from "../../../lib/connect/prisma";


const formatUserProfile = (body: NextApiRequest["body"]): IUserProfile => {
    if (body) {
        return {
            userId: body.userId,
            email: body.email,
            games: body.games,
            stats: body.stats,
            ratings: body.ratings
        }
    } else {
        throw new Error(`The body of the request is not valid.`)
    }
}


export default function(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
        return handlePOST(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const data = await prisma.userProfile.findUnique({
            where: {
                userId: id
            }
        })

        if (data === null) {
            res.status(200).json({ message: `No userProfile found with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({ message: "userProfile already exists" , data, hasErrors: false })
        }
    }


    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const { body } = req
        const userProfile = formatUserProfile(body)

        const findUserProfile = await prisma.userProfile.findUnique({
            where: {
                userId: req.body.userId
            }
        })
        
        if (findUserProfile === null) {
            const newUserProfile = await prisma.userProfile.create({
                data: {
                    ...userProfile
                }
            })
            return res.status(200).json({ message: "UserProfile successfully created", newUserProfile, hasErrors: false })
        }

        res.status(200).json({ message: "UserProfile already exists", findUserProfile, hasErrors: false })

    }
}

