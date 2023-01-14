import axios from 'axios'
const baseUrl = 'http://localhost:5000/imdb'


const GetSearchResults = (search) => {
  const fields = 'originalTitle, averageRating, imdbID, startYear, __typename'
  const query = `{series:search(title:"${search}"types: SERIES){${fields}}}`
  const url = `${baseUrl}?query=${query}`
  const request = axios.get(url)
  return request.then(response => response.data.data.series)
}

const GetSeriesRatings = (imdbID) => {
  const fields = '{imdbID originalTitle startYear endYear averageRating episodes {originalTitle seasonNumber episodeNumber averageRating imdbID}}'
  const query = `{series(imdbID: "${imdbID}")${fields}}`
  const url = `${baseUrl}?query=${query}`
  const request = axios.get(url)
  return request.then(response => response.data.data.series)
}

const ModifyResults = (results) => {
  let currentSeason = '__'
  let data = {
    imdbID: results.imdbID,
    originalTitle: results.originalTitle,
    episodeTotal: results.episodes.length,
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
    data.ratings.at(-1).info.push([i+1, allEpisodesRatings[i].averageRating,allEpisodesRatings[i].originalTitle,allEpisodesRatings[i].imdbID,allEpisodesRatings[i].seasonNumber,allEpisodesRatings[i].episodeNumber])
  }
  return data
}

const regresssion = (data) => {
  const regressionLines = []
  const seasons = data.ratings
  for (let i = 0; i < seasons.length; i++) {
    const line = {
      season: seasons[i].season
    }
    const len = seasons[i].info.length
    const x = seasons[i].info.map(episode=>episode[0]).reduce((a,b)=>a+b,0)/len
    const y = seasons[i].info.map(episode=>episode[1]).reduce((a,b)=>a+b,0)/len
    const a = seasons[i].info.map(episode=>episode[0]*(episode[1]-y)).reduce((a,b)=>a+b,0)/(seasons[i].info.map(episode=>episode[0]*(episode[0]-x)).reduce((a,b)=>a+b,0)) 
    const b = y - a * x
    line.regression = [[seasons[i].info[0][0],a*seasons[i].info[0][0]+b],[seasons[i].info[len-1][0],a*seasons[i].info[len-1][0]+b]]
    regressionLines.push(line)
  }
  return regressionLines
}
export default { GetSearchResults, GetSeriesRatings, ModifyResults, regresssion }