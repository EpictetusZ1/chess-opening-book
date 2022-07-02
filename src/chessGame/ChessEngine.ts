

// This is for handling game state, checking valid moves, and will keep a move log.
export class GameState {

    board: Array<string>[]
    whiteToMove: Boolean = true
    moveLog: string[]

    constructor() {

     // Board is a 8x8 2d list, each element of the list has 2 characters
        this.board = [
            ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"],
            ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
            ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"]
        ]

        this.moveLog = []
        this.whiteToMove = true
    }

}

