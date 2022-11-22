import React, { useEffect, useState, useRef } from 'react';
import styles from './MyAnalysis.module.css';
import Record from '../components/MyPage/Record';
import BotNavbar from '../components/Navbar/BotNavbar';
import axios from '../utils/axios';
import TopNavbar from '../components/Navbar/TopNavbar';
// import { SignalWifiStatusbarConnectedNoInternet4TwoTone } from '@mui/icons-material';

function MyAnalysis(props) {
  // const [movies, setMovies] = useState([])
  const [games, setGames] = useState([]);
  const cur = useRef(0);
  const flag = useRef(false);
  const myGameList = useRef([]);
  const myGameListSize = useRef(0);

  const SIZE = 9;
  const getGames = async () => {   
    await axios
      .post(`http://k7b307.p.ssafy.io:8081/api/v1/usergame/myRecentGameInfo`, {
        start: cur.current,
        end: SIZE,
      })
      .then((res) => {
        if (res.status === 200) {
          if(res.data.length === 0){
            flag.current = true;
          }
          for(let i of res.data){
            myGameList.current.push(i);
          }
          setTimeout(() => {
            setGames(games.concat(myGameList.current));
          }, 500);
          
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const onScroll = () => {
    if (!flag.current && window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight  -5) {
      getGames();
      cur.current = cur.current+1;
    }
  }


  useEffect(() => {
    onScroll();    
    window.addEventListener('scroll', onScroll);    
    return() => {
        window.removeEventListener('scroll', onScroll);
    };
  
},  [myGameListSize]);

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
                gameScore={game.gameScore}
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
