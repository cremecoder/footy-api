const apiRouter = require("express").Router()
const apiController = require("./controllers/apiController")
const cors = require("cors")
require("dotenv").config()

apiRouter.use(cors())

apiRouter.get("/", (req, res) => {
  res.json(`App listening on port ${process.env.API_PORT}...`)
})

// http://localhost:9000/api/worldcup --- ON PAGE LOAD
apiRouter.get("/api/worldcup", apiController.getData)

// http://localhost:9000/api/worldcup --- QUERY
apiRouter.post("/api/worldcup/:team", apiController.getData)

module.exports = apiRouter
