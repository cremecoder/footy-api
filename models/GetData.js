const fs = require("fs")
const axios = require("axios")
const SortData = require("./SortData")

let GetData = function () {
  this.apiData = {}
  this.teamMatches = {}
  this.created = false
  this.errors = []
}

GetData.prototype.getApiData = function () {
  const resMatches = axios.get(
    "http://api.football-data.org/v2/competitions/WC/matches",
    {
      headers: {
        "X-Auth-Token": "ec8536c1e05544e284af76ed65c56c22",
        "Content-Type": "application/JSON; charset=utf-8"
      }
    }
  )
  const resCountries = axios.get(
    `https://restcountries.eu/rest/v2/all?fields=name;flag`
  )
  return Promise.all([resMatches, resCountries])
}

GetData.prototype.resolveApiData = function () {
  return this.getApiData()
    .then(resArr => {
      let sortedData = new SortData(resArr)
      this.apiData = sortedData.data
      return this.apiData
    })
    .catch(err => this.errors.push("Error: " + err))
}

GetData.prototype.createMatchesJSON = function () {
  return this.resolveApiData()
    .then(sortedData => {
      let strData = JSON.stringify(sortedData)
      return fs.writeFileSync("./data/matches.json", strData)
    })
    .then(() => {
      this.created = true
      return this.created
    })
    .catch(err => this.errors.push("Error: " + err))
}

GetData.prototype.findTeam = async function (team) {
  return new Promise((resolve, reject) => {
    this.apiData = require("../data/matches.json")
    this.teamMatches = this.apiData.matches.filter(match => {
      return (
        match.homeTeam.name.toLowerCase() == team ||
        match.awayTeam.name.toLowerCase() == team
      )
    })
    resolve(this.teamMatches)
    this.errors.push("No matches")
    reject(this.errors)
  })
}

module.exports = GetData
