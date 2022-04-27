import type {NextApiRequest, NextApiResponse} from 'next'
import {handleFileUpload} from "./parseGame";
import dbConnect from "../../../lib/dbConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const getGame = async () => {
        return  handleFileUpload(req.body)
    }

    await dbConnect().then(() => {
        console.log("connected to DB")
    })

    const response = await getGame()

    const uploadToMongo = async () => {
        for (let i = 0; i < response.length; i++) {
            // @ts-ignore
            await response[i].save( (err: any) => {
                if (err) console.log(err)
            })
        }
    }

    return getGame()
        .then( (r) => {
            uploadToMongo()
            res.status(200).json(r)
    })
}
