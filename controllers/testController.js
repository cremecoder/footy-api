const Test = require("../models/Test")

exports.test = function (req, res) {
  let test = new Test()
  test
    .testFunction()
    .then(data => res.json(data))
    .catch(err => {
      res.json(false)
    })
}
