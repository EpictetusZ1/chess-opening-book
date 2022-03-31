const fs = require('fs')
const path = require("path");
const Game = require("../models/game");
const { removeFile } = require("../utils/removeFile");


exports.fileUpload = (req, res, next) => {
    fs.readFile(path.resolve(__dirname, `../${req.file.path}`), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        const formGame = () => {
            const tagPattern = /\[(?<tagName>\w*)\s"(?<tagValue>[^"]*)/gm

            const tagTitles = [...data.matchAll(tagPattern)]
                .map((tag, i) => {
                    return [tag.groups.tagName.toLowerCase(), tag.groups.tagValue]
                })

            let tags = {}
            tagTitles.forEach((tag) => tags[tag[0]] = tag[1])

            const movePattern = /(?<moves>[0-9]+\.\s(?<plys>[Oo]-[Oo]-[Oo]|[Oo]-[Oo]\s?|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9])?)*)/gm

            const moveArr = [...data.matchAll(movePattern)]
                .map((item) => item.groups.moves.replace(/\r?\n|\r/gm, " "))

            return [tags, moveArr]
        }

        const [tags, moves] = formGame()

        const buildGame = {...tags, moves: moves}
        if (buildGame["round"] !== "?") buildGame["round"] = parseInt(buildGame["round"])
            else buildGame["round"] = "?"

        buildGame["round"] !== "?" ? buildGame["round"] = parseInt(buildGame["round"]) : buildGame["round"] = "?"

        const myGame = new Game({...buildGame})
        myGame.save().then().catch((err) => console.log(err))


        res.send(data)
        return removeFile()
    })
}


