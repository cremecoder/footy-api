const apiRouter = require("express").Router()
const cors = require("cors")
const apiController = require("./controllers/apiController")
require("dotenv").config()

/* Allow cross-origin requests */
apiRouter.use(cors())

/* apiRouter is running... */
apiRouter.get("/", (req, res) => {
  res.json(`API listening on port ${process.env.API_PORT}...`)
})

// http://localhost:9000/api/worldcup --- ON PAGE LOAD
apiRouter.get("/api/worldcup", apiController.getData)
// http://localhost:9000/showData --- Just show data in json format
apiRouter.get("/showData", apiController.showData)

// http://localhost:9000/api/worldcup --- QUERY
apiRouter.post("/api/worldcup/:team", apiController.getTeamMatches)

module.exports = apiRouter
