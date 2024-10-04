import React, { useState, useEffect } from 'react'
import '../css/Geomagnetic.css'

const Geomagnetic = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const video = document.querySelector('video')
    video.addEventListener('loadeddata', () => {
      setIsLoading(false)
    })

    return () => {
      video.removeEventListener('loadeddata', () => {
        setIsLoading(false)
      })
    }
  }, [])

  return (
    <div className='main-geomagnetic'>
      {isLoading && (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      )}
      <video src="/video/geomagnetic storm.mp4" autoPlay loop muted></video>
    </div>
  )
}

export default Geomagnetic
