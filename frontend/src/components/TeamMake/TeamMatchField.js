import React, { useContext, useEffect, useState } from 'react'
import field_img from '../../assets/field_img.jpeg'
import styles from '../../pages/TeamRegister.module.css'
import UserContext from '../../context/UserContext'

export default function TeamMatchField() {    
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
      {/* <div>{firstCoord}</div>               */}
      {
        Object.keys(firstCoord).map((usernum) => {
            if (parseInt(usernum) < 6) {
                return (                
                <div onClick={() => {playerClick(usernum)}} key={usernum} className= {styles.circle} style ={{ 'width' : circleSize, 'height' : circleSize, 'backgroundColor' : ourColor,
                 'top' : 107.73 + (height-20)*firstCoord[usernum][1]-0.5*(circleSize) ,                 
                 'left' :  (weight)*firstCoord[usernum][0]}}>
                  <p style={{ 'fontSize' : circleSize*0.16}}>HOME  {usernum}</p>                     
                </div>
                )
            }else {
                return (
                    <div key={usernum} className= {styles.theircircle} style ={{ 'width' : circleSize, 'height' : circleSize, 'backgroundColor' : theirColor,
                    'top' : 107.73 + (height-20)*firstCoord[usernum][1]-0.5*(circleSize) ,                 
                    'left' : (weight)*firstCoord[usernum][0]}}>
                         <p style={{ 'fontSize' : circleSize*0.16}}>AWAY {usernum}</p>  
                    </div>

                )
            }
            
        }  )
      }
      {/* <div>
        {firstCoord[1]}
        HI
      </div> */}
      <img src= {field_img} className = {styles.fieldImg} alt="" />
    </div>
  )
}
