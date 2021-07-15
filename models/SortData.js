function sortMatchesData(worldCupData) {
  return Object.entries(worldCupData.data.matches).map(([key, payload]) => {
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

function getWorldCupCountries(matchesData) {
  const filterTeams = matchesData
    .map(countryObj => {
      return Object.values(countryObj.homeTeam).join()
    })
    .filter((el, index, array) => {
      return array.indexOf(el) == index
    })
  return filterTeams
}

function sortWCFlags(countriesData, worldCupCountriesArr) {
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

function mergeMatchesFlags(matches, flags) {
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

exports.sortData = function (dataArr) {
  let matchesArr = sortMatchesData(dataArr[0]) // [{}] matches without flags ===
  let countriesArr = dataArr[1].data // [{}] all country flags and names ===
  let worldCupCountries = getWorldCupCountries(matchesArr) // [] arr of world cup countries ===
  let worldCupFlagsNames = sortWCFlags(countriesArr, worldCupCountries) // [{}] world cup countries flags and names
  let merged = mergeMatchesFlags(matchesArr, worldCupFlagsNames) // [{}] finished api model
  // return matchesArr
  // return countriesArr
  // return worldCupCountries
  // return worldCupFlagsNames
  return merged
}
