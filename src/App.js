import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Prediction from './pages/prediction/index'
import Portal from './pages/portal/index'
import DashBoard from './pages/dashBoard/index'
import GreenHouse from './pages/greenHouse/index'
import Illness from './pages/illness/index'
import { ResultHistory } from './pages/prediction/components/resultHistory/index'
import { PredictionArea } from './pages/prediction/components/predictionArea/index'
import { IllnessresultHistory } from './pages/illness/components/illnessresultHistory/index'

function App() {
  return (
    <Router>
      <Routes >
        <Route path="/" element={<Navigate replace to="/portal" />} />
        <Route path="/prediction" element={ <Prediction/> }>
          <Route path="" element={<PredictionArea />}></Route>
          <Route path="predictionArea" element={<PredictionArea />}></Route>
          <Route path="resultHistory" element={<ResultHistory />}></Route>
        </Route>
        <Route path="/portal" element={ <Portal/> } />
        <Route path="/illness" element={ <Illness/> }>
          <Route path="" element={<PredictionArea />}></Route>
          <Route path="illnessresultHistory" element={<IllnessresultHistory />}></Route>
          <Route path="illnesspredictionArea" element={<PredictionArea />}></Route>
        </Route>
        <Route path="/dashBoard" element={ <DashBoard/> } />
        <Route path="/greenHouse" element={ <GreenHouse/> } />
      </Routes >
    </Router>
  )
}

export default App;
