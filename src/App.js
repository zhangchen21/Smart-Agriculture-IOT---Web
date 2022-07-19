import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Prediction from './pages/prediction/index'
import Portal from './pages/portal/index'
import DashBoard from './pages/dashBoard/index'
import GreenHouse from './pages/greenHouse/index'

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Navigate replace to="/portal" />} />
        <Route path="/prediction" element={ <Prediction/> } />
        <Route path="/portal" element={ <Portal/> } />
        <Route path="/dashBoard" element={ <DashBoard/> } />
        <Route path="/greenHouse" element={ <GreenHouse/> } />
      </Routes >
    </Router>
  )
}

export default App;
