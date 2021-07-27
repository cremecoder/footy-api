const express = require("express")
const api = express()
const morgan = require("morgan")
require("dotenv").config()

/* Allow Express to recognise requests and JSON */
api.use(express.urlencoded({ extended: false }))
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
