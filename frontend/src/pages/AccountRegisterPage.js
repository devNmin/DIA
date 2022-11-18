import React, { useContext, useRef, useState } from 'react';
import styles from './AccountRegisterPage.module.css';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/freelogo.png';
import {
  TabletView,
  // MobileView,
  isMobileOnly,
} from 'react-device-detect';
// import swal from "sweetalert2";

export default function AccountRegisterPage() {
  const { BASE_URL } = useContext(AuthContext);
  const [emailChecker, setEmailChecker] = useState('');
  // const [ageChecker, setAgeChecker] = useState(null);
  const emailInput = useRef();
  const passwordInput = useRef();
  const passwordCheckInput = useRef();
  const nameInput = useRef();
  // const ageInput = useRef();
  const history = useHistory();
  const [showAuth, setShowAuth] = useState(false);
  const [authKey, setAuthKey] = useState(null);
  const keyInput = useRef();
  const [canSignup, setCanSignup] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [emailDisable, setEmailDisable] = useState(false);
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [position, setPosition] = useState('');
  const heightHandler = (e) => {
    setHeight(e.target.value);
  };
  const weightHandler = (e) => {
    setWeight(e.target.value);
  };
  const AgeHandler = (e) => {
    setAge(e.target.value);
  };

  // const positionHandler = (value) => {
  //   value.preventDefault()
  //   setPosition(value)
  // }

  // let [formData, setformData] = useState({
  //   gender: ""
  // })
  // let [gender, setGender] = useState(null)

  // const handleChange = async (event) => {
  //   event.preventDefault()
  //   const value = event
  //   console.log(value);
  //   if (event === 0) {
  //     setGender('male')
  //   }else {
  //     setGender('female')
  //   }
  //   setformData({
  //     gender: value
  //   })
  // }

  // const maleChange = async (event) => {
  //   event.preventDefault()
  //   setGender('male')
  //   setformData({
  //     gender : 0
  //   })

  // }

  // const femaleChange = async (event) => {
  //   event.preventDefault()
  //   setGender('female')
  //   setformData({
  //     gender : 1
  //   })
  // }

  const emailcheckHandler = async (event) => {
    event.preventDefault();
    const emailsubmit = emailInput.current.value;
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 검증에 사용할 정규식 변수 regExp에 저장

    if (emailsubmit.length === 0) {
      alert('Please enter your email.');
      window.ReactAlert.showToast('Please enter your email.');
    } else if (emailsubmit.match(regExp) == null) {
      alert('Check your email.');
      window.ReactAlert.showToast('Check your email.');
    } else {
      await axios
        .get(BASE_URL + `email/check/${emailsubmit}`)
        .then((res) => {
          if (res.data.statusCode === 200) {
            setIsChecked(true);
            setEmailDisable(true);
          }
          alert(res.data.message);
          window.ReactAlert.showToast(res.data.message);
        })
        .catch((err) => {
          alert(err.response.data.error);
          window.ReactAlert.showToast(err.response.data.error);
        });
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    //console.log(formData.gender);

    const emailsubmit = emailInput.current.value;
    const passwordsubmit = passwordInput.current.value;
    const passwordchecksubmit = passwordCheckInput.current.value;
    const namesubmit = nameInput.current.value;
    // const agesubmit = ageInput.current.value;

    await fetch(BASE_URL + 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userEmail: emailsubmit,
        userPassword: passwordsubmit,
        userPassword2: passwordchecksubmit,
        userName: namesubmit,
        userAge: age,
        userWeight: weight,
        userPosition: position,
        userHeight: height,
      }),
    }).then((res) => {
      if (res.ok) {
        // new swal(
        //   'Register Success',
        //   'Welcome to DIA!'
        //   , 'success'

        // )
        history.push('/login');
        window.ReactAlert.showToast('Welcome to DIA!');
      } else {
        // new swal(
        //   'Oops!',
        //   'Something went wrong please check again',
        //   'error'
        // )
        window.ReactAlert.showToast(
          'Something went wrong please check again..'
        );
      }
    });
  };
  const EmailCheckHandler = (e) => {
    if (e.target.value.length >= 25) {
      setEmailChecker('Email is 25 characters or less.');
    } else {
      setEmailChecker('');
    }
  };
  // const AgeCheckHandler = (e) => {
  //   if (isNaN(e.target.value)) {
  //     setAgeChecker("This is not a number please check again!!")
  //   }else if(Number(e.target.value) >= 100) {
  //     setAgeChecker("Your age is too old..please check again")
  //   }else {
  //     setAgeChecker("")
  //   }
  // }

  const emailCheckerHandler2 = (e) => {
    var regExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    // 검증에 사용할 정규식 변수 regExp에 저장

    if (e.target.value.match(regExp) != null) {
      setEmailChecker('');
    } else {
      setEmailChecker('Your Email is not valid form please check again!');
    }
  };

  const emailAuthChecker = async (event) => {
    event.preventDefault();
    await axios
      .post(BASE_URL + 'mailsend', {
        email: emailInput.current.value,
      })
      .then((res) => {
        console.log(res.data);
        setAuthKey(res.data);
      });
    setShowAuth(true);
    alert('인증키를 이메일로 보내드렸습니다!');
    window.ReactAlert.showToast('인증키를 이메일로 보내드렸습니다!');
  };

  const keyValidChecker = async (e) => {
    e.preventDefault();
    if (keyInput.current.value === authKey) {
      alert('인증완료!');
      setCanSignup(true);
      setShowAuth(false);
      setIsChecked(false);
      window.ReactAlert.showToast('인증완료!');
    } else {
      alert('인증실패!');
      window.ReactAlert.showToast('인증실패!');
    }
  };

  return (
    <div className={styles.background}>
      <section className={styles.auth}>
        <img src={logo} alt="#" />
        <div className={styles.dia}>
          <h2>DI</h2>
          <h3>recting</h3>
          <h2>A</h2>
          <h3>ssistant</h3>
        </div>
        <form>
          <div className="Signup">
            <div>
              {/* 아이디 */}
              <div className={styles.control}>
                <h5> 이메일 </h5>
                <div className={styles.Email}>
                  {emailDisable ? (
                    <input
                      disabled
                      style={{ color: 'gray' }}
                      type="email"
                      maxLength="25"
                      name="signup_email"
                      ref={emailInput}
                      onKeyUp={EmailCheckHandler}
                      onBlur={emailCheckerHandler2}
                    />
                  ) : (
                    <input
                      type="email"
                      maxLength="25"
                      name="signup_email"
                      ref={emailInput}
                      onKeyUp={EmailCheckHandler}
                      onBlur={emailCheckerHandler2}
                    />
                  )}
                  {!isChecked ? (
                    <button
                      className={styles.EmailCheckBtn}
                      onClick={emailcheckHandler}
                    >
                      이메일
                      <br /> 중복확인
                    </button>
                  ) : (
                    <button
                      className={styles.authChecker}
                      onClick={emailAuthChecker}
                    >
                      인증번호<br/>받기
                    </button>
                  )}
                </div>
                <p
                  className={styles.emailChecker}
                  dangerouslySetInnerHTML={{ __html: emailChecker }}
                ></p>
                {showAuth ? (
                  <div >
                    <h5> Key </h5>
                    <div className={styles.Email} >
                      <input
                        id = {styles.keyCheck}
                        type="text"
                        maxLength="10"
                        name="auth_key"
                        ref={keyInput}
                      />
                      <button
                        className={styles.authChecker}
                        onClick={keyValidChecker}
                      >
                        이메일 <br />
                        인증하기
                      </button>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
              {/* 비밀번호 */}
              <div className={styles.control}>
                <h5 className={styles.password}> 비밀번호 </h5>
                <input
                  type="password"
                  maxLength="15"
                  name="signup_password"
                  ref={passwordInput}
                />
              </div>
              {/* 비밀번호2 */}
              <div className={styles.control}>
                <h5> 비밀번호 확인 </h5>
                <input
                  type="password"
                  maxLength="15"
                  name="signup_pswCheck"
                  ref={passwordCheckInput}
                />
              </div>
            </div>

            <div id="signup_section">
              {/* 이름 */}
              <div className={styles.control}>
                <h5> 이름 </h5>
                <input
                  type="text"
                  maxLength="10"
                  name="signup_name"
                  ref={nameInput}
                />
              </div>

              {/* <div className={styles.control}>
                <h5> Nickname </h5>
                <input type='text' maxLength='10' name='signup_nickname' ref={nicknameInput} />
              </div> */}
              {/* <div className={styles.control}>
                <h5> Age </h5>
                <input type='text' maxLength='10' onKeyUp={AgeCheckHandler} name='signup_name' ref={ageInput} />
                <p className={styles.emailChecker} dangerouslySetInnerHTML={{__html: ageChecker}}></p>                
              </div>              
              <br /> */}
              <br />
              <div className={styles.age}>
                <p>
                  나이: &nbsp;
                  {age}
                  <span id="weight" />
                </p>
                <input
                  className="weight-slider"
                  name="realAge"
                  id="myAge"
                  onChange={(e) => {
                    AgeHandler(e);
                  }}
                  type="range"
                  min={10}
                  max={90}
                  defaultValue={20}
                />
              </div>
              <div className={styles.age}>
                <p>
                  키: &nbsp;
                  {height}
                  <span id="height" /> cm
                </p>
                <input
                  className="height-slider"
                  name="realheight"
                  id="myHeight"
                  onChange={(e) => {
                    heightHandler(e);
                  }}
                  type="range"
                  min={120}
                  max={210}
                  defaultValue={160}
                />
              </div>
              <div className={styles.age}>
                <p>
                  몸무게: &nbsp;
                  {weight}kg
                  <span id="weight" /> 
                </p>
                <input
                  className="weight-slider"
                  name="realweight"
                  id="myWeight"
                  onChange={(e) => {
                    weightHandler(e);
                  }}
                  type="range"
                  min={40}
                  max={120}
                  defaultValue={60}
                />
              </div>
              <div className={styles.control}>
                <h5> 포지션 </h5>
                <div>
                  <button
                    className={styles.positionBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setPosition('FW');
                    }}
                    style={{
                      backgroundColor: position === 'FW' ? '#b3dc45' : null,
                    }}
                  >
                    FW
                  </button>

                  <button
                    className={styles.positionBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setPosition('MF');
                    }}
                    style={{
                      backgroundColor: position === 'MF' ? '#b3dc45' : null,
                    }}
                  >
                    MF
                  </button>
                  <button
                    className={styles.positionBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setPosition('DF');
                    }}
                    style={{
                      backgroundColor: position === 'DF' ? '#b3dc45' : null,
                    }}
                  >
                    DF
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />

          {canSignup ? (
            <div className={styles.actions}>
              <input onClick={submitHandler} type="submit" value="회원가입" />
            </div>
          ) : null}
        </form>

        <Link className={styles.linkP} to="/login">
          <p>이미 DIA 회원이신가요?</p>
        </Link>
      </section>
    </div>
  );
}
