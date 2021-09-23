const GetData = require("../models/GetData")
const getData = new GetData()

/* On page load - returns boolean */
exports.getData = function (req, res) {
  getData
    .createMatchesJSON()
    .then(() => {
      res.json(getData.created)
    })
    .catch(() => res.json(getData.errors))
}

/* Returns matches json  */
exports.showData = function (req, res) {
  getData
    .resolveApiData()
    .then(data => {
      res.json(data)
    })
    .catch(() => res.json(getData.errors))
}

/* Returns requested teams matches in json format */
exports.getTeamMatches = function (req, res) {
  getData
    .findTeam(req.body.team)
    .then(() => {
      res.json({
        matches: getData.teamMatches
      })
    })
    .catch(() => {
      res.json(getData.errors)
    })
}
