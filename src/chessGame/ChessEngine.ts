

// This is for handling game state, checking valid moves, and will keep a move log.
export class GameState {

    board: Array<string>[]
    whiteToMove: Boolean = true
    moveLog: string[]

    constructor() {

     // Board is a 8x8 2d list, each element of the list has 2 characters
        this.board = [
            ["bR", "bN", "bB", "bQ", "bK", "bB", "bN", "bR"],
            ["bP", "bP", "bP", "bP", "bP", "bP", "bP", "bP"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["--", "--", "--", "--", "--", "--", "--", "--"],
            ["wP", "wP", "wP", "wP", "wP", "wP", "wP", "wP"],
            ["wR", "wN", "wB", "wQ", "wK", "wB", "wN", "wR"]
        ]
        this.moveLog = []
        this.whiteToMove = true

    }

}

