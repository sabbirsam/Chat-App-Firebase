import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='caf_home'>
      <div className="caf_container">
          <Sidebar/>
          <Chat/>
      </div>
    </div>
  )
}

export default Home