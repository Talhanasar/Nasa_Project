import React from 'react';
import '../css/mainStormData.css';

const MainStormData = ({ data }) => {

  const { description, mechanism, phases, classification, solarActivity, effects, may2024Storm } = data;

  return (
    <div className="main-storm-data-container">
      {/* General Description */}
      <section className="section">
        <h1 className="title">Geomagnetic Storm Overview</h1>
        <p>{description}</p>
      </section>

      {/* Mechanism */}
      <section className="section">
        <h2 className="subtitle">Mechanism</h2>
        <p>{mechanism}</p>
      </section>

      {/* Phases */}
      <section className="section">
        <h2 className="subtitle">Storm Phases</h2>
        <ul>
          {Object.entries(phases).map(([phase, description]) => (
            <li key={phase}><strong>{phase}:</strong> {description}</li>
          ))}
        </ul>
      </section>

      {/* Classification */}
      <section className="section">
        <h2 className="subtitle">Storm Classification</h2>
        <ul>
          {Object.entries(classification).map(([type, description]) => (
            <li key={type}><strong>{type}:</strong> {description}</li>
          ))}
        </ul>
      </section>

      {/* Solar Activity */}
      <section className="section">
        <h2 className="subtitle">Solar Activity</h2>
        <p>{solarActivity.description}</p>
        <h3>Solar Flares</h3>
        <p>{solarActivity.solarFlares.description}</p>
        <ul>
          {Object.entries(solarActivity.solarFlares.effects).map(([effect, description]) => (
            <li key={effect}><strong>{effect}:</strong> {description}</li>
          ))}
        </ul>
        <p><strong>Solar Cycle:</strong> {solarActivity.solarCycle}</p>
      </section>

      {/* Effects */}
      <section className="section">
        <h2 className="subtitle">Effects of Geomagnetic Storms</h2>
        <ul>
          {Object.entries(effects).map(([effect, description]) => (
            <li key={effect}><strong>{effect}:</strong> {description}</li>
          ))}
        </ul>
      </section>

      {/* May 2024 Storm */}
      <section className="section may-2024-storm">
        <h2 className="subtitle">May 2024 Storm</h2>
        <p>{may2024Storm.Summary}</p>
        <ul>
          {Object.entries(may2024Storm).map(([key, value]) => (
            key !== 'Summary' && <li key={key}><strong>{key.replace(/([A-Z])/g, ' $1').trim()}:</strong> {value}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MainStormData;
