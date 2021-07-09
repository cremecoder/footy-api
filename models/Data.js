const axios = require("axios")
require("dotenv").config()
const SortData = require("./SortData")

function getData(country) {
  const resOne = axios.get(
    "http://api.football-data.org/v2/competitions/WC/matches",
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN,
        "Content-Type": "application/JSON; charset=utf-8"
      }
    }
  )
  const resTwo = axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
  return Promise.all([resOne, resTwo])
}

exports.resolveData = function (country) {
  return getData(country)
    .then(resArr => {
      return SortData.sortData(resArr)
    })
    .catch(err => console.log(err))
}
