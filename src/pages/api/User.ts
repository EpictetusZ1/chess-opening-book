import {IUser} from "../../types/Main.types";
import { PrismaClient } from "@prisma/client"
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient()

export default async function getUserById(req: NextApiRequest, res: NextApiResponse) {
    const data = await prisma.user.findUnique({
        where: {
            id: "62effbc443f79c79d7f2c615"
        }
    })
    return res.status(200).json(data)
}

// CREATE
// export const createUser = async (data: IUser) => {
//     return await prisma.user.create({
//         data: {
//             email: data.email,
//             userName: data.userName,
//             password: data.password,
//             games: data.games,
//             stats: data.stats,
//             ratings: data.ratings
//         }
//     })
// }
