import type {NextApiRequest, NextApiResponse} from 'next'
import {handleFileUpload} from "./parseGame";
import dbConnect from "../../../lib/dbConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const getGame = async () => {
        return await handleFileUpload(req.body)
    }

    await dbConnect().then(() => {
        console.log("connected to DB")
    })

    const response = await getGame()

    await response.save( (err: any) => {
        console.log("Saving game to MongoDB now. ")
        if (err) {
            console.log(err)
        }
    })

    return getGame()
        .then( (r) => {
            console.log("---------------------")
            console.log("No errors Found.")
            res.status(200).json(r)
    })
}