import React, { useContext, useEffect, useState } from 'react'
import field_img from '../../assets/field_img.jpeg'
import styles from '../../pages/TeamRegister.module.css'
import UserContext from '../../context/UserContext'

export default function TeamMatchField() {
    const dummies = {"0": [0.09574468085106383, 0.5], "1": [0.22127659574468084, 0.6334586466165414], "2": [0.44148936170212766, 0.20488721804511278], "3": [0.2531914893617021, 0.40789473684210525], "4": [0.3606382978723404, 0.4191729323308271], "5": [0.47925531914893615, 0.6560150375939849], "6": [0.752127659574468, 0.41729323308270677], "7": [0.7946808510638298, 0.6428571428571429], "8": [0.601063829787234, 0.2631578947368421], "9": [0.6031914893617021, 0.7857142857142857], "10": [0.9223404255319149, 0.5075187969924813], "11": [0.6063829787234043, 0.7650375939849624]}
    const {ourColor, theirColor, firstCoord, ourTeamCoord, setOurTeamCoord} =  useContext(UserContext)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)

    // const [ourTeamCoord, setOurTeamCoord] = useState([])
    // const [theirTeamCoord, setTheirTeamCoord] = useState([]) 
    const [circleSize, setCircleSize] = useState(0)
    useEffect(() => {  
        let testwidth = document.querySelector('#leftux').clientWidth   
        setHeight(document.querySelector('#leftux').clientHeight)
        setWeight(document.querySelector('#leftux').clientWidth)
        console.log(height);
        console.log(weight);     
        // console.log(testwidth);
        // console.log(testheight);
        setCircleSize(testwidth * 0.05)    
       
    },[])
    // const basicX = 107.73 
    // const basicY = 10
  const playerClick = (usernum) => {
    console.log(usernum);
  }     

  return (
    <div className= {styles.myContainer}>           
      {
        Object.keys(dummies).map((usernum) => {
            if (parseInt(usernum) < 6) {
                return (                
                <div onClick={() => {playerClick(usernum)}} key={usernum} className= {styles.circle} style ={{ 'width' : circleSize, 'height' : circleSize, 'backgroundColor' : ourColor,
                 'top' : 107.73 + (height-20)*dummies[usernum][1]-0.5*(circleSize) ,                 
                 'left' :  (weight)*dummies[usernum][0]}}>
                  <p style={{ 'fontSize' : circleSize*0.1}}>HOME  {usernum}</p>                     
                </div>
                )
            }else {
                return (
                    <div key={usernum} className= {styles.theircircle} style ={{ 'width' : circleSize, 'height' : circleSize, 'backgroundColor' : theirColor,'top' : 107.73 + (height-20)*dummies[usernum][1]-0.5*(circleSize) ,                 
                    'left' : (weight)*dummies[usernum][0]}}>
                         <p style={{ 'fontSize' : circleSize*0.1}}>AWAY {usernum}</p>  
                    </div>

                )
            }
            
        }  )
      }
      <img src= {field_img} className = {styles.fieldImg} alt="" />
    </div>
  )
}
