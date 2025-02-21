// import React from 'react'
import Footer from "../components/Footer.jsx"
import Header from "../components/Header.jsx"
import Hero from "../components/Hero.jsx"
import SearchBar from "../components/SearchBar.jsx"
// import { Outlet } from "react-router-dom"


const Layout = ({children}) => {
  return (
    <div className='flex flex-col min-h-screen'> 
       <Header />
       <Hero />
       <div className="container mx-auto"> <SearchBar /> 
       </div>
       <div className="container mx-auto py-10 flex-1">{children}</div>      
       <Footer />
    </div>
  )
}

export default Layout
