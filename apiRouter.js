const fs = require("fs")
const apiRouter = require("express").Router()
const cors = require("cors")
require("dotenv").config()
const { resolveApiData } = require("./models/GetData")

apiRouter.use(cors())

apiRouter.get("/", (req, res) => {
  res.json(`App listening on port ${process.env.API_PORT}...`)
})

// http://localhost:9000/api/worldcup --- ON PAGE LOAD
apiRouter.get("/api/worldcup", (req, res) => {
  resolveApiData()
    .then(resArr => {
      let matches = JSON.stringify(resArr)
      fs.writeFileSync("matches.json", matches, err => {
        if (err) {
          res.json(false)
        }
      })
      res.json(true)
    })
    .catch(err => console.log(err))
})

// http://localhost:9000/api/worldcup --- QUERY
// apiRouter.post("/api/worldcup/:country", (req, res) => {
// query function(country)
// .then() true response
// catch() false no response
// })

module.exports = apiRouter
