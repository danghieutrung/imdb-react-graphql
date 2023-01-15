import axios from 'axios'

const baseUrl = 'http://localhost:5000/imdb'

const getSearchResults = (search) => {
  const fields = 'originalTitle, averageRating, imdbID, startYear, __typename'
  const query = `{series:search(title:"${search}"types: SERIES){${fields}}}`
  const url = `${baseUrl}?query=${query}`
  const request = axios.get(url)
  return request.then(response => response.data.data.series)
}

const getSeriesRatings = (imdbID) => {
  const fields = '{imdbID originalTitle startYear endYear totalSeasons averageRating episodes {originalTitle seasonNumber episodeNumber averageRating imdbID}}'
  const query = `{series(imdbID: "${imdbID}")${fields}}`
  const url = `${baseUrl}?query=${query}`
  const request = axios.get(url)
  return request.then(response => response.data.data.series)
}

const modifyResults = (results) => {
  let currentSeason = null
  let data = {
    startYear: results.startYear,
    endYear: results.endYear,
    imdbID: results.imdbID,
    originalTitle: results.originalTitle,
    totalEpisodes: results.episodes.length,
    totalSeasons: results.totalSeasons,
    ratings: []
  }
  const allEpisodesRatings = results.episodes
  for (let i = 0; i < allEpisodesRatings.length; i++) {
    if (allEpisodesRatings[i].seasonNumber !== currentSeason) {
      currentSeason = allEpisodesRatings[i].seasonNumber
      data.ratings.push({
        season: currentSeason,
        info: [] //x,y,title,imdbID,season,episode
      })
    }
    data.ratings.at(-1).info.push([i + 1, allEpisodesRatings[i].averageRating, allEpisodesRatings[i].originalTitle, allEpisodesRatings[i].imdbID, allEpisodesRatings[i].seasonNumber, allEpisodesRatings[i].episodeNumber])
  }
  return data
}

export default { getSearchResults, getSeriesRatings, modifyResults }
