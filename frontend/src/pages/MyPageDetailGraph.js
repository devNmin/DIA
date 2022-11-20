import React, {useEffect, useState, useContext} from 'react';
import DataGraphDetail from '../components/MyPage/DataGraphDetail';
import BotNavbar from '../components/Navbar/BotNavbar';
import axios from '../utils/axios';
import HeatMap from '../components/MyPage/HeatMap';
import AuthContext from '../context/AuthContext';
import styles from './MyPageDetailGraph.module.css';
import TopNavbar from '../components/Navbar/TopNavbar';

function MyPageDetailGraph(props) {
  const { BASE_URL } = useContext(AuthContext)
  const gameId  = props.match.params.id;

  const [userGameData, setUserGameData] = useState({
    userAttack: 1,
    userDefence:2,
    userDistance: 2,
    userGameId: 2,
    userGoal: 2,
    userHeart: 2,
    userHeatmap: "2",
    userMaxSpeed: 2,
    userPass: 2,
    userPosition: "2",
    userSave: 2,
    userSpeed: 2,
    userSprint: 2,
    userStamina: 2,
    userPhysical:2
  });
  useEffect(() => {
    MyGameDataHandler();
    
  }, []);
  
  // const data = []
  const MyGameDataHandler = async (e) => {
    await axios.get(BASE_URL + `usergame/info/${gameId}`)
    // await axios.get(`http://localhost:8081/api/v1/usergame/info/${gameId}/2`)
    .then(res => {     
        // console.log(res.data)
        setUserGameData(res.data)
    }).catch(err => {
      console.log("eee")
    })
  }

  const data = [
    {
      "id": "능력치",
      "color": "hsl(342, 70%, 50%)",
      "data": [
        {
          "x": "sta",
          "y": userGameData.userStamina
        },
        {
          "x": "spe",
          "y": userGameData.userSpeed
        },
        {
          "x": "att",
          "y": userGameData.userAttack
        },
        {
          "x": "def",
          "y": userGameData.userDefence
        },
        {
          "x": "dis",
          "y": userGameData.userDistance
        },
        {
          "x": "phy",
          "y": userGameData.userPhysical
        },
      ]
    },
  ]
  return (
    <>
      <div className={styles.body}>
        <TopNavbar />
        <DataGraphDetail className={styles.data_graph_detail} data={data} />
        <HeatMap data={gameId}/>
        <BotNavbar />     
        </div> 
    </>
  );
}

export default MyPageDetailGraph;