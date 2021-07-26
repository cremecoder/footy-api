const GetData = require("../models/GetData")
// const getData = new GetData()

exports.getData = function (req, res) {
  const getData = new GetData()
  getData
    .createMatchesJSON()
    .then(() => {
      res.json(getData.created)
    })
    .catch(() => res.json(getData.errors))
}

exports.showData = function (req, res) {
  const getData = new GetData()
  getData
    .resolveApiData()
    .then(data => {
      res.json(data)
    })
    .catch(() => res.json(getData.errors))
}

exports.getTeamMatches = function (req, res) {
  const getData = new GetData()
  getData
    .findTeam(req.body.team)
    .then(reqTeam => {
      res.json(reqTeam)
    })
    .catch(() => res.json(getData.errors))
}
