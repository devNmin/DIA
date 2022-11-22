import React from 'react';
import MyCard from '../components/MyPage/MyCard';
import styles from './MyPage.module.css'
import DataGraph from '../components/MyPage/DataGraph';
// import { Link } from 'react-router-dom';
import TopNavbar from '../components/Navbar/TopNavbar';
import BotNavbar from '../components/Navbar/BotNavbar';

function MyPage(props) {

	return (
		<>
		<div className={styles.body}>
			<TopNavbar />
			<MyCard />
			<DataGraph/>
			{/* <div className={styles.graphbutton}>
				<Link to='/detail'>
				<button className={styles.detailButton}>
					경기별 스텟 보기
				</button>
				</Link>
			</div> */}
		</div>
		<BotNavbar />
		</>
	);
}

export default MyPage;