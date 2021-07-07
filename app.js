const express = require("express")
const app = express()
const morgan = require("morgan")
require("dotenv").config()

/* Allow Express to recognise requests and JSON */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* Morgan listening for http requests */
app.use(morgan("tiny"))

/* Use apiRouter */
app.use(require("./apiRouter"))

/* Client listening */
app.listen(process.env.API_PORT, () => {
  console.log(`App listening on port ${process.env.API_PORT}...`)
})

module.exports = app
