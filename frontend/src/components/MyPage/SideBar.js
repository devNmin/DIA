import React from "react";
import { Link, useLocation } from "react-router-dom";
import SideBarItem from "./SideBarItem";
import styles from './SideBar.module.css'

function Sidebar() {
	const pathName = useLocation().pathname;

  const menus = [
    { name: "개인 정보", path: "/mypage" },
    { name: "경기 기록", path: "/analysis" },
    // { name: "캐시 관리", path: "/main" }
  ];

  return (
    <div className={styles.sidebar}>
      {menus.map((menu, index) => {
        return (
          <Link to={menu.path} key={index} className={styles.link}>
            <SideBarItem
              menu={menu}
							isActive={pathName === menu.path ? true : false}
            />
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;