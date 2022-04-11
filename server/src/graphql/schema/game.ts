import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
    @Field(() => String)
    name: string

    @Field(() => String)
    value: string
}

@ObjectType()
export class Game {
    @Field(() => ID)
    _id: string

    @Field(() => String)
    event: string

    @Field(() => String)
    site: string

    @Field(() => Number)
    round: number

    @Field(() => String)
    white: string

    @Field(() => String)
    black: string

    @Field(() => String)
    result: string

    @Field(() => String)
    currentposition: string

    @Field(() => String)
    eco: string

    @Field(() => Number)
    whiteelo: number

    @Field(() => Number)
    blackelo: number

    @Field(() => Number)
    timecontrol: number

    @Field(() => String)
    termination: string

    @Field(() => [String])
    moves: string[]

    @Field(() => [Tag])
    otherTags: Tag[]
}