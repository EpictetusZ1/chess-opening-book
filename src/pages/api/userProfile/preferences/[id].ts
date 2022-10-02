import {NextApiRequest, NextApiResponse} from "next";
import { IUserProfile } from "../../../../types/Main.types";
import { prisma } from "../../../../lib/connect/prisma";

export default function(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === "POST") {
        return handlePOST(req, res)
    } else if (req.method === "GET") {
        return handleGET(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }


    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const { preferences } = req.body as { preferences: IUserProfile["a11yPrefs"] }

        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: id
            }
        })

        if (userProfile === null) {
            res.status(200).json({ message: `No userProfile found with id: ${id}`, hasErrors: true })
        } else {
            const updatedUserProfile = await prisma.userProfile.update({
                where: {
                    userId: id
                },
                data: {
                    a11yPrefs: preferences
                }
            })
            if (updatedUserProfile) {
                res.status(200).json({ message: "A11y preferences successfully updated.", hasErrors: false })
            } else {
                res.status(200).json({ message: "A11y preferences could not be updated.", hasErrors: true })
            }
        }
    }

    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const userProfile = await prisma.userProfile.findUnique({
            where: {
                userId: id
            },
            select: {
                a11yPrefs: true
            }
        })
        if (userProfile === null) {
            res.status(200).json({ message: `No userProfile found with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({data: userProfile.a11yPrefs, hasErrors: false })
        }
    }
}

