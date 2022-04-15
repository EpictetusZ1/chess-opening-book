import { Schema, model } from 'mongoose';


interface ITag {
        name: string
        value: string
}

interface IGame {
        _id: string
        event: string
        site: string
        round?: number
        white: string
        black: string
        result: string
        currentposition?: string
        eco?: string
        whiteelo?: number
        blackelo?: number
        timecontrol: string
        termination?: string
        moves: [string]
        otherTags?: [ITag]
}

const GameSchema = new Schema<IGame>(
    {
        event: {type: String, required: true, maxLength: 240},
        site: {type: String, required: true, maxLength: 100},
        round: {type: Number},
        white: {type: String, required: true, maxLength: 50},
        black: {type: String, required: true, maxLength: 50},
        result: {type: String, required: true, maxLength: 100},
        currentposition: {type: String, maxLength: 50},
        eco: {type: String, maxLength: 240},
        whiteelo: {type: Number, maxLength: 4},
        blackelo: {type: Number, maxLength: 4},
        timecontrol: {type: String, maxLength: 25},
        termination: {type: String, maxLength: 240},
        moves: [{type: String, required: true, maxLength: 15}],
        otherTags: {type: [{name: String, value: String, _id: false}]},
    }, {versionKey: false}
)

GameSchema
    .virtual("title")
    .get( function() {
            // @ts-ignore
        return `${this.white}_vs_${this.black}`
    } )

export const Game = model<IGame>('Game', GameSchema)

