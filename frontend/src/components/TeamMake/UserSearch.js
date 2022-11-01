import React from 'react'
import './UserSearch.css'
import FootballNavbar from '../Navbar/FootballNavbar'

export default function UserSearch() {
  const currentpage = "usersearch"
  return (
    <div>
      <FootballNavbar currentpage = {currentpage}></FootballNavbar>
      <div  className='fadein'>
        유저 등록하기
      </div>      
       
          
    </div>

  )
}
