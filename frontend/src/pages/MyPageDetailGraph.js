import React, {useEffect, useState} from 'react';
import DataGraphDetail from '../components/MyPage/DataGraphDetail';
import BotNavbar from '../components/Navbar/BotNavbar';
import axios from '../utils/axios'

function MyPageDetailGraph(props) {
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
    // await axios.get(BASE_URL + `usergame/heatmapPoints/11`)
    await axios.get(`http://localhost:8081/api/v1/usergame/info/${gameId}/2`)
    .then(res => {     
        console.log(res.data)
        setUserGameData(res.data)
            
    }).catch(err => {
      console.log("eee")
    })
  }

  const data = [
    {
      "id": "경기1",
      "color": "hsl(342, 70%, 50%)",
      "data": [
        {
          "x": "",
          "y": 0
        },
        {
          "x": "체력",
          "y": userGameData.userStamina
        },
        {
          "x": "스피드",
          "y": userGameData.userSpeed
        },
        {
          "x": "공격력",
          "y": userGameData.userAttack
        },
        {
          "x": "수비력",
          "y": userGameData.userDefence
        },
        {
          "x": "이동거리",
          "y": userGameData.userDistance
        },
        {
          "x": "피지컬",
          "y": userGameData.userPhysical
        },
        {
          "x": "'",
          "y": 100
        },
      ]
    },
  ]
  return (
    <div>
      <DataGraphDetail data={data} />
      <BotNavbar />
    </div>
  );
}

export default MyPageDetailGraph;