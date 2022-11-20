// import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import React, {  useState, useContext, useEffect } from 'react';
// import AuthContext from '../../context/AuthContext';
import styles from './BotNavbar.module.css'
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

function BotNavbar(props) {
  let { authTokens } = useContext(AuthContext);
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(null);
  // let { user} = useContext(AuthContext)
  const getUserInfo = () => {
    axios({
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
      url: 'https://k7b307.p.ssafy.io/api/v1/user/info',
      method: 'GET',
    })
      .then((response) => {
        // console.log('여깅', response);
        setUserInfo(response.data);
      })
      .catch((err) => console.log(err));
  };
  const handleHistory = () => {
    history.goBack();
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div>
        <button className={styles.navButton} onClick={handleHistory}>back</button>
        {/* <Link to='/main'>
          <button className={styles.navButton}>home</button>
        </Link> */}
      </div>
        <div>
          <button className={styles.navButton}>
            Hello,{userInfo?.userName}
          </button>
        </div>
    </div>
  );
}

export default BotNavbar;