import React from 'react'
import { useParams } from 'react-router-dom'
import stormData from '../component/stormData'
import '../css/geomagneticStorms.css'

const GeomagneticStorms = () => {
    const { planet } = useParams()
    const planetData = stormData[planet?.toLowerCase()];
    console.log('planetData:', planetData);
    console.log('may2024Storm:', planetData?.may2024Storm);

    return (
        <div className="geomagnetic-storms-container">
            <div className="geomagnetic-storms">
                <h1 className="title">Geomagnetic Storms on {planet.toLowerCase().replace(/^\w/, c => c.toUpperCase())}</h1>
                <p className="description">{planetData.description}</p>

                <h2 className="subtitle">Effects:</h2>
                <ul className="effects-list">
                    {Object.entries(planetData.effects).map(([key, value]) => (
                        <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</li>
                    ))}
                </ul>

                <h2 className="subtitle">May 2024 Storm:</h2>
                <p className="storm-summary">{planetData.may2024Storm.Summary}</p>
                <ul className="storm-details">
                    {Object.entries(planetData.may2024Storm).map(([key, value]) => (
                        key !== 'Summary' && <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default GeomagneticStorms
