import React, {useRef, useContext} from 'react'
import './IpInsertPage.css'
import InputMask from "react-input-mask";
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';



export default function IpInsertPage() {
  const { setIpV4 } = useContext(UserContext)
  const history = useHistory();
  const ipAddress = useRef();  
  const ipChecker = () => {
    const ipsubmit = ipAddress.current.value;
    console.log(ipsubmit);
    setIpV4(ipsubmit)
    history.push('/canvasTest')
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
