import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useLoader } from '@react-three/fiber'

function PlanetLabel({ name }) {
  const spriteMaterial = useRef()

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 256
    canvas.height = 128

    context.font = 'Bold 4rem Arial'
    context.fillStyle = 'rgba(255, 255, 255, 1)'
    context.fillText(name, 4, 64)

    const texture = new THREE.CanvasTexture(canvas)
    spriteMaterial.current.map = texture
    spriteMaterial.current.needsUpdate = true
  }, [name])

  return (
    <sprite position={[0, 1.5, 0]} scale={[5, 2.5, 1]}>
      <spriteMaterial ref={spriteMaterial} transparent opacity={0.8} />
    </sprite>
  )
}

export default PlanetLabel