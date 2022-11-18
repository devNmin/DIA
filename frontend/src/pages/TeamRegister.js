import React, { useContext } from 'react';
import FootballNavbar from '../components/Navbar/FootballNavbar';
import UserContext from '../context/UserContext';
import styles from './TeamRegister.module.css';
import { useHistory } from 'react-router-dom';
import TeamMatchField from '../components/TeamMake/TeamMatchField';
import SearchedUser from '../components/TeamMake/SearchedUser';
import CurrentTeamComp from '../components/TeamMake/CurrentTeamComp';

export default function TeamRegister() {
  const {
    ourColor,
    setOurColor,
    theirColor,
    setTheirColor,
    pivot,
    ala,
    fixo,
    goalkeeper,
    currentTeam,
    registerPlayer,
    matchTeam,
  } = useContext(UserContext);
  // let test = document.body.clientWidth
  // let test = document.querySelector('#leftux').clientWidth
  // console.log(test);
  // let result = document.querySelector('.result')
  // console.log(test.style.width);
  const history = useHistory();
  const goToCanvas = async () => {
    for (let index = 0; index < matchTeam.length; index++) {
      const element = matchTeam[index];
      if (element === '') {
        alert('유저가 등록되지 않은 위치가 있습니다!');
        return;
      }
    }
    history.push('/canvasTest');
  };
  const goToIp = () => {
    history.push('/ipInsert');
  };
  return (
    <div className={styles.body}>
      <FootballNavbar currentpage="teamregister"></FootballNavbar>
      {/* <div>{ipV4}</div>
        <div>{portinput}</div>   */}
      {/* <div>{firstCoord}</div> */}

      <div className={styles.totalUx}>
        <div className={styles.leftUx} id="leftux">
          <TeamMatchField></TeamMatchField>
        </div>
        <div className={styles.rightUx}>
          <div className={styles.teamColorCon}>
            <div className={styles.teamText}>
              <p className={styles.colorTitle}> Home Team Color : </p>
              <input
                type="color"
                className={styles.colorInput}
                value={ourColor}
                onChange={(e) => setOurColor(e.target.value)}
              />
            </div>
            <div className={styles.teamText}>
              <p className={styles.colorTitle}> Away Team Color : </p>
              <input
                type="color"
                className={styles.colorInput}
                value={theirColor}
                onChange={(e) => setTheirColor(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.startingCon}>
            <div className={styles.startingTitle}>STARTING MEMBERS</div>

            {pivot.map((fwplayer) => {
              return (
                <div
                  key={fwplayer.userId}
                  onClick={() => registerPlayer(fwplayer)}
                >
                  <SearchedUser
                    color="red"
                    className="searchresult"
                    user={fwplayer}
                  ></SearchedUser>
                  <br />
                </div>
              );
            })}
            {ala.map((mfplayer) => {
              return (
                <div
                  key={mfplayer.userId}
                  onClick={() => registerPlayer(mfplayer)}
                >
                  <SearchedUser
                    color="green"
                    className="searchresult"
                    user={mfplayer}
                  ></SearchedUser>
                  <br />
                </div>
              );
            })}
            {fixo.map((dfplayer) => {
              return (
                <div
                  key={dfplayer.userId}
                  onClick={() => registerPlayer(dfplayer)}
                >
                  <SearchedUser
                    color="blue"
                    className="searchresult"
                    user={dfplayer}
                  ></SearchedUser>
                  <br />
                </div>
              );
            })}
            {goalkeeper.map((goal) => {
              return (
                <div key={goal.userId} onClick={() => registerPlayer(goal)}>
                  <SearchedUser
                    color="yellow"
                    className="searchresult"
                    user={goal}
                  ></SearchedUser>
                  <br />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.subsitute}>
        <div className={styles.subsitutemem}>
          <div className={styles.subsituteTitle}>SUBSITUTE MEMBERS</div>
          <div className={styles.subsitutePlayers}>
            {currentTeam.map((playerinfo) => {
              return (
                <CurrentTeamComp
                  key={playerinfo.userId}
                  player={playerinfo}
                  delete={false}
                ></CurrentTeamComp>
              );
            })}
          </div>
        </div>
        <div className={styles.canvasButton}>
          <button
            className={styles.gotoIp}
            onClick={() => {
              goToIp();
            }}
          >
            RECONNECT SERVER
          </button>
          <button
            className={styles.gotoCanvas}
            onClick={() => {
              goToCanvas();
            }}
          >
            Go to Canvas
          </button>
        </div>
      </div>
    </div>
  );
}
