import React, { useState } from 'react'
import './UserSearch.css'
import FootballNavbar from '../Navbar/FootballNavbar'
import axios from '../../utils/axios'
import SearchedUser from './SearchedUser'

export default function UserSearch() {
  const currentpage2 = "usersearch"
  const [username, setUsername] = useState('')
  const [searchedUserList, setSearchedUserList] = useState([
    {
      "userId": 1,
      "userEmail": "test1",
      "userName": "test",
      "userAge": 20,
      "authorities": [
        {
          "authorityName": "ROLE_USER"
        }
      ]
    },
    {
      "userId": 5,
      "userEmail": "test@test.com",
      "userName": "test",
      "userAge": 12,
      "authorities": [
        {
          "authorityName": "ROLE_USER"
        }
      ]
    },
    {
      "userId": 8,
      "userEmail": "test1@test.com",
      "userName": "test1",
      "userAge": 13,
      "authorities": [
        {
          "authorityName": "ROLE_USER"
        }
      ]
    }
  ])
  const submitHandler = (e) => {
    e.preventDefault()
    
    console.log(username);
    setUsername('')
  }

  

  return (
    <div>
      <FootballNavbar currentpage = {currentpage2}></FootballNavbar>
      <div>
        <div  className='fadein'>
          유저 등록하기
        </div>
        <form onSubmit={(e)=> submitHandler(e)}>
        <input onChange={(e) => setUsername(e.target.value)} type="search" placeholder='Search your teammate' value={username} />    
        </form>             
      </div>
      {searchedUserList.map((userInfo) => (
        <div key={userInfo.userId}>
          <SearchedUser key= {userInfo.userId} user = {userInfo}></SearchedUser>
          <h1>{userInfo.userEmail}</h1>
        </div>
      ))
      }
     
         
    </div>

  )
}
