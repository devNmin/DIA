import React, { useState } from 'react'
import styles from './MainPage.module.css'
import Modal from '../components/MainPage/Modal'
// import { useHistory } from 'react-router-dom';
import './MainPageCustom.scoped.css'
import {
  TabletView,
  // MobileView,
  isMobileOnly
} from "react-device-detect"
import MyPage from './MyPage'
import TeamMakePage from './TeamMakePage'

export default function MainPage() {
  // const history = useHistory()
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const closeModal = () => {
    setModalIsOpen(false)
  }

  // const clickCanvasButton =  () => {
  //   history.push('/teammake')
  // }
  // const clickMyPageButton = () => {
  //   history.push('/mypage')
  // }
  const renderContent = () => {
    if (isMobileOnly) {
      return <MyPage />
    } else {
      return (
      <TeamMakePage />
      )
    }
  }
  return (
    <div >
      <TabletView>
        {modalIsOpen && (
          <Modal $visible={modalIsOpen} closable={true} maskClosable={true} onClose={closeModal} />
        )}
      </TabletView>
      {renderContent()}
      {/* <div id="menu-wrapper">
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
        </div> */}
    </div>
  )
}

