import React from 'react';
import { Link } from 'react-router-dom';

function NonLoginMainPage(props) {
    return (
        <div>
            <Link to='/ex'>
                <button type="button">
                    다이아 시작하기
                </button>
            </Link>
            <div>
                이미 회원이신가요?
                <Link to='/'>로그인하기</Link>
            </div>
        </div>
    );
}

export default NonLoginMainPage;