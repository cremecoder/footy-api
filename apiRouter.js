const apiRouter = require("express").Router()
const testController = require("./controllers/testController")
const cors = require("cors")
require("dotenv").config()

apiRouter.use(cors())

apiRouter.get("/", (req, res) => {
  res.json(`App listening on port ${process.env.API_PORT}...`)
})

// http://localhost:9000/test
apiRouter.get("/test", testController.test)

module.exports = apiRouter
