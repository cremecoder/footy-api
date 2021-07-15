const cors = require("cors")
require("dotenv").config()
const apiRouter = require("express").Router()
const dataController = require("./controllers/dataController")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => {
  res.json(`App listening on port ${process.env.API_PORT}...`)
})

// http://localhost:9000/api/worldcup
apiRouter.get("/api/worldcup", dataController.fetchData)

// http://localhost:9000/api/worldcup/<country>

module.exports = apiRouter
