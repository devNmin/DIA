// import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext';
import styles from './TopNavbar.module.css'

function TopNavbar(props) {
  const history = useHistory();
  // let { user} = useContext(AuthContext)

  const handleHistory = () => {
    history.push("/analysis");
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrap}>
        <div>
          <Link to='/main'>
            <button className={styles.navButton}>개인 스탯</button>
          </Link>
        </div>
        <div>
          <button className={styles.navButton} onClick={handleHistory}>경기 기록 </button>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;