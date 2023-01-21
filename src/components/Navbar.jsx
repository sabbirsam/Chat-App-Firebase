import React from 'react'

const Navbar = () => {
  return (
    <div className='caf_navbar'>
      <span className="caf_logo">
        SABBIR SAM
      </span>
      <div className="caf_user">
        <img src="https://images.pexels.com/photos/14994190/pexels-photo-14994190.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
        <span>Sabbir</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar