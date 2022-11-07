import React from 'react';
import MyCard from '../components/MyPage/MyCard';
import Sidebar from '../components/MyPage/SideBar';
import styles from './MyPage.module.css'
import DataGraph from '../components/MyPage/DataGraph';
import { Link } from 'react-router-dom';
import BotNavbar from '../components/Navbar/BotNavbar';
import HeatMap from '../components/MyPage/HeatMap';

function MyPage(props) {

	return (
		<>
		<div className={styles.body}>
			<Sidebar />
			<MyCard />
			<DataGraph />
			<div className={styles.graphbutton}>
				<Link to='/detail'>
				<button className={styles.detailButton}>
					경기별 스텟 보기
				</button>
				</Link>
			</div>
		</div>
		<BotNavbar />
		<HeatMap />
		</>
	);
}

export default MyPage;