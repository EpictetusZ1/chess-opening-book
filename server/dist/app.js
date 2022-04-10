"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const pgn = require("./utils/gameController");
const upload = (0, multer_1.default)({ dest: "uploads/" });
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    console.log("hello world");
    res.send("Hello World!");
});
app.get("/upload", (req, res, next) => {
    res.sendFile("/Users/jackheaton/Documents/code_projects/chess-opening-book/server/index.html");
});
app.post("/upload", upload.single("chessGame"), pgn.handleFileUpload);
app.listen(3000, () => console.log("Server listening"));
