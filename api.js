const fs = require("fs")
const express = require("express")
const api = express()
const morgan = require("morgan")
require("dotenv").config()

/* Delete matches.json */
// if (fs.existsSync("./data/matches.json")) {
//   fs.unlink("./data/matches.json", err => {
//     if (err) {
//       console.log(err)
//     }
//     console.log("deleted")
//   })
// }

/* Allow Express to recognise requests and JSON */
api.use(express.urlencoded({ extended: false })) // ? false ?
api.use(express.json())

/* Morgan listening for http requests */
api.use(morgan("tiny"))

/* Use apiRouter */
api.use("/", require("./apiRouter"))

/* API is listening */
api.listen(process.env.API_PORT, () => {
  console.log(`Api listening on port ${process.env.API_PORT}...`)
})

module.exports = api
