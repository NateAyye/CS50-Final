import Image from 'next/image'
import React, { useState } from 'react'
import nft from '../../public/images/ai-bg-art.png'

const Modal = ({open}) => {
  if(!open) return null
  return (
    <div className='overlay'>
      <div className='modalContainer'>
          <Image src={nft} alt=''/>
          <div className='modalRight'>
              <p className='closeBtn'>X</p>
              <div className='content'>
                <label for="startTime">Start Time</label>
                <input className='startTime' type="time" placeholder="Start time" />
                <br/>
                <label for="endTime">End Time</label>
                <input className='endTime' type="time" placeholder="Start time" />
                <br/>
                <label for="endTime">End Time</label>
                <input className='tipAmount' type="number" placeholder="Tip" />
              </div>
              <div className='btnContainer'>
                <button className='editBtn'>Edit</button>
                <button className='saveBtn'>Save</button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Modal
