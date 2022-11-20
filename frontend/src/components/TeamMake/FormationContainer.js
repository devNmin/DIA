import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import UserContext from '../../context/UserContext';
import styles from './FormationContainer.module.css';
// import sample from  '../../assets/card.png'
import freelogo from '../../assets/freelogo.png';

export default function FormationContainer(props) {
  const {
    formation,
    goalkeeper,
    setGoalkeeper,
    fixo,
    setFixo,
    ala,
    setAla,
    pivot,
    setPivot,
    setCurrentTeam,
  } = useContext(UserContext);
  const [color, setColor] = useState(null);
  // const [formation, setFormation] = useState(props.formation)
  // const [] = useState(new Array(parseInt(formation[0])).fill(0))
  // const [fixo, setFixo] = useState(new Array(parseInt(formation[1])).fill(0))
  // const [] = useState(new Array(parseInt(formation[2])).fill(0))
  // const [] = useState(new Array(parseInt(formation[3])).fill(0))
  async function changeformation() {
    // setFormation(props.formation)
    setAla(new Array(parseInt(formation[2])).fill(0));
    setFixo(new Array(parseInt(formation[1])).fill(0));
    setGoalkeeper(new Array(parseInt(formation[0])).fill(0));
    setPivot(new Array(parseInt(formation[3])).fill(0));
  }
  useEffect(() => {
    changeformation();
  }, [formation]);

  const changeColor = (color) => {
    setColor(color);
    props.setAddColor(color);
  };
  // console.log('==========');
  // console.log(goalkeeper);
  // console.log(fixo);
  // console.log(ala);
  // console.log(pivot);
  const removeFromPivot = async (p) => {
    const result = pivot.filter((info) => info.userId !== p.userId);
    result.push(0);
    setPivot(result);
    setCurrentTeam((c) => [...c, p]);
    // console.log(result);
  };
  const removeFromAla = async (p) => {
    const result = ala.filter((info) => info.userId !== p.userId);
    result.push(0);
    setAla(result);
    setCurrentTeam((c) => [...c, p]);
    // console.log(result);
  };
  const removeFromFixo = async (p) => {
    const result = fixo.filter((info) => info.userId !== p.userId);
    result.push(0);
    setFixo(result);
    setCurrentTeam((c) => [...c, p]);
    // console.log(result);
  };
  const removeFromGoalkeeper = async (p) => {
    const result = goalkeeper.filter((info) => info.userId !== p.userId);
    result.push(0);
    setGoalkeeper(result);
    setCurrentTeam((c) => [...c, p]);
    // console.log(result);
  };

  // console.log(typeof Goalkeeper);
  return (
    <div className={styles.formationContainer}>
      <div>
        <div className={styles.formationTitle} style={{ marginTop: '5px' }}>
          Pivot
        </div>
      </div>
      {/* {Goalkeeper.map((iszero) => (
            
        ))
        } */}
      <div className={`${styles.playersCon}`}>
        {pivot.length
          ? pivot.map((iszero) =>
              iszero ? (
                <div key={iszero.userId} className={styles.imgCardCon}>
                  <div className={styles.playerName}>{iszero.userName}</div>
                  <img
                    onClick={() => {
                      changeColor('red');
                    }}
                    style={{
                      border: color === 'red' ? 'solid' : null,
                      borderColor: color === 'red' ? 'red' : null,
                    }}
                    className={styles.playerimg}
                    src={
                      iszero.userProfileImage
                        ? iszero.userProfileImage
                        : freelogo
                    }
                    alt="no img"
                  />
                  <div
                    onClick={() => {
                      removeFromPivot(iszero);
                    }}
                    className={styles.removebutton}
                  >
                    X
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    changeColor('red');
                  }}
                  className={styles.playerContainer}
                  style={{
                    border: color === 'red' ? 'solid' : null,
                    borderColor: color === 'red' ? 'red' : null,
                    'color' : 'white'
                  }}
                >
                  +
                </div>
              )
            )
          : null}
      </div>
      <div>
        <div className={styles.formationTitle}>Ala</div>
      </div>
      <div className={styles.playersCon}>
        {ala.length
          ? ala.map((iszero) =>
              iszero ? (
                <div key={iszero.userId} className={styles.imgCardCon}>
                  <div className={styles.playerName}>{iszero.userName}</div>
                  <img
                    onClick={() => {
                      changeColor('green');
                    }}
                    style={{
                      border: color === 'green' ? 'solid' : null,
                      borderColor: color === 'green' ? 'green' : null,
                    }}
                    className={styles.playerimg}
                    src={
                      iszero.userProfileImage
                        ? iszero.userProfileImage
                        : freelogo
                    }
                    alt="no img"
                  />
                  <div
                    onClick={() => {
                      removeFromAla(iszero);
                    }}
                    className={styles.removebutton}
                  >
                    X
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    changeColor('green');
                  }}
                  className={styles.playerContainer}
                  style={{
                    border: color === 'green' ? 'solid' : null,
                    borderColor: color === 'green' ? 'green' : null,
                    'color' : 'white'
                  }}
                >
                  +
                </div>
              )
            )
          : null}
      </div>
      <div>
        <div className={styles.formationTitle}>Fixo</div>
      </div>
      <div className={styles.playersCon}>
        {fixo.length
          ? fixo.map((iszero) =>
              iszero ? (
                <div key={iszero.userId} className={styles.imgCardCon}>
                  <div className={styles.playerName}>{iszero.userName}</div>
                  <img
                    onClick={() => {
                      changeColor('blue');
                    }}
                    style={{
                      border: color === 'blue' ? 'solid' : null,
                      borderColor: color === 'blue' ? 'blue' : null,
                    }}
                    className={styles.playerimg}
                    src={
                      iszero.userProfileImage
                        ? iszero.userProfileImage
                        : freelogo
                    }
                    alt="no img"
                  />
                  <div
                    onClick={() => {
                      removeFromFixo(iszero);
                    }}
                    className={styles.removebutton}
                  >
                    X
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    changeColor('blue');
                  }}
                  className={styles.playerContainer}
                  style={{
                    border: color === 'blue' ? 'solid' : null,
                    borderColor: color === 'blue' ? 'blue' : null,
                    'color' : 'white'
                  }}
                >
                  +
                </div>
              )
            )
          : null}
      </div>
      <div>
        <div className={styles.formationTitle}>Goalkeeper</div>
      </div>
      <div className={styles.playersCon}>
        {goalkeeper.length
          ? goalkeeper.map((iszero) =>
              iszero ? (
                <div key={iszero.userId} className={styles.imgCardCon}>
                  <div className={styles.playerName}>{iszero.userName}</div>
                  <img
                    onClick={() => {
                      changeColor('yellow');
                    }}
                    style={{
                      border: color === 'yellow' ? 'solid' : null,
                      borderColor: color === 'yellow' ? 'yellow' : null,
                    }}
                    className={styles.playerimg}
                    src={
                      iszero.userProfileImage
                        ? iszero.userProfileImage
                        : freelogo
                    }
                    alt="no img"
                  />
                  <div
                    onClick={() => {
                      removeFromGoalkeeper(iszero);
                    }}
                    className={styles.removebutton}
                  >
                    X
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    changeColor('yellow');
                  }}
                  className={styles.playerContainer}
                  style={{
                    border: color === 'yellow' ? 'solid' : null,
                    borderColor: color === 'yellow' ? 'yellow' : null,
                    'color' : 'white'
                  }}
                >
                  +
                </div>
              )
            )
          : null}
      </div>
    </div>
  );
}
