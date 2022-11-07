import React, { useState , useContext} from 'react'
import './UserSearch.css'
import FootballNavbar from '../Navbar/FootballNavbar'
import axios from '../../utils/axios'
import SearchedUser from './SearchedUser'
import { Scrollbars } from 'react-custom-scrollbars-2';
import UserContext from '../../context/UserContext'
import CurrentTeamComp from './CurrentTeamComp'
import CurrentFieldComp from './CurrentFieldComp'
import styles from '../../pages/AccountRegisterPage.module.css'



export default function UserSearch() {
  const {currentTeam, setCurrentTeam} = useContext(UserContext)
  const currentpage2 = "usersearch"
  const [username, setUsername] = useState('')
  const [searchedUserList, setSearchedUserList] = useState([])
  const [noResult, setNoResult] = useState(false)
  const [foramation, setFormation] = useState('basic')
  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post('search/user', {
      "name" : username
    }).then(
      res => {
        console.log(res.data);
        console.log(res.data.length);
        if (res.data.length) {
          setNoResult(false)
          setSearchedUserList(res.data)
        }else{
          setSearchedUserList([])
          setNoResult(true)
        }
        
      }
    )     
    console.log(username);
    setUsername('')
  } 

  const addPlayerToTeam = async (v) => {
    if (currentTeam.length) {
      await setCurrentTeam([...currentTeam, v])      
    }
    else {
      await setCurrentTeam([v])
    }
    setSearchedUserList((current) => 
      current.filter((searched) => searched.userId !== v.userId )
    )       
  }


  

  return (
    <div>
      <FootballNavbar currentpage = {currentpage2}></FootballNavbar>     
        {/* <div>
          유저 등록하기
        </div> */}
        <div className='entiresearch'>
          <div className='usersearch fadein'>
            <div className='playersearchbar' >
              <form onSubmit={(e)=> submitHandler(e)}>
              <input className='searchinput' onChange={(e) => setUsername(e.target.value)} type="search" placeholder='Search your teammate' value={username} />    
              </form> 
            </div>
            <hr style={{ 'color' : '#b3dc45'}} />
            <Scrollbars              
              autoHide
              // Hide delay in ms
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}>
              <div className='searchresults'>
                {searchedUserList.map((userInfo) => (
                <div key={userInfo.userId} onClick = {() => addPlayerToTeam(userInfo)}>
                  <SearchedUser  className='searchresult' user = {userInfo}></SearchedUser>
                  <br />              
                </div>        
                ))
                }
              </div>   
              <br />
              <br />           
            </Scrollbars>
            {noResult? 
              <h2>There aren't any users</h2>:
              null
            }
                            
          </div> 
            <div className='usersquad fadein'>
              <div className='squadtitle'>YOUR SQUAD</div>
              <hr />
              <div className='fieldContainer'>
                <CurrentFieldComp curform = {foramation}></CurrentFieldComp> 
                <div style={{ 'width' : '50%'  }}>
                  <div style={{ 'display' : 'flex',  'height' : '20%'}}>
                      <button className= {styles.EmailCheck} onClick = {()=> setFormation('122')} style ={{ 'marginLeft' : '20px', 'width' : '33%'}}>1-2-2</button>
                      <button className= {styles.EmailCheck} onClick = {()=> setFormation('1121')} style ={{ 'marginLeft' : '20px', 'width' : '33%'}}>1-1-2-1</button>
                      <button className= {styles.EmailCheck} onClick = {()=> setFormation('1112')} style ={{ 'marginLeft' : '20px', 'width' : '33%', 'marginRight': '15px'}}>1-1-1-2</button>
                  </div> 
                  <div>
                    Pivot
                  </div> 
                  <div>
                    Ala
                  </div> 
                  <div>
                    Fixo
                  </div>
                  <div>
                    Goalkeeper
                  </div>  
                </div>   
                                    
              </div>
                
                          
              <hr />
              <div className='squadBench' style={{ 'display' : 'flex', 'overflowX' : 'auto'}}>              
                {currentTeam.length?  currentTeam.map((playerInfo) => (
                  <div key = {playerInfo.userId}>
                    <CurrentTeamComp player = {playerInfo}></CurrentTeamComp>                    
                  </div>
                )                
                ) : null
                }              
              </div>  
            </div>  
        
        </div>         
                   
         
         
    </div>

  )
}
