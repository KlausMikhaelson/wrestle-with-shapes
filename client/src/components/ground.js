import React from 'react'
import { useBox, usePlane } from '@react-three/cannon'
import { useLoader } from '@react-three/fiber'
import { NearestFilter, RepeatWrapping } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

const Ground = () => {

  const PlaneG = useLoader(TextureLoader, 'planetexture.jpg')
  PlaneG.wrapS = RepeatWrapping
  PlaneG.wrapT = RepeatWrapping
  PlaneG.repeat.set(20,20)

	const [ref] = useBox(() => ({
		rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0], mass: 10, type: "Static", args: [15, 15]
	}))
    
  return (
    <mesh ref={ref}>
        <boxBufferGeometry attach='geometry' args={[15, 15, 0]} /> 
        <meshStandardMaterial map={PlaneG} attach='material'/>
    </mesh>
  )
}

export default Ground