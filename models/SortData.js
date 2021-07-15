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

function sortCountriesData(countryData) {
  return countryData.data
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

function getAllCountries(countriesData) {
  const filterCountries = countriesData.map(countryObj => {
    return countryObj.name
  })
  return filterCountries
}

function sorter(countriesData, worldCupCountriesArr) {
  let flags = []
  for (let i = 0; i < worldCupCountriesArr.length; i++) {
    for (let j = 0; j < countriesData.length; j++) {
      if (
        countriesData[j].name == "Russian Federation" &&
        worldCupCountriesArr[i] == "Russia"
      ) {
        flags.push({ flag: countriesData[j].flag, name: "Russia" })
      }
      if (
        countriesData[j].name == "Iran (Islamic Republic of)" &&
        worldCupCountriesArr[i] == "Iran"
      ) {
        flags.push({ flag: countriesData[j].flag, name: "Iran" })
      }
      if (
        countriesData[j].name == "Korea (Republic of)" &&
        worldCupCountriesArr[i] == "Korea Republic"
      ) {
        flags.push({ flag: countriesData[j].flag, name: "Korea Republic" })
      }
      if (
        countriesData[j].name ==
          "United Kingdom of Great Britain and Northern Ireland" &&
        worldCupCountriesArr[i] == "England"
      ) {
        flags.push({ flag: countriesData[j].flag, name: "England" })
      }

      if (countriesData[j].name == worldCupCountriesArr[i]) {
        flags.push(countriesData[j])
      }
    }
  }
  return flags
}

function matches(matches, flags) {
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
  let matchesArr = sortMatchesData(dataArr[0]) // [{}] matches without flags
  let countriesArr = sortCountriesData(dataArr[1]) // [{}] all country flags and names
  let worldCupCountries = getWorldCupCountries(matchesArr) // [] arr of world cup countries
  let allCountries = getAllCountries(countriesArr) // [] arr of all countries
  let sorted = sorter(countriesArr, worldCupCountries) // [{}] world cup countries flags and names
  let finished = matches(matchesArr, sorted)
  // return matchesArr
  // return countriesArr
  // return worldCupCountries
  // return allCountries
  // return sorted
  return finished
}
