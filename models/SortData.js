function matchesFilter(worldCupData) {
  return Object.entries(worldCupData.data.matches).map(([matches, payload]) => {
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

function flagsFilter(countryData) {
  return {
    flags: countryData.data // all country flags and names
  }
}

exports.sortData = function (rawData) {
  let matchesArr = matchesFilter(rawData[0])
  let flagsArr = flagsFilter(rawData[1])
  return [matchesArr, flagsArr]
}
