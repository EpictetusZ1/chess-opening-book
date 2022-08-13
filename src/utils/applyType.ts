import {NextApiRequest, NextApiResponse} from "next";
import {ExtendedNextApiRequest, IUserApi} from "../types/Api.types";

export const applyTypePOST = <T, D>(req: NextApiRequest, type: T): { data: D } => {
    const data = req.body as D
    const myType = type as T

    return {
        data
    }
}


