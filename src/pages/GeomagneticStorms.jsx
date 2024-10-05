import React from 'react'
import { useParams } from 'react-router-dom'
import stormData from '../component/stormData'
import '../css/geomagneticStorms.css'

const GeomagneticStorms = () => {
    const { planet } = useParams()
    const planetData = stormData[planet?.toLowerCase()];

    if (!planetData) {
        return (
            <div className="geomagnetic-storms-container">
                <h1>Planet Not Found</h1>
                <p>Sorry, we don't have data for the planet "{planet}".</p>
            </div>
        );
    }

    return (
        <div className="geomagnetic-storms-container">
            <div className="geomagnetic-storms">
                <h1 className="title">{planet === 'main'? "Geomagnetic Storm" : `Geomagnetic Storm On Perspective Of ${planet.toLowerCase().replace(/^\w/, c => c.toUpperCase())}`}</h1>
                <p className="description">{planetData.description}</p>

                {Object.entries(planetData).map(([key, value]) => (
                    key !== 'description' && (
                        <React.Fragment key={key}>
                            <h2 className="subtitle">{key} :</h2>
                            <p className="description-rest">{value.description}</p>
                            <ul className="effects-list">
                                {Object.entries(value).map(([subKey, subValue]) => (
                                    subKey !== 'description' && (
                                        <li key={subKey}><strong>{subKey}:</strong> {subValue}</li>
                                    )
                                ))}
                            </ul>
                        </React.Fragment>
                    )
                ))}
            </div>
        </div>
    );
}

export default GeomagneticStorms
