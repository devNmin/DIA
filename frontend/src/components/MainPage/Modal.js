import React, { useEffect } from 'react';
import styles from './Modal.module.css'

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
            <p>ㅋㅋㅋㅋ</p>
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