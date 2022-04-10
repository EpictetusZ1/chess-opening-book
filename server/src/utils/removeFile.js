// const path = require("path");
// const fs = require("fs");
//
//
// module.exports = {
//     removeFile: () => {
//         const directoryPath = path.join(__dirname, "../uploads/")
//
//         fs.readdir(directoryPath, (err, files) => {
//             if (err)  console.log(err)
//             files.forEach( (file) => {
//                 try {
//                     fs.unlinkSync(`${directoryPath}${file}`)
//                 } catch(err) {
//                     console.error(err)
//                 }
//             })
//         })
//     }
//
// }
//
//
//
//
//
