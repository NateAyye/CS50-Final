import React, { useState } from 'react'

const Modal = () => {

    const [modal, setModal] = useState(false)
    const toggleModal = () => {
        setModal(!modal)
    }

  return (
    <>
      <button 
        onClick={toggleModal}
        className="btn-modal"
      >Open</button>
    </>
  )
}

export default Modal
