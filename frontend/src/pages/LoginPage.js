import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import logo from '../assets/freelogo.png';
import styles from './LoginPage.module.css';
import { deviceType } from 'react-device-detect';

function LoginPage() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className={styles.body}>
      <section className={styles.login_box}>
        <img src={logo} alt="#" />
        <div className={styles.dia}>
          <h2>DI</h2>
          <h3>recting</h3>
          <h2>A</h2>
          <h3>ssistant</h3>
        </div>
        <form onSubmit={loginUser}>
          {/* <img src={logo} alt="" /> */}
          <div className={styles.user_box}>
            <input
              type="text"
              name="useremail"
              required
              autoComplete="off"
              autoFocus
            />
            <label>이메일</label>
          </div>
          <div className={styles.user_box}>
            <input type="password" name="userpassword" required />
            <label>비밀번호</label>
          </div>

          <div className={styles.actions}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <input type="submit" value="로그인" />
          </div>
        </form>
        {deviceType === 'mobile' ? (
          <Link to="/register" className={styles.signup_link}>
            <p>DIA에 처음오셨나요?</p>
          </Link>
        ) : (
          <Link to="/explain" className={styles.signup_link}>
            <p>DIA에 처음오셨나요?</p>
          </Link>
        )}
      </section>
    </div>
  );
}

export default LoginPage;
