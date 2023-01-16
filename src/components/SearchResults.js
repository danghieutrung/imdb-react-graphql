import searchService from '../service/service'
import { useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react'
import SearchForm from './SearchForm';

const SearchResults = () => {
  const navigate = useNavigate()

  const [results, setResults] = useState('')

  const search = new URLSearchParams(useLocation().search).get("q")
  useEffect(() => {
    searchService
      .getSearchResults(search)
      .then(response => {
        setResults(response)
      })
  }, [])

  if (results === '') {
    return <div>Loading</div>
  } else if (results.length === 0) {
    return (<div>
      <SearchForm />
      <h1>Not found any results with "{search}"</h1>
    </div>)
  } else {
    return (
      <div>
        <SearchForm />
        <h1 id='search-results-heading'>Search "{search}"</h1>
        <ul>
          {results.map(result =>
            <div>
              <li key={result.imdbID}><a href={`/chart/${result.imdbID.trim()}`} value={result.imdbID.trim()}><b>{result.originalTitle}</b></a></li>
              {(result.startYear === result.endYear || result.endYear === null)
                ? <li>{result.startYear}</li>
                : <li>{result.startYear}-{result.endYear}</li>}
              <li>Rating: {result.averageRating}</li>
            </div>
          )}
        </ul>
      </div>
    )
  }
}

export default SearchResults