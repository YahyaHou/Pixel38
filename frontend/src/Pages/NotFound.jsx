import React from 'react'
import PixelNotFound from "../assets/images/pixelnotfound.svg";
import "../Styles/NotFound.css"
function NotFound() {
  return (

    <div className='not-found'>
        <img src={PixelNotFound} alt="Not Found"/>
    </div>
  )
}

export default NotFound