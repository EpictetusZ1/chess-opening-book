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
        const chessComData = await axios.get(`https://lichess.org/api/games/user/${userName}?max=5&prefType=blitz`,
            {
                headers: {
                    Accept: 'application/x-ndjson'
                }
            })
        const getStuff = () => {
            fetch(`https://lichess.org/api/games/user/${userName}?max=5&prefType=chess960`).then(async (res) => {
                // @ts-ignore
                const reader = res.body.getReader();
                while(true) {
                    const {done, value} = await reader.read();
                    if (done) {
                        console.log("DONE")
                        return

                    }
                    console.log(value);
                    let decoded = new TextDecoder().decode(value);
                    console.log("decoded", decoded)
                    console.log("-----------------")
                }
            })
        }

        await getStuff()



        // console.log("chessComData", chessComData)
        if (chessComData) {
            res.status(200).json(chessComData.data)
        } else {
            res.status(200).json({ message: "No data found" })
        }

    }
    }
