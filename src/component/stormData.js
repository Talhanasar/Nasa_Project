const stormData = {
    earth: {
      description: "Earth is protected by a strong magnetic field, which shields the planet from the harmful effects of solar wind and geomagnetic storms. However, during intense geomagnetic storms, Earth's magnetosphere can be temporarily disturbed, leading to auroras and disruptions to satellites and power grids.",
      effects: {
        Auroras: "Geomagnetic storms can generate bright auroras near the poles by funneling charged particles along Earth's magnetic field lines, causing them to collide with atmospheric gases.",
        SatelliteDisruptions: "Geomagnetic storms can interfere with satellite operations, impacting communication systems, GPS accuracy, and weather forecasting.",
        PowerGridFailures: "Large geomagnetic storms can induce electric currents in power grids, potentially causing widespread outages and damage to electrical infrastructure."
      },
      may2024Storm: {
        Summary: "In May 2024, Earth experienced a powerful geomagnetic storm caused by an X12-class solar flare and a coronal mass ejection.",
        Auroras: "Auroras were visible at unusually low latitudes, providing stunning light displays far from the poles.",
        SatelliteIssues: "Several communication satellites experienced temporary malfunctions, and GPS systems showed slight inaccuracies during the peak of the storm.",
        powerGridRisks: "Power companies increased monitoring for unusual electrical activity, but no major blackouts occurred during this event."
      }
    },
    moon: {
      description: "The Sun releases a constant flow of charged particles (solar wind) that interacts with the Moon's surface. Unlike Earth, the Moon has no protective magnetic field or atmosphere, making it more susceptible to these particles.",
      effects: {
        ChemicalReactions: "Solar wind breaks bonds in oxygen atoms in lunar rocks, allowing them to combine with hydrogen from the solar wind to form hydroxyl (OH) molecules.",
        StaticElectricity: "Solar wind interaction generates static electricity, posing challenges for astronauts and equipment on the Moon.",
        SoilActivation: "Geomagnetic storms may activate lunar soil, releasing trapped gases and impacting future resource utilization."
      },
      may2024Storm: {
        Summary: "The geomagnetic storm in May 2024 had significant impacts on radiation levels for future lunar missions.",
        RadiationExposure: "Radiation levels increased during the storm, posing potential risks to upcoming lunar missions.",
        EffectsOnRegolith: "Research suggests solar storms can electrically charge lunar regolith, complicating future exploration."
      }
    },
    mars: {
      description: "NASA's MAVEN mission provides insights into the effects of solar storms on Mars' atmosphere, contributing to its ongoing erosion.",
      effects: {
        ErosionRates: "Mars loses about 100 grams of gas per second during typical conditions, which increases significantly during geomagnetic storms.",
        HabitabilityImpact: "Geomagnetic storms likely played a role in Mars losing its ability to retain water and impacting its potential for life.",
        IonEscape: "Solar wind accelerates ions in the atmosphere, causing them to escape into space from specific areas like polar plumes."
      },
      may2024Storm: {
        summary: "In May 2024, a solar storm hit Mars, with significant radiation levels and visible auroras.",
        RadiationLevels: "Curiosity recorded a peak radiation level of 8,100 micrograys, equivalent to about 30 chest X-rays.",
        Auroras: "Widespread auroras spanned the entire Martian atmosphere due to the lack of a global magnetic field.",
        TechnologicalDisruptions: "Mars Odyssey and Curiosity experienced temporary disruptions, including visual distortions and solar panel degradation."
      }
    }
  };
  
export default stormData;