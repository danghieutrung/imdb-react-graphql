import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import SearchForm from "./components/SearchForm"
import SearchResults from "./components/SearchResults"
import Chart from "./components/Chart"

const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<SearchForm/>} />
          <Route path="/find" element={<SearchResults/>} />
          <Route path="/chart/:imdbID" element={<Chart />} />
        </Routes>
      </Router>
  )
}

export default App
