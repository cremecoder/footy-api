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
  return countryData.data // all countries and names
}

// World Cup Countries
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

// All Countries
// function getAllCountries(countriesData) {
//   const filterCountries = countriesData.map(countryObj => {
//     return countryObj.name
//   })
//   return filterCountries
// }

// [
//   "Russia", as "Russian Federation"
//   "Iran", as "Iran (Islamic Republic of)"
//   "Korea Republic", as "Korea (Republic of)"
//   "England", as "United Kingdom of Great Britain and Northern Ireland"
// ]

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

      if (countriesData[j].name == worldCupCountriesArr[i]) {
        flags.push(countriesData[j])
      }
    }
  }
  return flags.length
}

exports.sortData = function (dataArr) {
  let matchesArr = sortMatchesData(dataArr[0])
  let countriesArr = sortCountriesData(dataArr[1])
  let worldCupCountries = getWorldCupCountries(matchesArr)
  // let allCountries = getAllCountries(countriesArr)
  let sorted = sorter(countriesArr, worldCupCountries)
  return matchesArr
  // return countriesArr
  // return worldCupCountries
  // return allCountries
  // return sorted
}
