const Data = require("../models/Data")

exports.fetchData = function (req, res) {
  Data.resolveData("sweden")
    .then(resArr => {
      res.json(resArr)
    })
    .catch(err => console.log(err))
}
