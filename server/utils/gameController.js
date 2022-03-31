const fs = require('fs')
const path = require("path");
exports.fileUpload = (req, res, next) => {
    fs.readFile(path.resolve(__dirname, `../${req.file.path}`), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }

        const cleanGame = async () => {
            const patternTags = /\[.*]/gm
            const tags = data.match(patternTags)

            const movePattern = /(?<moves>[0-9]+\.\s(?<plys>[Oo]-[Oo]-[Oo]|[Oo]-[Oo]\s?|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]\s?x?[+#]?\s?(\s?[0-9]-[0-9])?)*)/gm

            const moveArr = [...data.matchAll(movePattern)]
                .map((item) => {
                    return item.groups.moves.replace(/\r?\n|\r/gm, " ")
                })
        }
        cleanGame()

        res.send(data)
    })
}


