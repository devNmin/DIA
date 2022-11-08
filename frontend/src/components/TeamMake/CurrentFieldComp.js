import React from 'react'
import fieldimg from '../../assets/futsalimg.jpeg'
import styles from './CurrentFieldComp.module.css'

export default function CurrentFieldComp() {
  return (   
      <img className={styles.field} src= {fieldimg} alt="" />
  )
}
