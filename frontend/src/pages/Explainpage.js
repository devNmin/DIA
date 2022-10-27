import React from 'react';
import MainCarousel from '../components/ExplainPage/MainCarousel';

function Explainpage(props) {
    return (
        <div style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <MainCarousel>
                <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
                <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
                <img src="https://via.placeholder.com/1600x300" alt="placeholder" />
            </MainCarousel>
        </div>
    );
}

export default Explainpage;