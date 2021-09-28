/* Constructor - SortData merges both API JSON returns into one */
let SortData = function (resArray) {
  this.matchesArr = this.sortMatchesData(resArray[0].data.matches)
  this.countriesArr = resArray[1].data
  this.worldCupCountries = this.getWorldCupCountries(this.matchesArr)
  this.worldCupFlagsNames = this.sortWCFlags(
    this.countriesArr,
    this.worldCupCountries
  )
  this.data = this.mergeMatchesFlags(this.matchesArr, this.worldCupFlagsNames)
}

/* #1 
- Remove unwanted properties from matches data 
*/
SortData.prototype.sortMatchesData = function (worldCupData) {
  return Object.entries(worldCupData).map(([key, payload]) => {
    return {
      status: payload.status,
      stage: payload.stage,
      group: payload.group,
      date: payload.utcDate,
      homeTeam: {
        name: payload.homeTeam.name
      },
      awayTeam: {
        name: payload.awayTeam.name
      },
      winner: payload.score.winner,
      score: {
        homeTeam: payload.score.fullTime.homeTeam,
        awayTeam: payload.score.fullTime.awayTeam
      }
    }
  })
}

/* #2 
- Filter through world cup matches and return array of teams that participated 
*/
SortData.prototype.getWorldCupCountries = function (matchesData) {
  const filterTeams = matchesData
    .map(countryObj => {
      return Object.values(countryObj.homeTeam).join()
    })
    .filter((el, index, array) => {
      return array.indexOf(el) == index
    })
  return filterTeams
}

/* #3
- Loops through all world countries flags and names 
- Loops through array of participating countries
- Extracts country names and svg flag
*/
SortData.prototype.sortWCFlags = function (
  countriesData,
  worldCupCountriesArr
) {
  let flags = []
  for (const wcCountry of worldCupCountriesArr) {
    for (const country of countriesData) {
      if (country.name === "Russian Federation" && wcCountry === "Russia") {
        flags.push({ flag: country.flags.svg, name: "Russia" })
      }
      if (
        country.name === "Iran (Islamic Republic of)" &&
        wcCountry === "Iran"
      ) {
        flags.push({ flag: country.flags.svg, name: "Iran" })
      }
      if (
        country.name === "Korea (Republic of)" &&
        wcCountry === "Korea Republic"
      ) {
        flags.push({ flag: country.flags.svg, name: "Korea Republic" })
      }
      if (
        country.name ===
          "United Kingdom of Great Britain and Northern Ireland" &&
        wcCountry === "England"
      ) {
        flags.push({ flag: country.flags.svg, name: "England" })
      }

      flags.push({ flag: country.flags.svg, name: country.name })
    }
  }
  return flags
}

/* #4 
- Merges match objects (no flag) with flag objects
- This is returned to GetData.js 
*/
SortData.prototype.mergeMatchesFlags = function (matches, flags) {
  let mergedArray = []
  for (const match of matches) {
    for (const flag of flags) {
      if (match.homeTeam.name === flag.name) {
        Object.assign(match.homeTeam, flag)
      }
      if (match.awayTeam.name === flag.name) {
        Object.assign(match.awayTeam, flag)
      }
    }
    mergedArray.push(match)
  }
  return {
    matches: mergedArray
  }
}

module.exports = SortData
