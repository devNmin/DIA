import styles from './MainCarousel.module.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MainCarousel(props) {
	const { children } = props
	const [currentIndex, setCurrentIndex] = useState(0)
	const [length, setLength] = useState(children.length)
	const [touchPosition, setTouchPosition] = useState(null)

	// Carousel 넘기기
	const next = () => {
		if (currentIndex < (length - 1)) {
			setCurrentIndex(prevState => prevState + 1)
		}
	}
	// Carousel 이전으로 가기
	const prev = () => {
		if (currentIndex > 0) {
			setCurrentIndex(prevState => prevState - 1)
		}
	}

	// swipe기능
	const handleTouchStart = (e) => {
		const touchDown = e.touches[0].clientX
		setTouchPosition(touchDown)
	}

	const handleTouchMove = (e) => {
		const touchDown = touchPosition

		if (touchDown === null) {
			return
		}

		const currentTouch = e.touches[0].clientX
		const diff = touchDown - currentTouch

		if (diff > 8) {
			next()
		}

		if (diff < -8) {
			prev()
		}

		setTouchPosition(null)
	}

	useEffect(() => {
		setLength(children.length)
	}, [children])

	return (
		<div>
			<div className={styles.carousel_container}>
				<div className={styles.carousel_wrapper}>
					{
						currentIndex > 0 &&
						<button onClick={prev} className={styles.left_arrow}>
							&lt;
						</button>
					}
					<div
						className={styles.carousel_content_wrapper}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
					>
						<div
							className={styles.carousel_content}
							style={{ transform: `translateX(-${currentIndex * 100}%)` }}
						>
							{children}
						</div>
					</div>
					{
						currentIndex < (length - 1) &&
						<button onClick={next} className={styles.right_arrow}>
							&gt;
						</button>
					}
				</div>
			</div >
			{
				currentIndex === (length - 1) &&
				<Link to='/register' className={styles.signup}>
					<button type="button">
						회원가입 하러 가기
					</button>
				</Link>
			}
		</div>
	);
};

export default MainCarousel