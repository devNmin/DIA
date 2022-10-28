import React from 'react';
import MainCarousel from '../components/ExplainPage/MainCarousel';
import styles from './ExplainPage.module.css'

function Explainpage(props) {
	return (
		<div className={styles.body}>
			<div>
				zzz
			</div>
			<div style={{ maxWidth: 1200, marginLeft: '1rem', marginRight: '1rem', marginTop: '3rem' }}>
				<MainCarousel>
					<img src="https://via.placeholder.com/1600x900" alt="placeholder" />
					<img src="https://via.placeholder.com/1600x900" alt="placeholder" />
					<img src="https://via.placeholder.com/1600x900" alt="placeholder" />
				</MainCarousel>
			</div>
		</div>
	);
}

export default Explainpage;