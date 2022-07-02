import {Game, IMove, ITag} from "../lib/models/game"

/**
 * @param data Array of .pgn file strings from api/handleUpload/apiRoute.ts
 * @returns gameArr2 An Array of Modeled data to be then sent to MongoDB
 * @summary Uses RegEx to parse out the separate elemments in a chess game file a.ka. .pgn file ( Portable Game Notation)
 * Creates a Mongoose/ TypeScript model for a Chess Game from text data.
 * */
export const handleFileUpload =  (data: string) => {

    const getGamesArr = () => {
        const gamePat = /\[Event ".*"]/gmid
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
     * @type Game
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

            /**
             * @remark
             * Parse Moves from the game, which are separate from Tags
             *
             * The first line of moves in a chess game file might look like this, but can vary.
             * @example 1. e4 c5 2. Nf3 d6 3. d4 cxd4 4. Nxd4 Nf6 5. Bd3 a6 6. O-O g6 7. Ne2 Bg7 8. Be3
             */
            const formatMoveArr = () => {
                const movePattern = /(?<moves>[0-9]+\.\s(?<plys>([Oo]-[Oo]-[Oo]{0,2}\s?|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9]|(1\/2-?){0,2})?)*)/gm

                let moveArr1 = [...data.matchAll(movePattern)]
                    .map( (item) => item.groups!.moves!.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ")!.trim())

                // @ts-ignore
                let moveArr2: [IMove] = []

                for (let i = 0; i < moveArr1.length; i++) {
                    const split = moveArr1[i].split(" ")

                    moveArr2.push(
                        { w: split[1], b: split[2]}
                    )
                }
                return moveArr2

            }
            return {...tags, moves: formatMoveArr()}
        }

        const gameObj: {[index: string]: any} = initGameFormatting()

        const formatRound = () => {
            const roundPattern = /(?<round>[0-9]{1,3})/gm
            const roundValue = gameObj["round"].match(roundPattern)

            roundValue ? gameObj["round"] = parseInt(gameObj["round"]) : gameObj["round"] = 0
        }

        const formatElo = () => {
            if (!parseInt(gameObj["whiteelo"])) gameObj["whiteelo"] = 0
            if (!parseInt(gameObj["blackelo"])) gameObj["blackelo"] = 0
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
                    case "event":
                    case "site":
                    case "date":
                    case "round":
                    case "title":
                    case "white":
                    case "black":
                    case "result":
                    case "currentposition":
                    case "eco":
                    case "whiteelo":
                    case "blackelo":
                    case "timecontrol":
                    case "termination":
                    case "moves":
                        break
                }
            }
        }

        formatRound()
        formatElo()
        checkAdditionalTags()

        return new Game(gameObj)
    }

    const gamesArr2 = getGamesArr()

    const iterateGamesArr = () => {
        for (let i = 0; i < gamesArr2.length; i++) {
            gamesArr2[i] = createGameObject(gamesArr2[i])
        }
    }

    iterateGamesArr()

    return gamesArr2
}
