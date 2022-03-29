const mongoose = require("mongoose");
const Schema = mongoose.Schema

const GameSchema = new Schema(
    {
        event: {type: String},
        site: {type: String},
        date: {type: Date},
        round: {type: Number},
        title: {type: String},
        white: {type: String, required: true},
        black: {type: String, required: true},
        result: {type: String, required: true},
        currentPosition: {type: String},
        ECO: {type: String},
        whiteElo: {type: Number},
        blackElo: {type: Number},
        timeControl: {type: Number},
        termination: {type: String},
        otherTags: [{type: String}],
        moves: [{ type: String}],
    }, {versionKey: false}
)


module.exports = mongoose.model("Game", GameSchema)
