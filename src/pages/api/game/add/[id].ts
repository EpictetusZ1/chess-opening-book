import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../../lib/connect/prisma";
import {IGame} from "../../../../types/Game.types";
import {handleFileUpload} from "../../../../utils/parseGame";
import {createMetaData} from "../../../../utils/createMetaData";
import axios from "axios";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
        let reqData = req.body
        // Checking if it is coming from a file or from an api like chessCom
        if (req.body.data) {
           reqData = req.body.data
        }
        const gameArr = handleFileUpload(reqData)
        if (gameArr.length > 0) {
            return handlePOST(req, res, gameArr)
        }
    } else {
        throw new Error(`The HTTP method ${req.method} is not supported at this route.`)
    }

    /**
     * @summary Get all games for a user
     * @const id - The id of the user
     */
    async function handleGET(req: NextApiRequest, res: NextApiResponse) {
        const { id } = req.query as { id: string }
        const data = await prisma.game.findMany({
            where: {
                profileId: id
            }
        })

        if (data === null || data === undefined) {
            res.status(200).json({ message: `No games found for user profile with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({ message: "Games found", data, hasErrors: false })
        }
    }

    async function handlePOST(req: NextApiRequest, res: NextApiResponse, gameArr: IGame[]) {
        const { id } = req.query as { id: string }

        const myGameMap = gameArr.map((game, index) => {
            // const opening = await axios.post(`${process.env.BASE_URL}/api/opening`,
            //     {
            //         startIndex: 0,
            //         moveList: game.moves
            //     })
            return {
                ...game,
                profileId: id,
                gameMeta: createMetaData(game, "EpictetusZ1", id),
                // opening: {
                //     openingId: opening.data.id,
                //     openingName: opening.data.name,
                // }
            }
        })

        const newGames = await prisma.game.createMany({
            data: myGameMap,
        })

        const targetUser = await prisma.userProfile.findUnique({
            where: {
                userId: id
            }
        })

        let tempIds = [...targetUser?.games || []]
        const gameIds = await prisma.game.findMany({
            where: {
                profileId: id
            },
            select: {
                id: true
            }
        })

        if (gameIds !== null) {
            const actualIds = gameIds.map(game => game.id)
            let existingIds = [...actualIds]
            tempIds.concat(existingIds)
        }

        const updatedProfile = await prisma.userProfile.update({
            where: {
                userId: id
            },
            data: {
                games: {
                    set: [...tempIds]
                }
            }
        })
        if (updatedProfile !== null) {
            return res.status(200).json({ message: "Game saved to user profile", hasErrors: false })
        }
        res.status(200).json({ message: "There was a problem adding the games to the user profile", hasErrors: true })
    }
}
