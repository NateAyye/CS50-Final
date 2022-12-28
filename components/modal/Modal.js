import Image from 'next/image'
import React from 'react'
import nft from '../../public/images/ai-bg-art.png'
import modalStyles from './modal.module.css'

const Modal = ({tipAmount, open, onClose, onSave, editModal, editingModal, endTime, startTime, eventSelectStart, eventSelectEnd}) => {
  if(!open) return null
  const date = new Date(eventSelectStart)

  
  return (
    <div className={modalStyles.overlay}>
      <div className={modalStyles.modalContainer}>
          <Image className={modalStyles.modalImage} src={nft} alt=''/>
          <div className={modalStyles.modalRight}>
              <p onClick={onClose} className={modalStyles.closeBtn}>X</p>
              <div className={modalStyles.content}>
                {editModal && (
                  <div>
                    <label>Shift Overview</label>
                    <br/>
                    <label>{date.toDateString()}</label>
                  </div>
                )}
                <div className={modalStyles.flexcontent}>
                  <label htmlFor="startTime">Start Time</label>
                  {editModal ? (
                    (startTime && <label id='startTime' className={modalStyles.startTime} type="time" placeholder="Start time" ><strong>{startTime.value.toString()}</strong></label>)
                  ):(
                    <input id='startTime' className={modalStyles.startTime} type="time" placeholder="Start time" />
                  )}
                </div>
                <br/>
                <div className={modalStyles.flexcontent}>
                  <label htmlFor="endTime">End Time</label>
                  {editModal ? (
                    (endTime && <label id='endTime' className={modalStyles.endTime} type="time" placeholder="Start time"><strong>{endTime.value.toString()}</strong></label>)

                  ):(
                    <input id='endTime' className={modalStyles.endTime} type="time" placeholder="Start time" />
                  )}
                </div>
                <br/>
                <div className={modalStyles.flexcontent}>
                  <label htmlFor="tips">Tips</label>
                  {editModal ? (
                    (tipAmount && <label id='tips' className={modalStyles.tipAmount} type="number" placeholder="Tip" >&emsp;$<strong>{tipAmount.toString()}</strong></label>)
                  ):(
                    <input id='tips' className={modalStyles.tipAmount} type="number" placeholder="Tip" />
                  )}
                </div>
              </div>
              <div className={modalStyles.btnContainer}>
                {editModal ? (
                  <button onClick={editingModal} className={modalStyles.editBtn}>Edit</button>
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
