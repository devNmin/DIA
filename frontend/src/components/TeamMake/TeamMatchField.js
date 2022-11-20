import React, { useContext, useEffect, useState } from 'react'
import field_img from '../../assets/field_img.jpeg'
import styles from '../../pages/TeamRegister.module.css'
import UserContext from '../../context/UserContext'

export default function TeamMatchField() {    
    const {ourColor, theirColor, firstCoord, currentNum, setCurrentNum, matchTeam} =  useContext(UserContext)
    const [height, setHeight] = useState(0)
    const [weight, setWeight] = useState(0)
    // const [ourTeamCoord, setOurTeamCoord] = useState([])
    // const [theirTeamCoord, setTheirTeamCoord] = useState([]) 
    const [circleSize, setCircleSize] = useState(0)
    useEffect(() => {  
        let testwidth = document.querySelector('#leftux').clientWidth   
        setHeight(document.querySelector('#leftux').clientHeight)
        setWeight(document.querySelector('#leftux').clientWidth)
        // console.log(height);
        // console.log(weight);     
        // console.log(testwidth);
        // console.log(testheight);
        setCircleSize(testwidth * 0.05)         
       
    },[])
    // const basicX = 107.73 
    // const basicY = 10
  const playerClick = (usernum) => {
    setCurrentNum(usernum)   
  }
  
  

  return (
    <div className= {styles.myContainer}>    
      {/* <div>{firstCoord}</div>               */}
      {
        Object.keys(firstCoord).map((usernum) => {
            if (parseInt(usernum) < 6) {
                return (
                  <div key={usernum} style={{ 'position' : 'absolute' , 'top' : 107.73 + (height-20)*firstCoord[usernum][1]-0.5*(circleSize) ,                 
                  'left' :  (weight)*firstCoord[usernum][0]}}>
                    <div onClick={() => {playerClick(usernum)}}  className= {styles.circle} style ={{ 'width' : circleSize, 'height' : circleSize, 'backgroundColor' : ourColor,
                    'borderColor' : currentNum === usernum ? '#b3dc45' : null,
                    'border' : currentNum === usernum ? '0.5rem outset #b3dc45' : null,
                    }}>
                    </div>
                    <p style={{'fontSize' : circleSize*0.16, 'color' : 'white'}}>
                      {
                        matchTeam[parseInt(usernum)] ? matchTeam[parseInt(usernum)].userName : usernum
                      }
                      </p>                     
                  </div>                
                )
            }else {
                return (
                    <div key={usernum} className= {styles.theircircle} style ={{ 'width' : circleSize, 'height' : circleSize, 'backgroundColor' : theirColor,
                    'top' : 107.73 + (height-20)*firstCoord[usernum][1]-0.5*(circleSize) ,                 
                    'left' : (weight)*firstCoord[usernum][0],
                     }}>
                         <p style={{ 'fontSize' : circleSize*0.16}}>{usernum}</p>  
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
