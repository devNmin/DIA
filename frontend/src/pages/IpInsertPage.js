import React, {useRef} from 'react'
import './IpInsertPage.css'
import InputMask from "react-input-mask";




export default function IpInsertPage() {
  const ipAddress = useRef();  
  const ipChecker = () => {
    const ipsubmit = ipAddress.current.value;
    console.log(ipsubmit);
  }

    
  return (
    <div>
      <h1>노트북 ip를 입력해주세요</h1>
  
        <div>    
            <InputMask
            className= 'ipInput'
            mask="999.999.999.999"
            maskChar=" "
            placeholder="xxx.xxx.xxx.xxx"  
            ref={ipAddress}          
            />      
        </div>

       <button className='ipButton' onClick={ipChecker}>입력</button>
    </div>
  )
}
