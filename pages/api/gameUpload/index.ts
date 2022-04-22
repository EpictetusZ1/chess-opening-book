import { Game } from "../../../lib/models/game"


export const handleFileUpload = async (data: string) => {

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

        const movePattern = /(?<moves>[0-9]+\.\s(?<plys>([Oo]-[Oo]-[Oo]|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9])?)*)/gm

        // @ts-ignore
        let moveArr = [...data.matchAll(movePattern)]
            .map( (item) => item.groups!.moves!.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ")!.trim())

        return {...tags, moves: moveArr}
    }

    const gameObj: {[index: string]: any} = initGameFormatting()

    const formatRound = () => {
        const roundPattern = /(?<round>[0-9]{1,3})/gm
        const roundValue = gameObj["round"].match(roundPattern)

        roundValue ? gameObj["round"] = parseInt(gameObj["round"]) : gameObj["round"] = "?"
    }

    interface ITag {
        name: string
        value: string
    }

    const handleAdditionalTags = (tag: ITag) => {
        if (!gameObj.otherTags) gameObj["otherTags"] = []
        gameObj.otherTags.push(tag)
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
    checkAdditionalTags()

    return gameObj

    // return new Game(gameObj)
}
