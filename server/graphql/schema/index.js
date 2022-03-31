const { buildSchema } = require("graphql");


module.exports = buildSchema(`
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
                termination: String
                otherTags: [String]
                moves: [String!]!
            }
        
            type RootQuery {
                game: String!
            }
        
            type RootMutation {
                createMatrix(move: [String!]): String
                createGame(gameFile: String!): String
            }
        
            schema {
                query: RootQuery
                mutation: RootMutation
            }
        `)