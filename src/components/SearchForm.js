import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchForm = () => {
  const [search, setSearch] = useState('')

  const navigate = useNavigate()

  const Search = (event) => {
    event.preventDefault()
    navigate(`/find?q=${event.target[0].value}`)
  }
  
  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <form onSubmit={Search}>
        <div>name: <input value={search} onChange={handleSearchChange}/></div>
        <div><button type="submit">search</button></div>
      </form>
    </div>
  )
}

export default SearchForm