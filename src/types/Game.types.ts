export interface ITag {
    name: string
    value: string
}

export interface IGame {
    id: string
    event: string
    site: string
    round?: number
    date: string
    white: string
    black: string
    result: string
    currentPosition?: string
    eco?: string;
    whiteElo?: number
    blackElo?: number
    timeControl: string
    termination?: string
    moves: string[]
    otherTags?: string[]
}
