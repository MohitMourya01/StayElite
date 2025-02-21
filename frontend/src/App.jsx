import { useState } from 'react'
import './App.css'
import Layout from './layouts/Layout.jsx'
import { Route,BrowserRouter as Router, Navigate, Routes } from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import AddHotel from './pages/AddHotel.jsx'
import {useAppContext} from './contexts/AppContext.jsx'
import MyHotels from './pages/MyHotels.jsx'
import EditHotel from './pages/EditHotel.jsx'
import Search from './pages/Search.jsx'
import Details from './pages/Details.jsx'
import Booking from './pages/Booking.jsx'
import MyBookings from './pages/MyBookings.jsx'
import Home from './pages/Home.jsx'

function App() {

  const {isLoggedIn} = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path='/' element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route
          path='/search'
          element={
            <Layout> 
              <Search />
            </Layout>
          }
        /> 

        <Route
          path='/detail/:hotelId'
          element={
            <Layout> 
              <Details />
            </Layout>
          }
        /> 

        <Route path = "/register" element = {
          <Layout>
            <Register /> 
          </Layout>
          
        } />
        <Route path="/login" element = {
          <Layout>
            <Login />
          </Layout>
        } />

        {isLoggedIn && <>

          <Route
          path = "/hotels/:hotelId/bookings"
          element = {
            <Layout>
              <Booking />
            </Layout>
          }
          />    

          <Route
          path = "/add-hotel"
          element = {
            <Layout>
              <AddHotel />
            </Layout>
          }
          />            
    
          <Route 
           path='/my-hotels'
           element={
            <Layout>
              <MyHotels />
            </Layout>
           }
          />

          <Route 
           path='/my-bookings'
           element={
            <Layout>
              <MyBookings />
            </Layout>
           }
          />
           
          <Route 
           path='/edit-hotel/:hotelId'
           element={
            <Layout>
              <EditHotel />
            </Layout>
           }
          />

          

        </>}

        
        <Route path='*' element={<Navigate to='/' /> } />
      </Routes>
      
    </Router>
  )
}

export default App
