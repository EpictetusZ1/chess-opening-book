module.exports = {
    game: () => {
        return "I am Game Data"
    },
    createGame: (args) => {
        console.log(args.gameFile)
    },
    createMatrix: (args) => {
        const myMatrix = {
            info: "this is a mock of a later result",
            matrixTarget: `This matrix will run with ${args.move} as input`
        }
        return myMatrix.matrixTarget
    }
}