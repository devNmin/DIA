import React ,{useContext, useState } from 'react'
import FootballNavbar from '../components/Navbar/FootballNavbar'
import UserContext from '../context/UserContext';
import styles from './TeamRegister.module.css'

export default function TeamRegister() {
  const {ourColor, setOurColor, theirColor, setTheirColor} = useContext(UserContext) 
  const testColor = (e) => {
    console.log(e);
  }

  return (
    <div>
        <FootballNavbar currentpage = 'teamregister'></FootballNavbar>   
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
            HI
          </div>   

        </div>
        
    </div>
  )
}
