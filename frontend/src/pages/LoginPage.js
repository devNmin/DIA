import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
// import logo from '../assets/Logo.png';
import styles from './LoginPage.module.css';

function LoginPage() {
  let { loginUser } = useContext(AuthContext);

  return (
    <div className={styles.body}>
      <section className={styles.login_box}>
        <h2>로그인</h2>
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
        <Link to="/register" className={styles.signup_link}>
          <p>처음이신가요?</p>
        </Link>
      </section>
    </div>
  );
}

export default LoginPage;
