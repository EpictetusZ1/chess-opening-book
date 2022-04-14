import {Request, Response, NextFunction} from "express";

export const handleFileUpload = async (req: Request, res: Response, next: NextFunction) => {

    const data = String(req?.file?.buffer)

    const initGameFormatting = () => {
        const tagPattern = /\[(?<tagName>\w*)\s"(?<tagValue>[^"]*)/gm
        const tagTest = tagPattern.test(data)
        const tagTitles = [...data.matchAll(tagPattern)]
            .map((tag) => {
                if (tag.groups) return [tag.groups.tagName.toLowerCase(), tag.groups.tagValue]
            })

        let tags = {}
        // @ts-ignore
        tagTitles.forEach((tag) => tags[tag[0]] = tag[1])

        const movePattern = /(?<moves>[0-9]+\.\s(?<plys>([Oo]-[Oo]-[Oo]|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9])?)*)/gm
        const moveTest = movePattern.test(data)

        let moveArr: string[] = [...data.matchAll(movePattern)]
            .map((item) => item.groups!.moves!.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ")!.trim())

        return {...tags, moves: moveArr}
    }

    interface IGameRound {
        [key: string]: any
    }

    const gameObj = initGameFormatting()

    const formatRound = () => {
        const roundPattern = /(?<round>[0-9]{1,3})/gm
        //@ts-ignore
        const roundValue = gameObj["round"].match(roundPattern)

        //@ts-ignore
        roundValue ? gameObj["round"] = parseInt(gameObj["round"]) : gameObj["round"] = "?"
    }


    const handleAdditionalTags = (tag: any) => {
        //@ts-ignore
        if (!gameObj.otherTags) gameObj["otherTags"] = []
        //@ts-ignore
        gameObj.otherTags.push(tag)
    }

    const checkAdditionalTags = () => {
        const tagName = Object.keys(gameObj)
        for (let i = 0; i < tagName.length; i++) {
            switch (tagName[i]) {
                default:
                    const newTag = {
                        name: tagName[i],
                        //@ts-ignore
                        value: gameObj[tagName[i]]
                    }
                    handleAdditionalTags(newTag)
                    //@ts-ignore
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

    res.send("Hello from gameController")
}
