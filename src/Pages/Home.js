import React, { useState } from 'react'
import { memo } from 'react'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

export default memo(function Home() {
  const [slide, setSlide] = useState(0)
  return (
    <div className='home'>
      <button className='minus' onClick={() => { setSlide(slide === 0 ? slide - 400 : slide + 100) }}><BsChevronLeft /></button>
      <div className='slider-container'>
        <div className='slider' style={{ left: `${slide}%` }}>
          <div className='img1'></div>
          <div className='img2'></div>
          <div className='img3'></div>
          <div className='img4'></div>
          <div className='img5'></div>
        </div>
      </div>
      <button className='plus' onClick={() => { setSlide(slide === -400 ? slide + 400 : slide - 100) }}><BsChevronRight /></button>
    </div>
  )
}
)