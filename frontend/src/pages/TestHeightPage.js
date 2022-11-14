import React, {useContext, useState} from 'react'
import UserContext from '../context/UserContext'

export default function TestHeightPage() {
    const {portinput, ipV4} =  useContext(UserContext)
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
  
    const heightHandler = (e) => {
        setHeight(e.target.value)
    }
    const weightHandler = (e) => {
        setWeight(e.target.value)
    }    
  return (
    <div >
        <div>
          {portinput}
        </div>
        <div>
          {ipV4}
        </div>
         <form name="bmiForm">
        <div className="bmi-calculator fadeout">
          <h1 style={{marginBottom: '1em'}}>Calculate your BMI</h1>
          <div className="bmi-calculator-weight">
            <input className="weight-slider" name="realweight" id="myWeight" onChange={(e) => {weightHandler(e)}} type="range" min={40} max={120} defaultValue={60} />
            <p style={{marginTop: '1.8em'}}>
              WEIGHT: {weight}            
              <span id="weight" /> kg
            </p>
          </div>
          <div className="bmi-calculator-height">
            <input className="height-slider" name="realheight" id="myHeight" onChange={(e)=>{heightHandler(e)}}  type="range" min={120} max={210} defaultValue={160} />
            <p style={{marginTop: '1.8em'}}>
              HEIGHT: {height}              
              <span id="height" /> cm
            </p>
          </div>
          <input className="gumb" type="button" defaultValue="Calculate" onclick="calculateBmi()" style={{marginTop: '0.5em'}} />
          <p style={{marginTop: '1em', fontSize: '1.2em'}}>
            <strong>Your BMI:</strong>
            <span id="yourbmi" style={{fontSize: '1.2em', marginLeft: '8px'}} />
          </p>
          <p />
          <p>
            <span id="evaluationMessage" />
          </p>
        </div>
      </form>
      
    </div>
  )
}
