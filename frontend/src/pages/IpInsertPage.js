import React, {useRef, useContext, useState} from 'react'
import './IpInsertPage.css'
import InputMask from "react-input-mask";
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import FootballNavbar from '../components/Navbar/FootballNavbar';
import LodingText from '../components/Common/LodingText';

export default function IpInsertPage() {
  const { setIpV4, setPort, ipV4, portinput, setFirstCoord, firstCoord} = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const history = useHistory();
  const ipAddress = useRef();  
  const port = useRef();
  let ws = undefined;
  const ipChecker = async () => {     
    // await setIpV4(ipAddress.current.value.replace(/ /g, ''))
    // // console.log(portsubmit);
    // await setPort(port.current.value)

    if (ipV4) {
      if (portinput) {
          console.log(ipV4);
          console.log(portinput);
          setIsLoading(true)
          console.log('connecting....');
          if (ws === undefined) {
            ws = new WebSocket('ws://' + ipV4 + ':' + portinput + '/ws');
            let flag = true
            ws.onopen = () => {
              console.log('connected!!');
            ws.onmessage = async (message) => {
              console.log(message);              
              if (flag) {
                flag = false
                console.log('hi');
                setFirstCoord(message.data)     
                history.push('/teamregister')    
              }
            };
          };
            ws.onerror = () => {
              console.log('error..');
              setIsLoading(false)
              setIsError(true)
            }
          }
          // history.push('/teamregister')
          
          
      }else {
          alert('port번호를 입력해주세요')
          return
      }         
    
  }else {
      alert('노트북 IP를 입력해주세요')
      return
  }  
  }    
  return (
    <div>
      <FootballNavbar currentpage = 'ipinsert'></FootballNavbar>
      <div className= 'ipInsertCon'>
        {
          isLoading ?  <LodingText></LodingText> :
          <div>

            <h1 className='ipInsertTitle'>노트북 ip와 포트를 입력해주세요</h1>  
              <div>
                <div>    
                  <label className='ipfont'> IP : </label>
                    <InputMask
                    className= 'ipInput'
                    mask="999.999.9.99"
                    maskChar=" "
                    placeholder="xxx.xxx.x.xx"  
                    ref={ipAddress} 
                    onChange = {() => {
                      setIpV4(ipAddress.current.value.replace(/ /g, ''))
                    }}         
                    />      
                </div>
                <div>
                <label className='ipfont'> PORT : </label>
                  <InputMask
                      className= 'Port'
                      mask="9999"
                      maskChar=" "
                      placeholder="xxxx"  
                      ref={port}
                      onChange = {() => {
                        setPort(port.current.value);                
                      }}          
                      /> 
                </div>
              </div>
            <button className='ipButton' onClick={ipChecker}>완료</button>
            {
              isError ? 
              <div className='errorMessage'>                  
                CONNECTION ERROR!! CHECK IP and PORT  
              </div> : null
            }
            
          </div>
        }
        </div>
      </div>
  )
}