import React, { useEffect } from 'react';
import styles from './Modal.module.css'
import teams from '../../assets/선수팀등록.png'
import teams2 from '../../assets/유저포메이션등록.png'
import ip from '../../assets/IP연결학.png'
import ip2 from '../../assets/연결중입니다.png'
import make from '../../assets/팀구성매칭.png'
import make2 from '../../assets/팀구성하기.png'


function Modal({ onClose, maskClosable, closable, visible }) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e)
    }
  }

  // 팝업창 하루 안보기
  const visited_before_date = localStorage.getItem('VisitedCookie')
  const visited_now_Date = Math.floor(new Date().getDate())

  useEffect(() => {
    if (visited_before_date !== null) {
      // 날짜가 같을 경우
      if (visited_before_date === visited_now_Date) {
        localStorage.removeItem('VisitedCookie')
        onClose(true)
      }
      // 날짜가 다를 경우
      if (visited_before_date !== visited_now_Date) {
        onClose(false)
      }
    }
  }, [visited_before_date])
  // 하루동안 팝업 닫기
  const Dayclose = (e) => {
    if (onClose) {
      onClose(e)

      const expiry = new Date()
      const expiryDate = expiry.getDate() + 1
      localStorage.setItem('VisitedCookie', expiryDate)
    }
  }

  const close = (e) => {
    if (onClose) {
      onClose(e)
    }
  }

  return (
    <div>
      {visible === false
      ? <></>
      :<div
        className={styles.modalWrapper}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <div className={styles.modal_inner}>
          <div>
            <h1 style={{marginBottom: 10, color: 'yellowgreen'}}>DIA 사용 설명서</h1>
            <div className={styles.teams}>
              <p style={{color: 'yellow'}}>1. 유저 등록하기</p>
              <p>경기에 뛰는 선수들을 검색 후 해당 선수들을 터치하여 팀 등록을 완료합니다.</p>
              <img src={teams} alt='#' />
              <img src={teams2} alt='#' />
            </div>
            <div className={styles.teams}>
              <p style={{color: 'yellow'}}>2. ip연결하기</p>
              <p>DIA.exe 파일에서 알려준 해당 서버의 IP와 PORT번호를 해당 페이지에 입력합니다.</p>
              <img src={ip} alt='#' />
              <img src={ip2} alt='#' />
            </div>
            <div className={styles.teams}>
              <p style={{color: 'yellow'}}>3. 팀 구성하기</p>
              <p>팀 구성하기 캔버스에 있는 선수들의 위치는 처음 서버와 연결할때의 위치입니다.</p>
              <p>당시 위치와 선수들을 비교하여 위치에 맞는 선수들로 등록을 합니다.</p>
              <img src={make2} alt='#' />
              <img src={make} alt='#' />
            </div>
            <div>
              
            </div>
          </div>
          <div className={styles.modal_inner2}>
            {closable && (
              <div className={styles.closeStyle}>
                <span className={styles.closebutton} onClick={Dayclose}>하루 닫기</span>
                <span className={styles.closebutton} onClick={close}>닫기</span>
              </div>
            )}
          </div>
        </div>
      </div>}
    </div>
  );
}

export default Modal;