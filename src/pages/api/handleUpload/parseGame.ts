import {Game} from "../../../lib/models/game"


export const handleFileUpload =  (data: string) => {

    const getGameArr = () => {
        const gamePat = /\[Event ".*"\]/gmid
        const matches = data.matchAll(gamePat)

        let matchIndexes = []
        let gamesArr = []

        for (const match of matches) {
            matchIndexes.push(match.index)
        }

        for (let i = 0; i < matchIndexes.length; i++) {
            gamesArr.push( data.slice(matchIndexes[i], matchIndexes[i + 1]) )
        }

        return gamesArr
    }

    const formatGameFinal = (data: string) => {

        const initGameFormatting = () => {
            const tagPattern = /\[(?<tagName>\w*)\s"(?<tagValue>[^"]*)/gm

            // @ts-ignore
            const tagTitles = [...data.matchAll(tagPattern)]
                .map( (tag) => {
                    if (tag.groups) return [tag.groups.tagName.toLowerCase(), tag.groups.tagValue]
                    else throw new Error("No Groups found.")
                })

            let tags: {[index: string]: any} = {}
            tagTitles.forEach((tag) => tags[tag[0]] = tag[1])

            const movePattern = /(?<moves>[0-9]+\.\s(?<plys>([Oo]-[Oo]-[Oo]|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9]|(1\/2-?){0,2})?)*)/gm

            // @ts-ignore
            let moveArr = [...data.matchAll(movePattern)]
                .map( (item) => item.groups!.moves!.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ")!.trim())

            return {...tags, moves: moveArr}
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

        interface ITag {
            name: string
            value: string
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

    const gamesArr = getGameArr()

    const makeGame = () => {
        for (let i = 0; i < gamesArr.length; i++) {
            gamesArr[i] = formatGameFinal(gamesArr[i])
        }
    }

    makeGame()

    return gamesArr

}
