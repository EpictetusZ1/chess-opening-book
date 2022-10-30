import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../../lib/connect/prisma";
import {IGame} from "../../../../types/Game.types";
import {handleFileUpload} from "../../../../utils/parseGame";
import {createMetaData} from "../../../../utils/createMetaData";
import {FormatQuery} from "../../../../utils/formatQuery";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
        let reqData = req.body
        // Update where data is coming from base on where game is being added from
        switch (reqData.provider) {
            case "liChess":
                const gameArrLiChess = handleFileUpload(reqData.data)
                return handlePOST(req, res, gameArrLiChess)
            case "chessCom":
                const gameArrChessCom = handleFileUpload(reqData.data)
                return handlePOST(req, res, gameArrChessCom)
            default:
                const gameArr = handleFileUpload(reqData)
                if (gameArr.length > 0) {
                    return handlePOST(req, res, gameArr)
                }
                return
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
        // GET OPENING data from DB and assign
        const myGameMap = gameArr.map(async (game, index) => {
            const limit = (game.moves.length > 28) ? 28 : game.moves.length
            const testForExact = async (moveListClone: any[]) => {
                const testForCompleteMatch = await prisma.opening.findFirst({
                    where: {
                        sequence: {
                            equals: moveListClone
                        }
                    }
                })
                if (testForCompleteMatch) {
                    return testForCompleteMatch
                }
            }

            const getResult = async () => {
                for (let i = limit; i > 0; i--) {
                    const clone = [...game.moves]
                    const clone2 = clone.splice(0, i)
                    const query = FormatQuery.openingByMoves(0, clone2)
                    const result = await prisma.opening.findRaw({
                        filter: {
                            $and: query
                        },
                        options: { projection: {_id: false} }
                    })
                    if (result !== undefined && result !== null && result.length !== 0) {
                        try {
                            const isMatch = await testForExact(clone2)
                            if (isMatch) {
                                return isMatch
                            }
                        } catch (e: any) {
                            console.log("Error: ", e)
                            return null
                        }
                    }
                }
            }

            const data = await getResult()

            // TODO: Add logic to get the users actual user name from their account if they have added it,
            //  if not just add the ones from the game. Maybe look to see if there is a user

            if (data !== undefined && data !== null) {
                return {
                    ...game,
                    profileId: id,
                    gameMeta: createMetaData(game, "EpictetusZ1", id),
                    opening: {
                        id: data?.id,
                        openingECO: data?.eco,
                        openingName: data?.name,
                    }
                }
            } else {
                return {
                    ...game,
                    profileId: id,
                    gameMeta: createMetaData(game, "EpictetusZ1", id),
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

        let allIds: string[] = []

        if (gameIds !== null) {
            const actualIds = gameIds.map(game => game.id)
            allIds = tempIds.concat(actualIds)
        }

        const updatedProfile = await prisma.userProfile.update({
            where: {
                userId: id
            },
            data: {
                games: {
                    set: allIds
                }
            }
        })

        if (updatedProfile !== null) {
            return res.status(200).json({ message: "Games saved to user profile", hasErrors: false })
        }
        res.status(200).json({ message: "There was a problem adding the games to the user profile", hasErrors: true })
    }
}
