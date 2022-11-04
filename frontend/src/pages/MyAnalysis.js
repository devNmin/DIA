import React, { useEffect, useState } from 'react';
import Sidebar from '../components/MyPage/SideBar';
import styles from './MyAnalysis.module.css'
import Record from '../components/MyPage/Record';
import BotNavbar from '../components/Navbar/BotNavbar';

function MyAnalysis(props) {
	const [movies, setMovies] = useState([])
	const getMovies = async () => {
		const json = await (
			await fetch(
				`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`
			)
		).json();
		setMovies(json.data.movies);
	};
	useEffect(() => {
		getMovies()
	}, [])

	return (
		<>
			<Sidebar />
			<div className={styles.container}>
				<div className={styles.records}>
					{movies.map((movie) => (
						<Record
							key={movie.id}
							id={movie.id}
							coverImg={movie.medium_cover_image}
							title={movie.title}
						/>
					))}
				</div>
			</div>
			<BotNavbar />
		</>
	);
}

export default MyAnalysis;