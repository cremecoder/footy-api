const apiRouter = require("express").Router()
const cors = require("cors")
const apiController = require("./controllers/apiController")

/* Allow cross-origin requests */
apiRouter.use(cors())

/* apiRouter is running... */
apiRouter.get("/", (req, res) => {
  res.json("API listening on port 9000...")
})

// http://localhost:9000/api/worldcup --- ON PAGE LOAD
apiRouter.get("/api/worldcup", apiController.getData)
// http://localhost:9000/api/showData --- Just show data in json format
apiRouter.get("/api/showData", apiController.showData)

// http://localhost:9000/api/worldcup/<team> --- QUERY
apiRouter.post("/api/worldcup/findMatches", apiController.getTeamMatches)

module.exports = apiRouter
