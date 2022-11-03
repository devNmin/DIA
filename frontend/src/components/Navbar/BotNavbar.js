// import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import AuthContext from '../../context/AuthContext';
import styles from './BotNavbar.module.css'

function BotNavbar(props) {
  const history = useHistory();
  // let { user} = useContext(AuthContext)

  const handleHistory = () => {
    history.goBack();
  }
  return (
    <nav className={styles.wrapper}>
      <div>
        <button className={styles.navButton} onClick={handleHistory}>back</button>
        <Link to='/main'>
          <button className={styles.navButton}>home</button>
        </Link>
      </div>
        <div>
          <button className={styles.navButton}>
            Hello, young
          </button>
        </div>
    </nav>
  );
}

export default BotNavbar;