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
    _gameMeta?: IGameMeta
}

export interface IGameMeta {
    wElo: number | undefined
    wProfileId: string | undefined
    bElo: number | undefined
    bProfileId: string | undefined
    winner: "white" | "black" | "draw"
    winnerProfileId: string | undefined
}