import {NextApiRequest, NextApiResponse} from "next";

export const applyTypePOST = <T, D>(req: NextApiRequest, type: T): { data: D } => {
    const data = req.body as D
    const myType = type as T

    return {
        data
    }
}


