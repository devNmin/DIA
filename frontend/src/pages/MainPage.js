import React, { useState } from 'react'
import Modal from 'react-modal'
import styles from './MainPage.module.css'
import { useHistory } from 'react-router-dom';
import './MainPageCustom.scoped.css'

export default function MainPage() {
  const history = useHistory()
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const clickCanvasButton =  () => {
    history.push('/teammake')
  }
  const clickMyPageButton = () => {
    history.push('/mypage')
  }
  return (
    <div className={styles.mainPage}>      
      
      <Modal className={styles.Modal} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <button className={styles.modalX} onClick={() => setModalIsOpen(false)}>X</button>
         <br />
        <div className={styles.modalText}>
          This is Modal content
          <p>z</p>\<p>zz</p>
        </div>
        <div className={styles.modalButton}>
          <button className={styles.modalClose} onClick={() => setModalIsOpen(false)}>Modal close</button>
        </div>
      </Modal>
      <div id="menu-wrapper">
          <section id="big-menu" className="container-fluid">
            <div className="d-flex flex-row fadein" style={{ 'display' : 'flex', 'justifyContent' : 'center'}}>
              <div className="p-2 item first" onClick={() => clickCanvasButton()}>
                <h3>전술보드 들어가기</h3>
              </div>
              <div className="p-2 item second" onClick={() => clickMyPageButton()}>
                <h3>마이페이지</h3>
              </div>
            </div>            
          </section>          
        </div>


        {/* <button className={styles.mainButtons} onClick={() => clickCanvasButton()}>
          전술보드 들어가기 
        </button>
        <button className={styles.mainButtons}>
          마이페이지
        </button> */}
    </div>
  )
}

