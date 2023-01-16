import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom"
import SearchResults from "./components/SearchResults"
import Chart from "./components/Chart"
import Home from "./components/Home"
import NotFound from "./components/NotFoundURL"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find" element={<SearchResults />} />
        <Route path="/chart/:imdbID" element={<Chart />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
