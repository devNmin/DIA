import React from 'react';
import Sidebar from '../components/MyPage/SideBar';
import MyCard from '../components/MyPage/MyCard';
import styles from './MyPage.module.css'

function MyAnalysis(props) {
    return (
        <div className={styles.body}>
            <Sidebar />
            <MyCard />
        </div>
    );
}

export default MyAnalysis;