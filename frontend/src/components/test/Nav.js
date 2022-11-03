import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <ul>
      <li>
        <Link to="/irene">아이린</Link>
      </li>
      <li>
        <Link to="/seulgi">슬기</Link>
      </li>
      <li>
        <Link to="/yeri">예리</Link>
      </li>
      <li>
        <Link to="/joy">조이</Link>
      </li>
      <li>
        <Link to="/wendy">웬디</Link>
      </li>
    </ul>
  );
};

export default Nav;