import mongoose, { Schema, model } from 'mongoose';


export interface ITag {
    name: string
    value: string
}

export interface IMove {
    w: string
    b?: string // Blacks ply is optional, whites is not
}

export interface IGame {
    _id: string
    event: string
    site: string
    round?: number
    date: string
    white: string
    black: string
    result: string
    currentposition?: string
    eco?: string
    whiteelo?: number
    blackelo?: number
    timecontrol: string
    termination?: string
    moves: [IMove]
    otherTags?: [ITag]
}

const GameSchema = new Schema<IGame>(
    {
        event: {type: String, required: true, maxLength: 240},
        site: {type: String, required: true, maxLength: 100},
        round: {type: Number},
        date: {type: String, maxlength: 100},
        white: {type: String, required: true, maxLength: 50},
        black: {type: String, required: true, maxLength: 50},
        result: {type: String, required: true, maxLength: 100},
        currentposition: {type: String, maxLength: 50},
        eco: {type: String, maxLength: 240},
        whiteelo: {type: Number, maxLength: 4},
        blackelo: {type: Number, maxLength: 4},
        timecontrol: {type: String, maxLength: 25},
        termination: {type: String, maxLength: 240},
        moves:   { type: [{w: String, b: String, _id: false}] },
        otherTags: {type: [{name: String, value: String, _id: false}]},
    }, {versionKey: false}
)

// GameSchema
//     .virtual("title")
//     .get( function() {
//         // @ts-ignore
//         return `${this.white}_vs_${this.black}`
//     } )



export const Game = mongoose.models.Game || model<IGame>('Game', GameSchema)