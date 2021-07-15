const { resolveData } = require("../models/Data")

exports.fetchData = function (req, res) {
  resolveData()
    .then(resArr => {
      res.json(resArr)
    })
    .catch(err => console.log(err))
}
