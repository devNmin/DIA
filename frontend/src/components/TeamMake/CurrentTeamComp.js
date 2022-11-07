import React from 'react'
import sample from  '../../assets/card.png'
import styles from './CurrentTeam.module.css'

export default function CurrentTeamComp(props) {    
    const playerInfo = props.player
  return (
    <div className= {styles.playerInfoContainer}>
      <img className= {styles.playerImg} src= {sample} alt="" />
      <h5 className= {styles.userinfo}>{playerInfo.userName} {playerInfo.userPosition} </h5>     
    </div>
  )
}
