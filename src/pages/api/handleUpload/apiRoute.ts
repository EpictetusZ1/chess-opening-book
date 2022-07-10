import type {NextApiRequest, NextApiResponse} from 'next'
import {handleFileUpload} from "../../../utils/parseGame";
import dbConnect from "../../../lib/dbConnect";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const getGame = async () => {
        return handleFileUpload(req.body)
    }

    await dbConnect().then(() => {
        console.log("connected to DB")
    })

    const response = await getGame().then((data) => {
        // console.log("data from response: ", data)
    })

    const uploadToMongo = async () => {
       /* for (let i = 0; i < response.length; i++) {
            // @ts-ignore
            await response[i].save( (err: Error) => {
                if (err) console.log(err)
                console.log("Saved to DB")
            })
        }*/
    }

    return getGame()
        .then( (r) => {
            // uploadToMongo()
            res.status(200).json(r)
    })
}
