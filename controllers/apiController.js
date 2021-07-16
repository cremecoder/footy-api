const GetData = require("../models/GetData")

exports.getData = function (req, res) {
  let getData = new GetData()
  getData
    .createMatchesJSON()
    .then(() => {
      res.json(true)
    })
    .catch(() => res.json(false))
}

exports.getTeamMatches = function (req, res) {
  let getData = new GetData() // this.created would still be false with new obj instance!
  getData
    .findTeam(req.headers.team)
    .then(() => {
      res.json("yesss")
    })
    .catch(() => res.json(false))
}
