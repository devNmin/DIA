import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebarz.css';



const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  // const rendering = () => {
  //   const result = [];
  //   for (let i = 0; i < users.length; i++) {
  //     result.push(<span key={i}>{users[i]}</span>);
  //   }
  //   return result;
  // };


  return (
    <>
      <div className='toggle'>
        <Link to='#' className='menu-bars'>
          <p onClick={showSidebar}>심박수 체크하기</p>
        </Link>
      </div>
      <div className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className='nav-menu-items' onClick={showSidebar}>
          <li className='navbar-toggle'>
            <Link to='#' className='menu-bars'>
              심박수
            </Link>
          </li>
          <div className='qwer'>
          </div>
        </ul>
      </div>
    </>
  );
}


export default Sidebar;