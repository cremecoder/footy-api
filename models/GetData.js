const fs = require("fs")
const axios = require("axios")
require("dotenv").config()
const SortData = require("./SortData")
const db = require("../matches.json") || null

let GetData = function () {
  this.apiData = null
  this.reqTeam = null
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

GetData.prototype.stringifyJSON = function () {
  return this.resolveApiData()
    .then(sortedData => {
      let strData = JSON.stringify(sortedData)
      this.apiData = strData
      return this.apiData
    })
    .catch(err => this.errors.push("Error: " + err))
}

GetData.prototype.createMatchesJSON = function () {
  return this.stringifyJSON()
    .then(strData => {
      fs.writeFileSync("matches.json", strData)
      this.created = true
      return this.created
    })
    .catch(err => this.errors.push("Error: " + err))
}

GetData.prototype.findTeam = function (reqTeam) {
  return new Promise((resolve, reject) => {
    if (!db.matches || !this.created) {
      this.errors.push("DB does not yet exist")
      reject(this.errors)
    }
    this.reqTeam = reqTeam
    const findMatches = db.matches.filter(match => {
      return (
        match.homeTeam.name === this.reqTeam ||
        match.awayTeam.name === this.reqTeam
      )
    })
    resolve(findMatches)
  })
}

module.exports = GetData
