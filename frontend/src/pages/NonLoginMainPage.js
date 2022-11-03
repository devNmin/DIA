import React from 'react';
import { Link } from 'react-router-dom'
import styles from './NonLoginMainPage.module.css'
import logo from '../assets/freelogo.png'

function NonLoginMainPage(props) {
    return (
        <div className={styles.body}>
            <img className={styles.logo} src={logo} alt='/' />
            <div className={styles.buttonBody}>
                <Link to='/explain' className={styles.Link}>
                    <button type="button">
                        다이아 시작하기
                    </button>
                </Link>
            <div className={styles.logintext}>
                이미 다이아 회원이라면? &nbsp;
                <Link to='/login' className={styles.login}>로그인</Link>
            </div>
            </div>
        </div>
    );
}

export default NonLoginMainPage;