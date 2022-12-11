import Image from 'next/image'
import React, { useState } from 'react'
import nft from '../../public/images/ai-bg-art.png'
import modalStyles from './modal.module.css'

const Modal = ({open, onClose, onSave, editModal}) => {
  if(!open) return null
  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
          <Image className={modalStyles.modalImage} src={nft} alt=''/>
          <div className={modalStyles.modalRight}>
              <p onClick={onClose} className={modalStyles.closeBtn}>X</p>
              <div className={modalStyles.content}>
                <label for="startTime">Start Time</label>
                <input id='startTime' className={modalStyles.startTime} type="time" placeholder="Start time" />
                <br/>
                <label for="endTime">End Time</label>
                <input id='endTime' className={modalStyles.endTime} type="time" placeholder="Start time" />
                <br/>
                <label for="endTime">Tips</label>
                <input id='tips' className={modalStyles.tipAmount} type="number" placeholder="Tip" />
              </div>
              <div className={modalStyles.btnContainer}>
                {editModal ? (
                  <button className={modalStyles.editBtn}>Edit</button>
                ):(
                  <button onClick={onSave} className={modalStyles.saveBtn}>Save</button>
                )}
              </div>
          </div>
      </div>
    </div>
  )
}

export default Modal
