import React ,{useContext } from 'react'
import FootballNavbar from '../components/Navbar/FootballNavbar'
import UserContext from '../context/UserContext';
import styles from './TeamRegister.module.css'
import { useHistory } from 'react-router-dom';
import TeamMatchField from '../components/TeamMake/TeamMatchField';
import SearchedUser from '../components/TeamMake/SearchedUser';

export default function TeamRegister() {
  const {ourColor, setOurColor, theirColor, setTheirColor, ipV4, portinput, firstCoord, pivot, ala, fixo, goalkeeper, currentTeam} = useContext(UserContext) 
  // let test = document.body.clientWidth 
  // let test = document.querySelector('#leftux').clientWidth 
  // console.log(test);
  // let result = document.querySelector('.result')
  // console.log(test.style.width);
  const history = useHistory();
  const goToCanvas = () => {
    history.push('/canvasTest')
  }
   return (
    <div>
        <FootballNavbar currentpage = 'teamregister'></FootballNavbar> 
        {/* <div>{ipV4}</div>
        <div>{portinput}</div>   */}
        {/* <div>{firstCoord}</div> */}
        
        <div className= {styles.totalUx}>
          <div className= {styles.leftUx} id = 'leftux'>  
            <TeamMatchField></TeamMatchField>                
          </div>
          <div className= {styles.rightUx}>
            <div className={styles.teamColorCon}>
              <div className= {styles.teamText}>
                <p className = {styles.colorTitle}> Home Team Color :  </p>
                <input type= 'color'
                className= {styles.colorInput}
                value= {ourColor}
                onChange={(e) => setOurColor(e.target.value)}          
                />     
              </div>
              <div className= {styles.teamText}>
              <p className = {styles.colorTitle}> Away Team Color  : </p>
                <input type= "color"
                className= {styles.colorInput}
                value= {theirColor}
                onChange={(e) => setTheirColor(e.target.value)}          
                />     
              </div>
            </div>
            <div className= {styles.startingCon}>
              <div className= {styles.startingTitle}>
                STARTING MEMBERS
              </div>
             
              {
                pivot.map((fwplayer) => {
                  return (
                    <div key={fwplayer.userId} onClick = {() => console.log(fwplayer)}>
                      <SearchedUser color = 'red' className='searchresult' user = {fwplayer}></SearchedUser>
                      <br />              
                    </div>  
                  )
                })
              }
              {
                ala.map((mfplayer) => {
                  return (
                    <div key={mfplayer.userId} onClick = {() => console.log(mfplayer)}>
                      <SearchedUser color = 'green' className='searchresult' user = {mfplayer}></SearchedUser>
                      <br />              
                    </div> 
                  )
                })
              }
              {
                fixo.map(dfplayer => {
                  return (
                    <div key={dfplayer.userId} onClick = {() => console.log(dfplayer)}>
                      <SearchedUser color = 'blue' className='searchresult' user = {dfplayer}></SearchedUser>
                      <br />              
                    </div> 
                  )
                }) 
              }
              {
                goalkeeper.map(goal => {
                  return (
                    <div key={goal.userId} onClick = {() => console.log(goal)}>
                      <SearchedUser color = 'yellow' className='searchresult' user = {goal}></SearchedUser>
                      <br />              
                    </div> 
                  )
                })
              }
            </div>

          </div>
        </div>
        <div className= {styles.subsitute}>
            <div className= {styles.subsitutemem}>
              <div className= {styles.subsituteTitle}>
                SUBSITUTE MEMBERS
              </div>
            </div>

            <button className= {styles.gotoCanvas} onClick={() => {goToCanvas()}}>Go to Canvas</button>  
        </div>
        
    </div>
  )
}
