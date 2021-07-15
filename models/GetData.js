// const fs = require("fs")
const axios = require("axios")
require("dotenv").config()
const { sortData } = require("./SortData")

function getApiData() {
  const resMatches = axios.get(
    "http://api.football-data.org/v2/competitions/WC/matches",
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
        "Content-Type": "application/JSON; charset=utf-8"
      }
    }
  )
  const resCountries = axios.get(
    `https://restcountries.eu/rest/v2/all?fields=name;flag`
  )
  return Promise.all([resMatches, resCountries])
}

exports.resolveApiData = function () {
  return getApiData()
    .then(resArr => {
      return sortData(resArr)
    })
    .catch(err => console.log(err))
}

// exports.query = function (country) {
//   return new Promise((resolve, reject) => {
//     fs.readFileSync
//   })
// }
