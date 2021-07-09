const { resolveData } = require("../models/Data")

exports.fetchData = function (req, res) {
  resolveData("sweden")
    .then(resArr => {
      res.json(resArr)
    })
    .catch(err => console.log(err))
}
