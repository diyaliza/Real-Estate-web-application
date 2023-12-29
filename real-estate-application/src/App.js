import Home from './components/Home'
import Login from "./components/Login"
import Signup from "./components/Signup"
import ListingDetail from './components/listingDetail'

import {BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App(){
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/" element = {<Login />} />
          <Route path ="/signup" element = {<Signup />} />
          <Route path ="/home" element = {<Home />} />
          <Route path ="/listing/:listingId" element = {<ListingDetail />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App