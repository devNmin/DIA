import React , {useState, useEffect, useContext} from 'react'
import './FootballNavbar.css'
import { useHistory, Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';

export default function FootballNavbar(props) {
    const {currentTeam, totalTeam} = useContext(UserContext)
    const history = useHistory();
    const currentpage2 = props.currentpage 
    let [currentCheck, setCurrentCheck] = useState(0)
    useEffect(() => {
        if (currentpage2 === "usersearch") {
            setCurrentCheck(1)        
        } else if (currentpage2 === "ipinsert") {
            setCurrentCheck(2)
        } else {
            setCurrentCheck(3)
        }
    })
    const goIpInsert = async () => {        
        for (let index = 0; index < totalTeam.length; index++) {
            const element = totalTeam[index];
            if (element === 0) {                
                alert('팀을 등록해주세요')
                window.ReactAlert.showToast('팀을 등록해주세요')                
                return
            }
        }
           
        history.push('/ipInsert')      
       
    }
    
    // const goTeammake = () => {
    //     history.push('/teammake')
    // }
    
    return (
    
      <nav className="container-fluid">
            <ul>
              <li className="main left" > 
                <Link to= "/teammake" style={{ 'textDecoration' : 'none'}}>
                    <span style={{ 'color' : (currentCheck === 1)? 'red': null}}>유저 등록하기</span>
                </Link> 
            </li>           
             
            <li className="main" > 
                <div to= "/ipInsert" onClick={() => {goIpInsert()}} style={{ 'textDecoration' : 'none'}}> 
                    <span style={{ 'color' : (currentCheck === 2)? 'red': null}}>IP 연결</span>
                </div> 
            </li>
              <li className="main"><span>팀 구성하기</span></li>               
            </ul>
        </nav>
    
  )
}
