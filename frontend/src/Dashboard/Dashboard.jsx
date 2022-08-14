import React from 'react'
import { Routes,Route } from 'react-router-dom'
import CustomerShipments from './CustomerShipments'
const Dashboard = () => {
  return (
    <>
    {/* Here we include all dashboard routes that can be accessed if we are authenticated*/}
    <Routes>
        <Route path='/customer' element={<CustomerShipments/>}/>
    </Routes>
    </>
  )
}

export default Dashboard