import React, { useState } from 'react'
import Modal from '../components/MainPage/Modal'
import styles from './MainPage.module.css'
import { Link } from 'react-router-dom'

export default function MainPage(props) {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const closeModal = () => {
    setModalIsOpen(false)
  }


  return (
    <div className={styles.mainPage}>
      {modalIsOpen && (
        <Modal $visible={modalIsOpen} closable={true} maskClosable={true} onClose={closeModal} />
      )}
      <Link to='/main'>
        <button className={styles.mainButtons}>
          전술보드 들어가기
        </button>
      </Link>
      <Link to='/mypage'>
        <button className={styles.mainButtons}>
          마이페이지
        </button>
      </Link>
    </div>
  )
}
