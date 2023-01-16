import { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";

const SearchForm = () => {
  const [search, setSearch] = useState(null)

  const Search = (event) => {
    event.preventDefault()
    window.location.replace(`/find?q=${event.target[0].value}`)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={Search} className='search-form'>
          <input value={search} onChange={handleSearchChange} placeholder='Search IMDB-GraphQL' />
          <button type="submit"><AiOutlineSearch id='magnifying-glass-icon' /></button>
        </form>
      </div>
    </div>
  )
}

export default SearchForm