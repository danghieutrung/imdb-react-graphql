import searchService from '../service/service'
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'
const SearchResults = () => {
  const navigate = useNavigate()

  const [results, setResults] = useState('')

  const search = new URLSearchParams(useLocation().search).get("q")
  useEffect(() => {
    searchService
    .GetSearchResults(search)
    .then(response => {
      setResults(response)
    })
  },[])

  const ShowChart = (event) => {
    event.preventDefault()
    const imdbID = event.target.attributes.value.value
    navigate(`/chart/${imdbID}`)
  }

  if (results==='') {
    return <div>Loading</div>
  } else if (results.length===0) {
    return <div>Not found any results with "${search}"</div>
  } else {
    return (
      <div>
        <ul>
          {results.map(result =>
            <li key={result.imdbID}>{result.imdbID} {result.originalTitle}<a href={`/results/${result.imdbID.trim()}`} value={result.imdbID.trim()} onClick={ShowChart}>Show</a></li>)}
        </ul>
      </div>
    )  
  }
}

export default SearchResults