import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import fieldimg from '../../assets/futsalimg.jpeg'
import styles from './CurrentFieldComp.module.css'
import field122 from '../../assets/futsal122.png'
import field1121 from '../../assets/futsal1121.png'
import field1112 from '../../assets/futsal1112.png'

export default function CurrentFieldComp(props) {
    const [field, setField] = useState(fieldimg)
    useEffect(() => {
        if (props.curform === '122') {
            setField(field122 )            
        }else if (props.curform === '1121') {
            setField(field1121)
        }else if (props.curform === '1112') {
            setField(field1112)
        }
    })
  return (   
      <img className={styles.field} src= {field} alt="" />
  )
}
