import React, { useState, useContext } from 'react';
import './UserSearch.css';
import FootballNavbar from '../Navbar/FootballNavbar';
import axios from '../../utils/axios';
import SearchedUser from './SearchedUser';
import { Scrollbars } from 'react-custom-scrollbars-2';
import UserContext from '../../context/UserContext';
import CurrentTeamComp from './CurrentTeamComp';
import CurrentFieldComp from './CurrentFieldComp';
import styles from '../../pages/AccountRegisterPage.module.css';
import FormationContainer from './FormationContainer';

export default function UserSearch() {
  const {
    currentTeam,
    setCurrentTeam,
    formation,
    setFormation,
    pivot,
    ala,
    setAla,
    fixo,
    setFixo,
    setPivot,
    goalkeeper,
    setGoalkeeper,
  } = useContext(UserContext);
  const currentpage2 = 'usersearch';
  const [username, setUsername] = useState('');
  const [searchedUserList, setSearchedUserList] = useState([]);
  const [noResult, setNoResult] = useState(false);
  // const [foramation, setFormation] = useState('0000')
  const [addColor, setAddColor] = useState(null);
  const [checkbyId, setCheckById] = useState([]);
  const totalTeam = [...pivot, ...ala, ...fixo, ...goalkeeper, ...currentTeam];
  const submitHandler = async (e) => {
    e.preventDefault();
    let userEmails = [];
    await axios
      .post('search/user', {
        name: username,
      })
      .then((res) => {
        // console.log(res.data);
        // console.log(res.data.length);
        if (res.data.length) {
          setNoResult(false);
          setSearchedUserList(res.data);
        } else {
          setSearchedUserList([]);
          setNoResult(true);
        }
      });
    console.log(username);
    setUsername('');
  };

  const addPlayerToTeam = async (v) => {
    if (currentTeam.length) {
      for (let index = 0; index < totalTeam.length; index++) {
        const element = totalTeam[index];
        if (element.userId === v.userId) {
          alert('this player is already in the squad');
          return;
        }
      }
      setCurrentTeam([...currentTeam, v]);
      setCheckById([...checkbyId, v.userId]);
    } else {
      setCurrentTeam([v]);
      setCheckById([v.userId]);
    }
    setSearchedUserList((current) =>
      current.filter((searched) => searched.userId !== v.userId)
    );
  };

  const removeCurrentTeam = (r) => {
    setCurrentTeam((c) => c.filter((currentP) => currentP.userId !== r.userId));
    console.log(currentTeam);
  };

  const addCurrentTeam = (o) => {
    console.log('add');
    if (o) {
      setCurrentTeam((c) => [...c, o]);
    }
  };

  const putPlayertoPosition = async (p) => {
    if (addColor === 'red') {
      addCurrentTeam(pivot.pop());
      pivot.unshift(p);
      setPivot(pivot);
      removeCurrentTeam(p);
    } else if (addColor === 'green') {
      addCurrentTeam(ala.pop());
      ala.unshift(p);
      setAla(ala);
      removeCurrentTeam(p);
    } else if (addColor === 'blue') {
      addCurrentTeam(fixo.pop());
      fixo.unshift(p);
      setFixo(fixo);
      removeCurrentTeam(p);
    } else if (addColor === 'yellow') {
      addCurrentTeam(goalkeeper.pop());
      goalkeeper.unshift(p);
      setGoalkeeper(goalkeeper);
      removeCurrentTeam(p);
    }
  };

  return (
    <div>
      <FootballNavbar currentpage={currentpage2}></FootballNavbar>
      {/* <div>
          유저 등록하기
        </div> */}
      {/* <div>
          {addColor}
        </div> */}
      <div className="entiresearch">
        <div className="usersearch fadein">
          <div className="playersearchbar">
            <form onSubmit={(e) => submitHandler(e)}>
              <input
                className="searchinput"
                onChange={(e) => setUsername(e.target.value)}
                type="search"
                placeholder="선수 이름 검색"
                value={username}
              />
            </form>
          </div>
          <hr style={{ color: '#b3dc45' }} />
          <Scrollbars
            autoHide
            // Hide delay in ms
            autoHideTimeout={1000}
            // Duration for hide animation in ms.
            autoHideDuration={200}
          >
            <div className="searchresults">
              {searchedUserList.map((userInfo) => (
                <div
                  key={userInfo.userId}
                  onClick={() => addPlayerToTeam(userInfo)}
                >
                  <SearchedUser
                    color="#b3dc45"
                    className="searchresult"
                    user={userInfo}
                  ></SearchedUser>
                  <br />
                </div>
              ))}
            </div>
            <br />
            <br />
          </Scrollbars>
          {noResult ? <h2>There aren't any users</h2> : null}
        </div>
        <div className="usersquad fadein">
          <div className="squadtitle">YOUR SQUAD</div>
          <hr />
          <div className="fieldContainer">
            <CurrentFieldComp curform={formation}></CurrentFieldComp>
            <div style={{ width: '50%' }}>
              <div
                style={{ display: 'flex', height: '13%', marginBottom: '10px' }}
              >
                <button
                  className="formationBtn"
                  onClick={() => setFormation('1202')}
                  style={{ marginLeft: '20px', height: '100%', width: '33%' }}
                >
                  1-2-0-2
                </button>
                <button
                  className="formationBtn"
                  onClick={() => setFormation('1121')}
                  style={{ marginLeft: '20px', height: '100%', width: '33%' }}
                >
                  1-1-2-1
                </button>
                <button
                  className="formationBtn"
                  onClick={() => setFormation('1112')}
                  style={{
                    marginLeft: '20px',
                    height: '100%',
                    marginRight: '15px',
                    width: '33%',
                  }}
                >
                  1-1-1-2
                </button>
              </div>
              <FormationContainer
                setAddColor={setAddColor}
                formation={formation}
              ></FormationContainer>
            </div>
          </div>

          <hr className="hrMargin" />
          <div
            className="squadBench"
            style={{ display: 'flex', overflowX: 'auto' }}
          >
            {currentTeam.length
              ? currentTeam.map((playerInfo) => (
                  <div key={playerInfo.userId}>
                    <CurrentTeamComp
                      delete={true}
                      putPositions={putPlayertoPosition}
                      removeCurrentTeam={removeCurrentTeam}
                      setCurrentTeam={setCurrentTeam}
                      player={playerInfo}
                    ></CurrentTeamComp>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
}
