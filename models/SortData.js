function matchesFilter(worldCupData) {
  return Object.entries(worldCupData.data.matches[0]).map(
    ([matches, payload]) => {
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
    }
  )
}

function flagsFilter(countryData) {
  return {
    flag: countryData.data[0].flag
  }
}

exports.sortData = function (rawData) {
  return [matchesFilter(rawData[0]), flagsFilter(rawData[1])]
}
