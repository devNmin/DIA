import React , {useState, useEffect} from 'react'
import './FootballNavbar.css'
import { useHistory } from 'react-router-dom';

export default function FootballNavbar(props) {
    const history = useHistory();
    const currentpage2 = props.currentpage
    console.log(currentpage2);
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
    const goIpInsert = () => {
        history.push('/ipInsert')
    }
    const goTeammake = () => {
        history.push('/teammake')
    }
    
    return (
    <div>
      <nav className="container-fluid">
            <ul>
              <li className="main left" onClick={() => goTeammake()} ><span style={{ 'color' : (currentCheck === 1)? 'red': null}}>유저 등록하기</span></li>              
              <li className="main" onClick={() => goIpInsert()} ><span style={{ 'color' : (currentCheck === 2)? 'red': null}}>IP 연결</span></li>
              <li className="main"><span>팀 구성하기</span></li>               
            </ul>
        </nav>
    </div>
  )
}
