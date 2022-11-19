import React, { useContext } from 'react';
import sample from '../../assets/card.png';
import styles from './CurrentTeam.module.css';
import UserContext from '../../context/UserContext';
import freelogo from '../../assets/freelogo.png';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export default function CurrentTeamComp(props) {
  const { registerPlayer } = useContext(UserContext);
  const playerInfo = props.player;
  let userProfile = playerInfo.userProfileImage;

  return (
    <div className={styles.playerInfoContainer}>
      <img
        onClick={() => {
          props.delete
            ? props.putPositions(playerInfo)
            : registerPlayer(playerInfo);
        }}
        className={styles.playerImg}
        src={userProfile ? userProfile : freelogo}
        alt=""
      />

      <h5 className={styles.userinfo}>
        {playerInfo.userName} {playerInfo.userPosition}{' '}
      </h5>
      <div>
        {props.delete ? (
          <RemoveCircleIcon
            onClick={() => {
              props.removeCurrentTeam(props.player);
            }}
            className={styles.deletebtn}
          />
        ) : null}
      </div>
    </div>
  );
}
