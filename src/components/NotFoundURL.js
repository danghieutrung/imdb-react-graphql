import SearchForm from "./SearchForm"

const NotFoundURL = () => {
  return (
    <div>
      <SearchForm />
      <h1>404 Error: Not found URL</h1>
      <a href='/'>Go to the Home Page >></a>
    </div>
  )
}

export default NotFoundURL