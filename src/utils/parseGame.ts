import {IGame, ITag} from "../types/Game.types";

/**
 * @param data Array of .pgn file strings from api/game/[id].ts
 * @returns gameArr2 An Array of Modeled data to be then sent to MongoDB
 * @summary Uses RegEx to parse out the separate elements in a chess game file a.k.a. '.pgn file' ( Portable Game Notation)
 * Creates a Prisma / TypeScript model for a Chess Game from text data.
 * */
export const handleFileUpload =  (data: string): IGame[] => {
    // TODO: Would this not work better if I dealt with the tags first? then removed them then parsed the moves?
    // TODO: answer: yes.

    const getGamesArr = () => {
        const gamePat = /\[Event ".*"]/gmi
        const matches = data.matchAll(gamePat)

        let matchIndexes = []
        let gamesArr1 = []

        for (const match of matches) {
            matchIndexes.push(match.index)
        }

        for (let i = 0; i < matchIndexes.length; i++) {
            gamesArr1.push( data.slice(matchIndexes[i], matchIndexes[i + 1]) )
        }

        return gamesArr1
    }

    /**
     *
     * @type IGame
     * @param data A SINGLE text string from the initial import
     * @function createGameObject constructs an instance of Game
     * Accepts a string which is the extracted text from a .pgn file
     * */
    const createGameObject = (data: string) => {

        const initGameFormatting = () => {
            /**
             * @example Match for tag pattern:  [Event "Live Chess"]
             */
            const tagPattern = /\[(?<tagName>\w*)\s"(?<tagValue>[^"]*)/gm

            const tagTitles = [...data.matchAll(tagPattern)]
                .map( (tag) => {
                    if (tag.groups) return [tag.groups.tagName.toLowerCase(), tag.groups.tagValue]
                    else throw new Error("No Groups found.")
                })

            let tags: {[index: string]: any} = {}
            tagTitles.forEach((tag) => tags[tag[0]] = tag[1])

            /**
             * @remark
             * FRINGE CASE HANDLERS
             * Deal w/ fringe cases before 'move' extraction
             */
            const variationOrComment = /(?<variation>\s\(\d{1,2}\.{0,3}(.|\s)+?(?=\))\))|(?<comment>{\s(.|\s)+?(?=})})/gmi

            const removeClock = (data: string): string => {
                const clockPattern = /(?<coreClock>{\[%clk\s[\d|:]*\.?\d?]}\s?)(?<trailingMove>\s?\d{1,3}\.{3}\s)?/gmi
                 return data.replaceAll(clockPattern, "")
            }

            // This adds a space to the DATE tags, and prevents them from matching in the move pattern
            const addSpaces = (data: string): string => {
                const noSpacesPattern = /(?<addASpace>(?<=\d)\.(?!\.)(?!\s|\d)|.*Date.*]|.*Time.*]|.*ECOURL.*])/gmi
                return data.replaceAll(noSpacesPattern, ". ")
            }

            /**
             * @remark
             * Parse Moves from the game, which are separate from Tags
             *
             * The first line of moves in a chess game file might look like this, but can vary.
             * @example 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Bd3 a6 6. O-O g6 7. Ne2 Bg7 8. Be3
             */
            const formatMoveArr = () => {
                //TODO: This does not match moves if there is no space between the ply number and the move,
                // it will not match: 1.e4 e5
                const movePattern = /(?<moves>[0-9]+\.\s?(?<plys>([Oo]-[Oo]-[Oo]{0,2}\s?|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]=?[QBNR]?\s?x?[+#]?\s?(\s?[0-9]-[0-9]|(1\/2-?){0,2})?)*)/gm
                const moveArr0 = removeClock(data)
                const clean1 = addSpaces(moveArr0)
                let moveArr1 = [...clean1.matchAll(movePattern)]
                    .map( (item) => item.groups!.moves!.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ")!.trim())
                let moveArr2: string[] = []

                for (let i = 0; i < moveArr1.length; i++) {
                    const split = moveArr1[i].split(" ")
                    if (split[2]) {
                        moveArr2.push(split[1].trim(), split[2].trim())
                    } else {
                        moveArr2.push(split[1].trim())
                    }
                }
                return moveArr2

            }
            return {...tags, moves: formatMoveArr()}
        }

        const gameObjUpper: {[index: string]: any} = initGameFormatting()
        const gameObj: {[index: string]: any} = Object.fromEntries(
            Object.entries(gameObjUpper).map(([k, v]) => [k.toLowerCase(), v])
        )

        const formatRound = () => {
            const roundPattern = /(?<round>[0-9]{1,3})/gm
            if (gameObj.round) {
                const roundValue = gameObj["round"].match(roundPattern)

                roundValue ? gameObj["round"] = parseInt(gameObj["round"]) : gameObj["round"] = 0
            } else {
                gameObj["round"] = 0
            }
        }

        const formatElo = (color: string) => {
            if (color === "white") {
                gameObj["whiteElo"] =  parseInt(gameObj["whiteelo"]) || 0
            }
            if (color === "black") {
                gameObj["blackElo"] =  parseInt(gameObj["blackelo"]) || 0
            }
        }

        const handleAdditionalTags = (tag: ITag) => {
            if (!gameObj.otherTags) gameObj["otherTags"] = []
            if (tag.value !== "") gameObj.otherTags.push(tag)
        }

        const checkAdditionalTags = () => {
            const tagName = Object.keys(gameObj)
            for (let i = 0; i < tagName.length; i++) {
                switch (tagName[i]) {
                    default:
                        const newTag = {
                            name: tagName[i],
                            value: gameObj[tagName[i]]
                        }
                        handleAdditionalTags(newTag)
                        delete gameObj[tagName[i]]
                        break
                    case "whiteelo":
                        formatElo("white")
                        delete gameObj["whiteelo"]
                        break
                    case "blackelo":
                        formatElo("black")
                        delete gameObj["blackelo"]
                        break
                    case "currentposition":
                        gameObj["currentPosition"] = gameObj["currentposition"]
                        delete gameObj["currentposition"]
                        break
                    case "timecontrol":
                        gameObj["timeControl"] = gameObj["timecontrol"]
                        delete gameObj["timecontrol"]
                        break
                    case "eco":
                    case "event":
                    case "site":
                    case "date":
                    case "round":
                    case "title":
                    case "white":
                    case "black":
                    case "result":
                    case "termination":
                    case "moves":
                        break
                }
            }
        }

        formatRound()
        checkAdditionalTags()

        return gameObj
    }

    // TODO: Fix type suppression for this whole file
    const gamesArr2 = getGamesArr()
    const iterateGamesArr = () => {
        for (let i = 0; i < gamesArr2.length; i++) {
            // @ts-ignore
            gamesArr2[i] = createGameObject(gamesArr2[i])
        }
    }

    iterateGamesArr()
    // @ts-ignore
    return gamesArr2
}
