export interface ITag {
    name: string
    value: string
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
    currentPosition?: string
    eco?: string
    whiteElo?: number
    blackElo?: number
    timeControl: string
    termination?: string
    moves: string[]
    otherTags: ITag[]
    profileId?: string
    gameMeta: IGameMeta
}

export interface IGameMeta {
    wElo: number | null
    wProfileId: string | null
    bElo: number | null
    bProfileId: string | null
    winner: "white" | "black" | "draw"
    winnerProfileId: string | null
}