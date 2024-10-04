import React from 'react'
import StormSearch from '../component/StormSearch'
import '../css/stormForcast.css'

const StormForcast = () => {
  
  return (
    <div className="storm-forecast-page">
      <div className="content-container">
        <h1>Geomagnetic Storm Forecast</h1>
        <p>
          Welcome to our dedicated platform for geomagnetic storm forecasting, where we utilize NASA data to provide timely and accurate information about upcoming geomagnetic events. Our goal is to equip you with essential insights into how these storms can affect Earth’s environment, technology, and daily life.
        </p>
        <p>
          In the upcoming years, geomagnetic storm activity is predicted to rise, especially as we near the solar maximum expected around mid-2025. Current forecasts suggest increased solar activity, featuring numerous strong solar flares and coronal mass ejections (CMEs) that may affect Earth. For example, an X7.1 flare on October 1, 2024, has led to geomagnetic storm alerts for early October due to potential CME impacts. The strongest storms could reach G3 levels, enhancing auroral visibility at lower latitudes. Continuous monitoring by NASA and NOAA will keep the public informed about these developments. After this peak, a significant decline in solar activity is anticipated, possibly resulting in reduced solar irradiance and increased geomagnetic stability by the late 2020s. Some studies indicate that solar activity could decrease by up to 60% during the 2030s, reminiscent of historical cooling periods like the Maunder Minimum, which could significantly affect Earth's climate and atmospheric conditions.
        </p>
        <p>
          You can access daily updates on geomagnetic storm forecasts from NOAA's dedicated Storm Forecasting website at NOAA SWPC <a href="https://www.swpc.noaa.gov/" target="_blank" rel="noopener noreferrer">(https://www.swpc.noaa.gov/)</a>. This site provides real-time data on solar activity, including information on coronal mass ejections and auroras, helping you stay informed about potential impacts on Earth.
        </p>
        <div className="search-container">
          <StormSearch />
        </div>
      </div>
    </div>
  )
}

export default StormForcast
