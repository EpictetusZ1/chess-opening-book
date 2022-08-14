import { prisma } from "../../../lib/connect/prisma";
import {NextApiRequest, NextApiResponse} from "next";
import {IRatings, IStats, IUser} from "../../../types/Main.types";


export default async(req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query as { id: string }
    console.log("REQUEST METHOD")
    console.log(req.method)

    switch (req.method) {
        case "POST":
            const { email, gitHubId } = req.body as { email: string, gitHubId: string }
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    gitHubId: gitHubId,
                    games: [],
                    stats: {},
                    ratings: {}
                }
            })

            return res.status(200).json(newUser)
        case "GET":
            let data = await prisma.user.findUnique({
                where: {
                    gitHubId: id
                }
            })
            const idk = await data

            if (idk === null) {
                console.log("THERE IS NO FUCKING USER")
                const noUser = {
                    message: "No user found with that id",
                    hasErrors: true
                }
                return res.status(200).json(noUser)
            } else {
                console.log("THERE IS aUSER")
                return res.status(200).json(data)
            }


        default:
            break
    }
}
