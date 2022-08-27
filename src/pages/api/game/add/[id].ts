import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../../../lib/connect/prisma";
import {IGame} from "../../../../types/Game.types";
import {handleFileUpload} from "../../../../utils/parseGame";
import {createMetaData} from "../../../../utils/createMetaData";


export default function (req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        return handleGET(req, res)
    } else if (req.method === "POST") {
        return handlePOST(req, res)
        // return handleMultiGamePOST(req, res)
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

        if (data === null) {
            res.status(200).json({ message: `No games found for user profile with id: ${id}`, hasErrors: true })
        } else {
            res.status(200).json({ message: "Games found" , data, hasErrors: false })
        }
    }

    // TODO: Implement the ability to add an array of games at once
    async function handlePOST(req: NextApiRequest, res: NextApiResponse) {
        const {id} = req.query as { id: string }
        const gameArr = handleFileUpload(req.body)
        console.log("id", id)

        // Need to check the users 'userNames' to get the 2nd arg for createMetaData
        const testyOne = createMetaData(gameArr[0], "EpictetusZ1", id)
        console.log("Meta test", testyOne)
        console.log("----------------------------")
        const newGame = await prisma.game.create({
            data: {
                ...gameArr[0],
                profileId: id
            },
        })
        if (newGame !== null) {
            const updateUserProfile = await prisma.userProfile.update({
                where: {
                    userId: id
                }, data: {
                    games: {
                        set: [...newGame.id]
                    }
                }
            })
            if (updateUserProfile !== null) {
                return res.status(200).json({message: "Game saved", newGame, hasErrors: false})
            }
            res.status(200).json({message: "Problem saving game", hasErrors: true})
        }

    }


    //     async function handleMultiGamePOST(req: NextApiRequest, res: NextApiResponse) {
    //     const { id } = req.query as { id: string }
    //     const gameArr = handleFileUpload(req.body)
    //
    //
    //     const myGameMap = gameArr.map(game => ({
    //         ...game,
    //         profileId: id
    //     }))
    //     const newGames = await prisma.game.createMany({
    //         data: myGameMap,
    //     })
    //     const targetUser = await prisma.userProfile.findUnique({
    //         where: {
    //             userId: id
    //         }
    //     })
    //
    //     let tempIds = [...targetUser?.games || []]
    //     const gameIds = await prisma.game.findMany({
    //         where: {
    //             profileId: id
    //         },
    //         select: {
    //             id: true
    //         }
    //     })
    //
    //     if (gameIds !== null) {
    //         const actualIds = gameIds.map(game => game.id)
    //         let existingIds = [...actualIds]
    //         tempIds.concat(existingIds)
    //     }
    //
    //      const updatedProfile = await prisma.userProfile.update({
    //         where: {
    //             userId: id
    //         },
    //         data: {
    //             games: {
    //                 set: [...tempIds]
    //             }
    //         }
    //     })
    //     if (updatedProfile !== null) {
    //         return res.status(200).json({ message: "Game saved to user profile", hasErrors: false })
    //     }
    //     res.status(200).json({ message: "There was a problem adding the games to the user profile", hasErrors: true })
    // }
}