const fs = require("fs")
const axios = require("axios")
const SortData = require("./SortData")

/* Constructor */
let GetData = function () {
  this.apiData = {}
  this.teamMatches = {}
  this.created = false
  this.errors = []
}

/* #1
- Fetches API's 
*/
GetData.prototype.getApiData = function () {
  const resMatches = axios.get(
    "http://api.football-data.org/v2/competitions/WC/matches",
    {
      headers: {
        "X-Auth-Token": process.env.XAUTHTOKEN,
        "Content-Type": "application/JSON; charset=utf-8"
      }
    }
  )
  const resCountries = axios.get(
    "https://restcountries.com/v2/all?fields=name,flags"
  )
  return Promise.all([resMatches, resCountries])
}

/* #2
- Passes API promise to SortData 
*/
GetData.prototype.resolveApiData = function () {
  return this.getApiData()
    .then(resArr => {
      let sortedData = new SortData(resArr)
      this.apiData = sortedData.data
      return this.apiData
    })
    .catch(err => this.errors.push("Error: " + err))
}

/* #3
- When data is sorted, creates matches2.json which is the database
- Returns boolean to client 
*/
GetData.prototype.createMatchesJSON = function () {
  return this.resolveApiData()
    .then(sortedData => {
      let strData = JSON.stringify(sortedData)
      return fs.writeFileSync("./data/matches2.json", strData)
    })
    .then(() => {
      this.created = true
      return this.created
    })
    .catch(err => this.errors.push("Error: " + err))
}

/* #4 
- Handles POST req from client, returns JSON object 
*/
GetData.prototype.findTeam = function (team) {
  return new Promise((resolve, reject) => {
    this.apiData = require("../data/matches2.json")
    let regExp = new RegExp(team, "gi")
    this.teamMatches = this.apiData.matches.filter(match => {
      return (
        regExp.test(match.homeTeam.name) || regExp.test(match.awayTeam.name)
      )
    })
    resolve(this.teamMatches)
    this.errors.push("No matches")
    reject(this.errors)
  })
}

module.exports = GetData
