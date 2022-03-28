const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

// Mock opening data, move to MongoDB Atlas later
const matrix = []


const app = express()

app.use(bodyParser.json())

app.use("/graphql", graphqlHTTP({
        schema: buildSchema(`
            type Game {
                _id: ID!
                event: String
                site: String
                date: String
                round: Int 
                title: String
                white: String!
                black: String!
                result: String!
                currentPosition: String
                ECO: String
                whiteElo: Int 
                blackElo: Int 
                timeControl: Int 
                endTime: String
                termination: String
                moves: [String!]!
            }
        
            type RootQuery {
                openings: [String!]!
            }
        
            type RootMutation {
                createMatrix(move: [String!]): String
            }
        
            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `),
        rootValue: {
            openings: () => {
                return ["1. e4", "1. d4", "1. Nf3", "1. c4"]
            },
            createMatrix: (args) => {
                const myMatrix = {
                    info: "this is a mock of a later result",
                    matrixTarget: `This matrix will run with ${args.move} as input`
                }
                return myMatrix.matrixTarget
            }
        },
        graphiql: true
    }))

app.listen(3000)

