const fs = require('fs')
const path = require("path");
const { removeFile } = require("./removeFile");

exports.handleFileUpload = (req, res, next) => {
    fs.readFile(path.resolve( __dirname, `../../${req.file.path}`), 'utf8' , (err, data) => {
        if (err) return console.error(err)

        const initGameFormatting = () => {
            const tagPattern = /\[(?<tagName>\w*)\s"(?<tagValue>[^"]*)/gm
            const tagTitles = [...data.matchAll(tagPattern)]
                .map((tag, i) => [tag.groups.tagName.toLowerCase(), tag.groups.tagValue])

            let tags = {}
            tagTitles.forEach((tag) => tags[tag[0]] = tag[1])

            const movePattern = /(?<moves>[0-9]+\.\s(?<plys>([Oo]-[Oo]-[Oo]|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9])?)*)/gm

            const moveArr = [...data.matchAll(movePattern)]
                .map((item) => item.groups.moves.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ").trim())

            return [tags, moveArr]
        }

        const [tags, moves] = initGameFormatting()

        const makeShallowCopy = () => {
            return {...tags, moves: moves}
        }

        const gameObj = makeShallowCopy()


        const formatRound = () => {
            const roundPattern = /(?<round>[0-9]{1,3})/gm
            const roundValue = gameObj["round"].match(roundPattern)

            roundValue ? gameObj["round"] = parseInt(gameObj["round"]) : gameObj["round"] = "?"
        }
        formatRound()


        const handleAdditionalTags = (tag) => {
            if (!gameObj.otherTags) gameObj["otherTags"] = []
            gameObj.otherTags.push(tag)
        }

        const checkAdditionalTags = () => {
            const tagName = Object.keys(tags)
            for (let i = 0; i < tagName.length; i++) {
                switch (tagName[i]) {
                    default:
                        const newTag = {
                            name: tagName[i],
                            value: tags[tagName[i]]
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

        checkAdditionalTags()

        res.send(gameObj)
        // return removeFile()
    })
}



