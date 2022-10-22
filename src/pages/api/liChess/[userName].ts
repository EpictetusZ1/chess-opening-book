import {NextApiRequest, NextApiResponse} from "next";


export default function(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        return handleGET(req, res)
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        // TODO: Add in form for time control, game number limit, etc.
        const { userName } = req.query as { userName: string }
        const response = await fetch(`https://lichess.org/api/games/user/${userName}?max=5&pgnInJson=true&perfType=blitz`,
            { headers: { Accept: 'application/x-ndjson'}})

        const splitStream = (splitOn: string) => {
            let buffer = ""
            return new TransformStream({
                transform(chunk, controller) {
                    buffer += chunk
                    const parts = buffer.split(splitOn)
                    parts.slice(0, -1).forEach(part => controller.enqueue(part))
                    buffer = parts[parts.length - 1]
                },
                flush(controller) {
                    if (buffer) controller.enqueue(buffer)
                }
            })
        }

        const parseJSON = () => {
            return new TransformStream({
                transform(chunk, controller) {
                    controller.enqueue(JSON.parse(chunk))
                }
            })
        }

        const results = response.body!
            // // From bytes to text
            .pipeThrough(new TextDecoderStream())
            // Buffer until newlines
            .pipeThrough(splitStream("\n"))
            // Parse chunks as JSON
            .pipeThrough(parseJSON())

        const gameArray: any = []
        let streamOver = false

        const myPromise = new Promise((resolve, reject) => {
            // Loop through the results and add to array
            const writer = (reader: ReadableStreamDefaultReader) => {
                reader.read()
                    .then(({value, done}: any) => {
                        if (done) {
                            streamOver = true
                            resolve(gameArray)
                        } else {
                            gameArray.push(value)
                            writer(reader)
                        }
                    })
                    .catch((err: any) => {
                        console.error("Error reading stream:", err)
                        reject(err)
                    })
            }
            writer(results.getReader())
        })

        const result = await myPromise

        if (result) {
            // TODO: Send this to create game


            res.status(200).json({gameArray})
        } else {
            res.status(200).json({ message: "No data found" })
        }
    }
}
