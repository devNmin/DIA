import React from 'react';
import { Link } from 'react-router-dom';
import FirstPageVideo from '../components/FisrtPage/FirstPageVideo';

function FirstPage(props) {
  // const goMain = () => {
  //   document.location.href('/')
  // }

  return (
    <Link to="/">
      <FirstPageVideo />
    </Link>
  );
}

export default FirstPage;