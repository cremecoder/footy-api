const GetData = require("../models/GetData")
const getData = new GetData()

exports.getData = function (req, res) {
  getData
    .createMatchesJSON()
    .then(() => {
      console.log(getData.created)
      res.json(true)
    })
    .catch(() => res.json(false))
}

exports.showData = function (req, res) {
  getData
    .resolveApiData()
    .then(data => {
      res.json(data)
    })
    .catch(() => res.json(false))
}

exports.getTeamMatches = function (req, res) {
  getData
    .findTeam(req.body.team)
    .then(teams => {
      res.json(teams)
    })
    .catch(() => res.json(false))
}
