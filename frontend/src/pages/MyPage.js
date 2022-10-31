import React from 'react';
import MyCard from '../components/MyPage/MyCard';
import Sidebar from '../components/MyPage/SideBar';
import styles from './MyPage.module.css'

function MyPage(props) {
    return (
        <div className={styles.body}>
            <Sidebar />
            <MyCard />
        </div>
    );
}

export default MyPage;