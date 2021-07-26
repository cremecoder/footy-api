const GetData = require("../models/GetData")
const getData = new GetData()

exports.getData = function (req, res) {
  getData
    .createMatchesJSON()
    .then(() => {
      res.json(getData.created)
    })
    .catch(() => res.json(getData.errors))
}

exports.showData = function (req, res) {
  getData
    .resolveApiData()
    .then(data => {
      res.json(data)
    })
    .catch(() => res.json(getData.errors))
}

exports.getTeamMatches = function (req, res) {
  getData
    .findTeam(req.body.team)
    .then(() => {
      res.json(getData.teamMatches)
    })
    .catch(() => res.json(getData.errors))
}
