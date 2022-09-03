import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";


export default function(req: NextApiRequest, res: NextApiResponse) {
    const { userName } = req.query as { userName: string }

    if (req.method === "GET") {
        return handleGET(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        const chessComData = await axios.get(`https://api.chess.com/pub/player/${userName}/games/archives`)

        if (chessComData.data.archives.length > 0) {
            const lastMonth = chessComData.data.archives[chessComData.data.archives.length - 1]
            const year = lastMonth.slice(-7, -3)
            const month = lastMonth.slice(-2)
            const chessComDataMonthly = await axios.get(`https://api.chess.com/pub/player/${userName}/games/${year}/${month}`)
            res.status(200).json(chessComDataMonthly.data.games)
        } else {
            res.status(200).json({message: "No games found on chess.com", hasError: true})
        }
    }
}
