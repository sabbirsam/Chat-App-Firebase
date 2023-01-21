import React from 'react'

const Search = () => {
  return (
    <div className='caf_search'>
      <div className="caf_searchForm">
        <input type="text" placeholder='Find a user'/>
      </div>
      <div className="caf_userChat">
          <img src="https://images.pexels.com/photos/12461870/pexels-photo-12461870.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
          <div className="caf_userChatInfo">
            <span>Jane</span>
          </div>
      </div>
    </div>
  )
}

export default Search