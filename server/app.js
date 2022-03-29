const express = require("express");
const bodyParser = require("body-parser");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const graphQlSchema = require("./graphql/schema/index");
const graphQlResolvers = require("./graphql/resolvers/index");
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const myFile = require("./utils/gameController");

require("dotenv").config()


const app = express()

app.use(bodyParser.json())

app.use("/graphql", graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}))

app.get("/upload", (req, res, next) => {
    res.sendFile("/Users/jackheaton/Documents/code_projects/chess-opening-book/server/index.html")
})

app.post('/upload', upload.single("chessGame"), myFile.fileUpload)

const mongoDB = `mongodb+srv://${process.env.MONGO_CLIENT_USER}:${process.env.MONGO_CLIENT_PASS}@cluster0.s0mtx.mongodb.net/${process.env.MONGO_CLIENT_DB}?retryWrites=true&w=majority`

mongoose.connect(mongoDB).catch(error => console.log(error))
mongoose.connection.on('error', console.error.bind(console, "MongoDB connection error:"))


app.listen(3000)
