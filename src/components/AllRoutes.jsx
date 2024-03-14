import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AppxBudget from './AppxBudget'
import LiveBudget from './LiveBudget'
// import Navbar from './Navbar'
import HomePage from './HomePage'
import TravelDetails from './TravelDetails'
import TripDetail from './TripDetail'


const AllRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<HomePage />}> </Route>
          <Route path="/appxbudget" element={<AppxBudget />}></Route>
          <Route path="/livebudget" element={<LiveBudget />}></Route>
          <Route path="/traveldetail" element={<TravelDetails />}></Route>
          <Route path="/tripdetail/:id" element={<TripDetail />}></Route>
        
    </Routes>
  )
}

export default AllRoutes
