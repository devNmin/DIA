import React, { useContext } from 'react'
import sample from  '../../assets/card.png'
import styles from './CurrentTeam.module.css'
import UserContext from '../../context/UserContext'

export default function CurrentTeamComp(props) {  
    const {registerPlayer} =  useContext(UserContext)
    const playerInfo = props.player   
     
  return (
    <div className= {styles.playerInfoContainer}>
      <img onClick ={() => {
        props.delete?
        props.putPositions(playerInfo) : registerPlayer(playerInfo);}} className= {styles.playerImg} src= {sample} alt="" />
      <h5 className= {styles.userinfo}>{playerInfo.userName} {playerInfo.userPosition} </h5>  
      <div>
        {
          props.delete? 
          <button onClick={() => {props.removeCurrentTeam(props.player)}} className= {styles.deletebtn}>DELETE</button>   
          : null
        }
        
      </div>
    </div>
  )
}
