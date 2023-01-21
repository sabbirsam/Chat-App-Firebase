import React from 'react'
import Navbar from "../components/Navbar"
import Search from "../components/Search"
import Chats from "../components/Chats"

const Sidebar = () => {
  return (
    <div className='caf_sidebar'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar