import type {NextApiRequest, NextApiResponse} from 'next'
import dbConnect from "../../../lib/dbConnect";
import {Game} from "../../../lib/models/game";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // await dbConnect().then(() => {
    //     console.log("connected to DB")
    // })


    // const kittens = Game.find();
    //@ts-ignore
    // kittens.projection("moves")
    // await kittens.exec()

    res.status(200).json("Hello from handleMatrix")
    // return
    //     .then( (r) => {
    //         res.status(200).json(r)
    //     })
}