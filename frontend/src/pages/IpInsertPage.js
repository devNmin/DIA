import React, {useRef, useContext} from 'react'
import './IpInsertPage.css'
import InputMask from "react-input-mask";
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';



export default function IpInsertPage() {
  const { setIpV4, setPort } = useContext(UserContext)
  const history = useHistory();
  const ipAddress = useRef();  
  const port = useRef();
  const ipChecker = () => {
    const ipsubmit = ipAddress.current.value.replace(/ /g, '');
    const portsubmit = port.current.value;
    console.log(ipsubmit);
    setIpV4(ipsubmit)
    console.log(portsubmit);
    setPort(portsubmit)
    history.push('/canvasTest')
  }    
  return (
    <div>
      <h1>노트북 ip와 포트를 입력해주세요</h1>  
        <div>    
          <label> IP </label>
            <InputMask
            className= 'ipInput'
            mask="999.999.999.999"
            maskChar=" "
            placeholder="xxx.xxx.xxx.xxx"  
            ref={ipAddress}          
            />      
        </div>
        <div>
        <label> PORT </label>
          <InputMask
              className= 'Port'
              mask="9999"
              maskChar=" "
              placeholder="xxxx"  
              ref={port}          
              /> 
        </div>
       <button className='ipButton' onClick={ipChecker}>입력</button>
    </div>
  )
}
