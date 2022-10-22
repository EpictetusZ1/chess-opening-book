import {NextApiRequest, NextApiResponse} from "next";
import { IUserProfile } from "../../../../types/Main.types";
import { prisma } from "../../../../lib/connect/prisma";

export default function(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query as {id: string}
    const provider = req.body.provider
    const isSetting = req.body.isSetting
    const userName = req.body.userName

    if (req.method === "POST") {
        return handlePOST(req, res, id, provider)
    } else if (req.method === "GET") {
        return handleGET(res, id, provider)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse, id: string, provider: string) {
        let data = await prisma.userProfile.findUnique({
            where: {
                userId: id
            }
        })

        if (isSetting) {
            let updatedData = await prisma.userProfile.update({
                where: {
                    userId: id
                },
                data: {
                    userNames: {
                        set: {
                            [`${provider}Confirmed`]: true,
                            [provider]: userName
                        }
                    }
                }
            })

            res.status(200).json({ message: "User profile updated", hasErrors: false })

        } else if (data) {
            // @ts-ignore
            if (data.userNames[provider]) {
                console.log("found username for provider")
                // @ts-ignore
                const userName = data.userNames[provider]
                console.log(userName)
                res.status(200).json({ userName })
            } else {
                res.status(200).json({ userName: null })
            }
        }
    }

    async function handleGET(res: NextApiResponse, id: string, provider: string) {

    }
}
