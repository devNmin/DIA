import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Sidebarz.css';


const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

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
          <div className='zzzz'>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span className='span'>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </ul>
      </div>
    </>
  );
}


export default Sidebar;