const axios = require("axios")
require("dotenv").config()

let Test = function () {
  this.data
  this.errors = []
}

// http://api.football-data.org/v2/competitions/WC/matches
// X-Auth-Token
// process.env.FOOTBALL_DATA_TOKEN
// ec8536c1e05544e284af76ed65c56c22
Test.prototype.testFunction = async function () {
  try {
    const res = await axios.get(
      "http://api.football-data.org/v2/competitions/WC/matches",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
          "Content-Type": "application/JSON; charset=utf-8"
        }
      }
    )
    if (res.data) {
      return res.data
    }
  } catch (err) {
    return err
  }
}

// Test.prototype.testFunction = function () {
//   return new Promise((resolve, reject) => {
//     axios
//       .get("http://api.football-data.org/v2/competitions/WC/matches", {
//         headers: {
//           "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
//           "Content-Type": "application/JSON; charset=utf-8"
//         }
//       })
//       .then(data => {
//         if (data) {
//           resolve(data)
//         }
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

// Test.prototype.testFunction = function () {
//   return new Promise((resolve, reject) => {
//     fetch("http://api.football-data.org/v2/competitions/WC/matches", {
//       headers: {
//         "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
//         "Content-Type": "application/JSON; charset=utf-8"
//       }
//     })
//       .then(res => res.json())
//       .then(data => {
//         resolve(data)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

module.exports = Test
