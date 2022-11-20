import React, { useRef, useState, useContext, useEffect } from 'react';
import styles from './MyCard.module.css';
// import star  from '../../assets/혁림.gif'
import logo from '../../assets/freelogo.png';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

function MyCard(props) {
  let { authTokens } = useContext(AuthContext);
  const [img, setImage] = useState(logo);
  const fileInput = useRef(null);
  const [userInfo, setUserInfo] = useState(null);

  const getImages = () => {
    const image = '';
    const reader = new FileReader();
    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
      url: 'https://k7b307.p.ssafy.io/api/v1/images/profile/link',
      method: 'GET',
      data: { profileUrl: image },
    })
      .then((response) => {
        setImage(response.data.profileUrl);
        //화면에 프로필 사진 표시
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result);
          }
        };
        reader.readAsDataURL(image);
        console.log('저장');
      })
      .catch((err) => console.log(err));
  };

  const getUserInfo = () => {
    axios({
      headers: {
        Authorization: `Bearer ${authTokens.accessToken}`,
      },
      url: 'https://k7b307.p.ssafy.io/api/v1/user/info',
      method: 'GET',
    })
      .then((response) => {
        console.log('여깅', response);
        setUserInfo(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getImages();
    getUserInfo();
  }, []);

  const onChange = (e) => {
    const image = e.target.files[0];
    const reader = new FileReader();

    axios({
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${authTokens.accessToken}`,
        'Access-Control-Allow-Origin': '*',
      },
      url: 'https://k7b307.p.ssafy.io/api/v1/images/profile',
      method: 'POST',
      data: { files: image },
    })
      .then((response) => {
        setImage(image);
        //화면에 프로필 사진 표시
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImage(reader.result);
          }
        };
        reader.readAsDataURL(image);
        console.log('저장');
      })
      .catch((err) => console.log(err));
    // if (image) {
    // 	setImage(image)
    // } else { //업로드 취소할 시
    // 	setImage(img)
    // 	return
    // }
  };

  return (
    <div className={styles.body}>
      <div className={styles.fut_player_card}>
        <div className={styles.player_card_top}>
          <div className={styles.player_master_info}>
            <div className={styles.player_rating}>
              <span>{userInfo?.userId}</span>
            </div>
            <div className={styles.player_position}>
              <span>ST</span>
            </div>
            <div className={styles.player_nation}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1920px-Flag_of_South_Korea.svg.png"
                alt="Argentina"
                draggable="false"
              />
            </div>
            <div className={styles.player_club}>
              <img src={logo} alt="B307" draggable="false" />
            </div>
          </div>
          <div className={styles.player_picture}>
            <input
              type="file"
              style={{ display: 'none' }}
              accept="image/jpg,impge/png,image/jpeg"
              name="profile_img"
              onChange={onChange}
              ref={fileInput}
            />
            <img
              src={img}
              onClick={() => {
                fileInput.current.click();
              }}
              alt="선수"
              draggable="false"
            />
            {/* <div className={styles.player_extra}>
							<span>4*SM</span>
							<span>4*WF</span>
						</div> */}
          </div>
        </div>
        <div className={styles.player_card_bottom}>
          <div className={styles.player_info}>
            {/* 선수 이름 */}
            <div className={styles.player_name}>
              <span>{userInfo?.userName}</span>
            </div>
            {/* 선수 스탯 */}
            <div className={styles.player_features}>
              <div className={styles.player_features_col}>
                <span>
                  <div className={styles.player_feature_value}>10</div>
                  <div className={styles.player_feature_title}>STA</div>
                </span>
                <span>
                  <div className={styles.player_feature_value}>40</div>
                  <div className={styles.player_feature_title}>ATT</div>
                </span>
                <span>
                  <div className={styles.player_feature_value}>30</div>
                  <div className={styles.player_feature_title}>DEF</div>
                </span>
              </div>
              <div className={styles.player_features_col}>
                <span>
                  <div className={styles.player_feature_value}>30</div>
                  <div className={styles.player_feature_title}>SPE</div>
                </span>
                <span>
                  <div className={styles.player_feature_value}>30</div>
                  <div className={styles.player_feature_title}>DIS</div>
                </span>
                <span>
                  <div className={styles.player_feature_value}>20</div>
                  <div className={styles.player_feature_title}>PHY</div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyCard;
