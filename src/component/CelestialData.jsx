import * as THREE from 'three'

export const celestialBodies = {
    sun: {
      scale: 2.3,
      metalness: 0,
      roughness: 0.5,
      position: [0, -0.7, 0],
    },
    mercury: {
      scale: 1.6,
      metalness: 0.4,
      roughness: 0.7,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.8,
      ambientLightIntensity: 0.45
    },
    venus: {
      scale: 1.7,
      metalness: 0.3,
      roughness: 0.6,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.7,
      ambientLightIntensity: 0.3
    },
    earth: {
      scale: 1.5,
      metalness: 0,
      roughness: 0.4,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.6,
      ambientLightIntensity: 0.2
    },
    moon: {
      scale: 1.4,
      metalness: 0.3,
      roughness: 1,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.7,
      ambientLightIntensity: 0.5
    },
    mars: {
      scale: 1.7,
      metalness: 0.3,
      roughness: 0.7,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.5,
      ambientLightIntensity: 0.3
    },
    jupiter: {
      scale: 1.5,
      metalness: 0.2,
      roughness: 3,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.3,
      ambientLightIntensity: 0.17
    },
    saturn: {
      scale: 1,
      metalness: 0.3,
      roughness: 0.8,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.2,
      ambientLightIntensity: 0.2
    },
    uranus: {
      scale: 1.7,
      metalness: 0.3,
      roughness: 0.7,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.1,
      ambientLightIntensity: 0.25
    },
    neptune: {
      scale: 2,
      metalness: 0.4,
      roughness: 0.6,
      position: [0, -0.7, 0],
      directionalLightIntensity: 1.6,
      ambientLightIntensity: 0.4
    }
  };
  
export const celestialObjects = [
    {
        name: "Sun",
        title: "Sun's 3D model",
        description: "The Sun is a massive sphere of hot gases at the center of our solar system, about 4.6 billion years old and primarily composed of hydrogen and helium. With a diameter of 1.39 million kilometers, it could fit over a million Earths inside. Its core generates energy through nuclear fusion, powering all life on Earth. In about 5 billion years, the Sun will expand into a Red Giant before eventually becoming a White Dwarf."
    },
    {
        name: "Mercury",
        title: "Mercury's 3D model",
        description: "Mercury is the smallest planet in our solar system, with a diameter of 4,880 km, orbiting about 58 million km from the Sun. It's a rocky planet with no atmosphere, resulting in extreme temperature variations. Its cratered surface resembles the Moon. A year on Mercury lasts only 88 Earth days, making it the fastest orbiting planet in the solar system."
    },
    {
        name: "Venus",
        title: "Venus's 3D model",
        description: "Venus, Earth's 'sister planet', orbits 108 million km from the Sun and has a diameter of 12,104 km. It has a thick atmosphere rich in carbon dioxide, causing a runaway greenhouse effect with surface temperatures over 450°C - hotter than Mercury. Venus rotates slowly and in the opposite direction to most planets, with a Venusian year lasting 225 Earth days."
    },
    {
        name: "Earth",
        title: "Earth's 3D model",
        description: "Earth, the only known planet to support life, orbits 150 million km from the Sun and has a diameter of 12,742 km. It has the perfect combination of water, an oxygen-rich atmosphere, and moderate temperatures to sustain life. Earth's surface is 71% water, and it completes an orbit around the Sun every 365.25 days."
    },
    {
        name: "Mars",
        title: "Mars's 3D model",
        description: "Mars, the 'Red Planet', orbits 228 million km from the Sun and has a diameter of 6,779 km. Its reddish appearance is due to iron-rich dust on its surface. Mars has polar ice caps, large valleys that may have once held water, and a thin atmosphere mostly composed of carbon dioxide. A Martian year lasts 687 Earth days. It's a prime target for exploration and potential future human habitation."
    },
    {
        name: "Jupiter",
        title: "Jupiter's 3D model",
        description: "Jupiter, the largest planet in our solar system, orbits 778 million km from the Sun and has a diameter of 139,820 km. This gas giant is primarily composed of hydrogen and helium. It features a massive storm known as the Great Red Spot that has raged for centuries. Jupiter has over 75 moons, including Ganymede, the largest moon in the solar system. A Jovian year lasts about 12 Earth years."
    },
    {
        name: "Saturn",
        title: "Saturn's 3D model",
        description: "Saturn, famous for its prominent ring system, orbits 1.43 billion km from the Sun and has a diameter of 116,460 km. Like Jupiter, it's a gas giant primarily composed of hydrogen and helium. Saturn has over 80 moons, including Titan, which has a thick atmosphere and liquid methane lakes. A year on Saturn lasts 29.5 Earth years."
    },
    {
        name: "Uranus",
        title: "Uranus's 3D model",
        description: "Uranus, an ice giant, orbits 2.87 billion km from the Sun and has a diameter of 50,724 km. It's composed mainly of water, ammonia, and methane ice. Uranus has a unique tilt of 98 degrees, meaning it orbits the Sun on its side. Its blue color comes from methane in the atmosphere. A Uranian year lasts 84 Earth years."
    },
    {
        name: "Neptune",
        title: "Neptune's 3D model",
        description: "Neptune, the farthest known planet in our solar system, orbits 4.5 billion km from the Sun and has a diameter of 49,244 km. It's an ice giant with the fastest winds in the solar system, reaching 2,100 km/h. Its vibrant blue color is due to methane in its atmosphere. Neptune has 14 known moons, including Triton, which has geysers of nitrogen gas. A Neptunian year lasts 165 Earth years."
    }
];

export const createPlanets = (textures) => [
  {
    name: "Mercury",
    radius: 0.38,
    distance: 10,
    speed: 0.01,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.mercury
    }),
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.95,
    distance: 15,
    speed: 0.007,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.venus
    }),
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.earth
    }),
    moons: [
      {
        name: "Moon",
        radius: 0.27,
        distance: 2,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.53,
    distance: 30,
    speed: 0.003,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.mars
    }),
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 1.5,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 2,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 1.12,
    distance: 45,
    speed: 0.001,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.jupiter
    }),
    moons: [],
  },
  {
    name: "Saturn",
    radius: 0.945,
    distance: 60,
    speed: 0.0008,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.saturn
    }),
    hasRing: true,
    moons: [],
  },
  {
    name: "Uranus",
    radius: 0.4,
    distance: 75,
    speed: 0.0005,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.uranus
    }),
    moons: [],
  },
  {
    name: "Neptune",
    radius: 0.388,
    distance: 90,
    speed: 0.0004,
    material: new THREE.MeshStandardMaterial({ 
      map: textures.neptune
    }),
    moons: [],
  },
];