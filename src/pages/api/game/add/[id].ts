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
        // Update where data is coming from base on where game is being added from
        switch (reqData.provider) {
            default:
                const gameArr = handleFileUpload(reqData)
                if (gameArr.length > 0) {
                    return handlePOST(req, res, gameArr)
                }
                return
            case "lichess":
                const gameArrLiChess = handleFileUpload(reqData.data[0])
                return handlePOST(req, res, gameArrLiChess)
            case "chessCom":
                const gameArrChessCom = handleFileUpload(reqData.data)
                return handlePOST(req, res, gameArrChessCom)
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

        const myGameMap = gameArr.map(async (game, index) => {
            // Unsure of the time complexity of this, there is probably a more efficient way to doing it
            // I should probably pass the entire gameArr to the function and then do the logic there, then zip it back together
            const opening = await axios.post(`${process.env.BASE_URL}/api/opening`,
                {
                    moveList: game.moves,
                    multiGame: true
                })

            return {
                ...game,
                profileId: id,
                gameMeta: createMetaData(game, "EpictetusZ1", id),
                opening: {
                    id: opening.data.data.id,
                    openingECO: opening.data.data.eco,
                    openingName: opening.data.data.name,
                }
            }
        })

        const resolveAllGames = await Promise.all(myGameMap)

        const newGames = await prisma.game.createMany({
            data: resolveAllGames,
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
