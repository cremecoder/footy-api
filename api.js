const express = require("express")
const api = express()
const morgan = require("morgan")
require("dotenv").config()
const port = process.env.PORT || 9000

/* Allow Express to recognise requests and JSON */
api.use(express.urlencoded({ extended: false }))
api.use(express.json())

/* Morgan listening for http requests */
api.use(morgan("tiny"))

/* Use apiRouter */
api.use("/", require("./apiRouter"))

/* API is listening */
api.listen(port, () => {
  console.log(`Api running on ${port}...`)
})

module.exports = api
