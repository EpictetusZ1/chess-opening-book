import type {NextApiRequest, NextApiResponse} from 'next'
import {handleFileUpload} from "./index";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const getGame = async () => {
        return await handleFileUpload(req.body)
    }

    return getGame()
        .then( (r) => {
        res.status(200).json(r)
    })
}