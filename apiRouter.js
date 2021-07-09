const apiRouter = require("express").Router()
const dataController = require("./controllers/dataController")
const cors = require("cors")
require("dotenv").config()

apiRouter.use(cors())

apiRouter.get("/", (req, res) => {
  res.json(`App listening on port ${process.env.API_PORT}...`)
})

// http://localhost:9000/api/worldcup/<country>
apiRouter.get("/api/worldcup", dataController.fetchData)

module.exports = apiRouter
