const apiRouter = require("express").Router()
const cors = require("cors")
const apiController = require("./controllers/apiController")
const jsonExample = require("./data/model.json")

/* Allow cross-origin requests */
apiRouter.use(cors())

/* apiRouter is running... */
apiRouter.get("/", (req, res) => {
  res.json(jsonExample)
})

/* On page load */
apiRouter.get("/api/worldcup", apiController.getData)

/* Just show data in json format */
apiRouter.get("/api/showData", apiController.showData)

/* Post request team matches */
apiRouter.post("/api/worldcup/findMatches", apiController.getTeamMatches)

module.exports = apiRouter
