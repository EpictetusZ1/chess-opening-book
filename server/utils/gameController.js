const fs = require('fs')
const path = require("path");

exports.fileUpload = (req, res, next) => {

    fs.readFile(path.resolve(__dirname, `../${req.file.path}`), 'utf8' , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.send(data)
    })
}


