/**
 * This is the script to seed the opening book database
 * data was acquired from: git@github.com:lichess-org/chess-openings.git
 *
 * To run use command:
 *
 * `npx prisma db seed`
 */
const { PrismaClient } = require('@prisma/client')

const load = async () => {
    const prisma = new PrismaClient()

    try {
        const fs = require('fs')
        const path = require('path')
        // Manually changed file names, documents range from a.tsv - e.tsv.
        const filePath = path.join(__dirname, 'a.tsv')
        const file = fs.readFileSync(filePath, 'utf8')
        const lines = file.split(/\n/g)
        // Remove the header row containing --> eco	name	pgn
        lines.shift()

        const dataPattern = /^(?<ECO>.*)\t(?<OpeningName>.*)\t(?<moveList>.*)/gm
        const movePattern = /(?<moves>[0-9]+\.\s?(?<plys>([Oo]-[Oo]-[Oo]{0,2}\s?|[Oo]-[Oo]\s?){0,2}|[KQBNR]?x?\+?[a-h]?[1-8]?x?\+?\s?[KQBNR]?x?[a-h]x?[a-h]?[1-8]=?[QBNR]?\s?x?[+#]?\s?(\s?[0-9]-[0-9]|(1\/2-?){0,2})?)*)/gm
        let data = []

        for (let i = 0; i < lines.length - 1; i++) {
            const openingMatch = [...lines[i].matchAll(dataPattern)]
            const moveList = openingMatch[0].groups.moveList
            const singleMoves = [...moveList.matchAll(movePattern)]
                .map( (item) => item.groups.moves.replace(/(?<lineBreaks>\r?\n|\r)/gm, " ").trim())
            let formattedMoveArr = []
            for (let i = 0; i < singleMoves.length; i++) {
                const split = singleMoves[i].split(" ")
                if (split[2]) {
                    formattedMoveArr.push(split[1], split[2])
                } else {
                    formattedMoveArr.push(split[1])
                }
            }
            data.push({
                eco: openingMatch[0].groups.ECO,
                name: openingMatch[0].groups.OpeningName,
                sequence: formattedMoveArr
            })
        }

        await prisma.opening.createMany({
            data
        })
    } catch (e) {
        console.error(e)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

load()
