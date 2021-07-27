const express = require("express")
const api = express()
const morgan = require("morgan")

/* Allow Express to recognise requests and JSON */
api.use(express.urlencoded({ extended: false }))
api.use(express.json())

/* Morgan listening for http requests */
api.use(morgan("tiny"))

/* Use apiRouter */
api.use("/", require("./apiRouter"))

/* API is listening */
api.listen(9000, () => {
  console.log("Api listening on port 9000...")
})

module.exports = api
