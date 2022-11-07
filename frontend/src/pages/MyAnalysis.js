import React, { useEffect, useState } from 'react';
import Sidebar from '../components/MyPage/SideBar';
import styles from './MyAnalysis.module.css'
import Record from '../components/MyPage/Record';
import BotNavbar from '../components/Navbar/BotNavbar';
import axios from '../utils/axios'

function MyAnalysis(props) {
	// const [movies, setMovies] = useState([])
	const [games, setGames] = useState([])

	const getGames = async () => {
		await axios.post(`http://localhost:8081/api/v1/usergame/myRecentGameInfo`, {
			"start" : 0,
			"end" : 6,
			"userEmail" : "tt"
		}
		)
    	.then(res => {
    	  if (res.status === 200) {
			setGames(res.data)
    	  }
    	}).catch(err => {
    	  alert(err.data);
    	})
	}

	// const getMovies = async () => {
	// 	const json = await (
	// 		await fetch(
	// 			`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
	// 		)
	// 	).json();
	// 	setMovies(json.data.movies);
	// };
	useEffect(() => {
		getGames()
		// getMovies()
	}, [])

	return (
		<>
			<Sidebar />
			<div className={styles.container}>
				<div className={styles.records}>
					{games.map((game) => (
						<Record
							key={game.gameId}
							gameId={game.gameId}
							gameYear={game.gameYear}
							gameMonth={game.gameMonth}
							gameDay={game.gameDay}
							gameTime={game.gameTime}
						/>
					))}
				</div>
			</div>
			<BotNavbar />
		</>
	);
}

export default MyAnalysis;