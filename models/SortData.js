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

SortData.prototype.sortWCFlags = function (
  countriesData,
  worldCupCountriesArr
) {
  let flags = []
  for (const wcCountry of worldCupCountriesArr) {
    for (const country of countriesData) {
      if (country.name == "Russian Federation" && wcCountry == "Russia") {
        flags.push({ flag: country.flag, name: "Russia" })
      }
      if (country.name == "Iran (Islamic Republic of)" && wcCountry == "Iran") {
        flags.push({ flag: country.flag, name: "Iran" })
      }
      if (
        country.name == "Korea (Republic of)" &&
        wcCountry == "Korea Republic"
      ) {
        flags.push({ flag: country.flag, name: "Korea Republic" })
      }
      if (
        country.name ==
          "United Kingdom of Great Britain and Northern Ireland" &&
        wcCountry == "England"
      ) {
        flags.push({ flag: country.flag, name: "England" })
      }

      if (country.name == wcCountry) {
        flags.push(country)
      }
    }
  }
  return flags
}

SortData.prototype.mergeMatchesFlags = function (matches, flags) {
  let mergedArray = []
  for (const match of matches) {
    for (const flag of flags) {
      if (match.homeTeam.name == flag.name) {
        Object.assign(match.homeTeam, flag)
      }
      if (match.awayTeam.name == flag.name) {
        Object.assign(match.awayTeam, flag)
      }
    }
    mergedArray.push(match)
  }

  return mergedArray
}

module.exports = SortData
