import React, { useContext } from 'react';
import './SearchedUser.css';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import freelogo from '../../assets/freelogo.png';

export default function SearchedUser(props) {
  const { authTokens } = useContext(AuthContext);
  const userInfo = props.user;
  let userProfile = userInfo.userProfileImage;

  return (
    <div className="searchcard" style={{ borderColor: props.color }}>
      <div className="imgContainer">
        <img
          className="searchimg"
          src={userProfile ? userProfile : freelogo}
          alt="#"
        />
      </div>
      <div className="searchExplanation">
        <div>
          <p className="searchfirst">
            {userInfo.userName} {userInfo.userPosition}{' '}
          </p>
          <p className="searchsecond">
            {' '}
            나이: {userInfo.userAge} / 키: {userInfo.userHeight}cm / 체중:{' '}
            {userInfo.userWeight}kg
          </p>
        </div>
      </div>
    </div>
  );
}
