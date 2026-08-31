import React, { useState } from 'react'
import LazyVideo from '../component/LazyVideo'
import '../css/Geomagnetic.css'

const Geomagnetic = () => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className='main-geomagnetic'>
      {isLoading && (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
      )}
      <LazyVideo
        src="/video/geomagnetic-storm.mp4"
        poster="/video/posters/geomagnetic-storm.webp"
        onCanPlay={() => setIsLoading(false)}
      />
    </div>
  )
}

export default Geomagnetic
