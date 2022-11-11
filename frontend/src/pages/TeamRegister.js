import React ,{useContext } from 'react'
import FootballNavbar from '../components/Navbar/FootballNavbar'
import UserContext from '../context/UserContext';
import styles from './TeamRegister.module.css'
import { useHistory } from 'react-router-dom';

export default function TeamRegister() {
  const {ourColor, setOurColor, theirColor, setTheirColor, ipV4, portinput, firstCoord} = useContext(UserContext) 
  const history = useHistory();
  const goToCanvas = () => {
    history.push('/canvasTest')
  }

  return (
    <div>
        <FootballNavbar currentpage = 'teamregister'></FootballNavbar> 
        <div>{ipV4}</div>
        <div>{portinput}</div>  
        <div>{firstCoord}</div>
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
          <button onClick={() => {goToCanvas()}}>Go to Canvas</button>   

        </div>
        
    </div>
  )
}
