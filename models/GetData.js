const fs = require("fs")
const axios = require("axios")
require("dotenv").config()
const SortData = require("./SortData")
const { match } = require("assert")

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
    if (this.apiData.length) {
      this.teamMatches = this.apiData.filter(match => {
        return match.homeTeam.name == team || match.awayTeam.name == team
      })
      resolve(this.teamMatches)
    }
    this.errors.push("No matches")
    reject(this.errors)
  })
}

module.exports = GetData
