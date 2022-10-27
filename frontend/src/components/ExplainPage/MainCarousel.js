import './MainCarousel.css'
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

        if (diff > 5) {
            next()
        }

        if (diff < -5) {
            prev()
        }

        setTouchPosition(null)
    }

    useEffect(() => {
        setLength(children.length)
    }, [children])

    return (
        <div>
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    {
                        currentIndex > 0 &&
                        <button onClick={prev} className="left-arrow">
                            &lt;
                        </button>
                    }
                    <div
                        className="carousel-content-wrapper"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                    >
                        <div
                            className="carousel-content"
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            {children}
                        </div>
                    </div>
                    {
                        currentIndex < (length - 1) &&
                        <button onClick={next} className="right-arrow">
                            &gt;
                        </button>
                    }
                </div>
            </div >
            {
                currentIndex === (length - 1) &&
                <Link to='/register'>
                    <button type="button">
                        회원가입 하러 가기
                    </button>
                </Link>
            }
        </div>
    );
};

export default MainCarousel