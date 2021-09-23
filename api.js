const express = require("express")
const api = express()
const morgan = require("morgan")
require("dotenv").config()
const port = process.env.PORT

/* Allow Express to recognise requests and JSON */
api.use(express.urlencoded({ extended: false }))
api.use(express.json())

/* Morgan listening for http requests */
api.use(morgan("tiny"))

/* Use apiRouter */
api.use("/", require("./apiRouter"))

/* API is listening */
api.listen(port, () => {
  console.log(`Api listening on port ${port}...`)
})

module.exports = api
