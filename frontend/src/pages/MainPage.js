import React, { useState } from 'react'
import Modal from 'react-modal'

export default function MainPage() {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      This is Modal content
      <button onClick={()=> setModalIsOpen(false)}>Modal close</button>
      </Modal>
      <button>
        전술보드 들어가기
      </button>

      <button>
        마이페이지
      </button>

    </div>
  )
}
