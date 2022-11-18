import React, { useEffect, useState, useRef } from 'react';
import styles from './MyAnalysis.module.css';
import Record from '../components/MyPage/Record';
import BotNavbar from '../components/Navbar/BotNavbar';
import axios from '../utils/axios';
import TopNavbar from '../components/Navbar/TopNavbar';
import { SignalWifiStatusbarConnectedNoInternet4TwoTone } from '@mui/icons-material';

function MyAnalysis(props) {
  // const [movies, setMovies] = useState([])
  const [games, setGames] = useState([]);
  const cur = useRef(0);
  const myGameList = useRef([]);

  const SIZE = 9;
  const getGames = async () => {    
    console.log(typeof(cur.current))
    console.log("cur", cur.current + " " + (cur.current+SIZE))
    console.log("myGameList", myGameList.current )
    console.log("myGameList leng", myGameList.current.length)
    await axios
      .post(`http://k7b307.p.ssafy.io:8081/api/v1/usergame/myRecentGameInfo`, {
        start: cur.current,
        end: (cur.current+SIZE),
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("res.data", res.data)
          for(let i of res.data){
            console.log("i", i)
            myGameList.current.push(i);
          }
          setGames(myGameList.current);
        }
        else{
          console.log("시부레")
        }
      })
      .catch((err) => {
        alert(err.data);
      });
  };

  const onScroll = () => {
    if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight  -5) {
      getGames();
      cur.current = cur.current+SIZE;
    }
  }


  useEffect(() => {
    onScroll();
    window.addEventListener('scroll', onScroll);    
    return() => {
        window.removeEventListener('scroll', onScroll);
    };
  
},  []);


  // useEffect(() => {
  //   getGames();
  //   // getMovies()
  // }, []);



  return (
    <>
      <TopNavbar />
      <div className={styles.body}>
        <div className={styles.container}>
          <div className={styles.records}>
            {games.map((game) => (
              <Record
                key={game.gameId}
                gameId={game.gameId}
                gameYear={game.gameYear}
                gameMonth={game.gameMonth}
                gameDay={game.gameDay}
                gameTime={game.gameTime}
              />
            ))}
          </div>
        </div>
        </div> 
      <BotNavbar />
    
    </>
  );
}

export default MyAnalysis;
