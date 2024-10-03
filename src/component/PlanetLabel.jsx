import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

function PlanetLabel({ name }) {
  const spriteMaterial = useRef()

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    // Set font size based on planet name
    const fontSize = name === 'Sun' ? '3rem' : '5rem'
    context.font = `Bold ${fontSize} Public Sans`
    
    // Measure text width
    const textWidth = context.measureText(name).width
    
    // Set canvas size based on text width
    canvas.width = Math.max(270, textWidth + 20) // Add some padding
    canvas.height = 135

    // Set font again after resizing canvas
    context.font = `Bold ${fontSize} Arial`
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    
    // Center text horizontally
    const x = (canvas.width - textWidth) / 2
    context.fillText(name, x, 67);

    const texture = new THREE.CanvasTexture(canvas)
    spriteMaterial.current.map = texture
    spriteMaterial.current.needsUpdate = true
  }, [name])

  return (
    <sprite position={[0, 1.5, 0]} scale={[4, 2, 1]}>
      <spriteMaterial ref={spriteMaterial} transparent opacity={0.8} />
    </sprite>
  )
}

export default PlanetLabel