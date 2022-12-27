import React from 'react'
import { usePlane } from '@react-three/cannon'

const Ground = () => {
	const [ref] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0], position: [0, -0.5, 0], mass: 10, type: "Static"
	}))
    
  return (
    <mesh ref={ref}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} /> 
        <meshStandardMaterial attach='material'/>
    </mesh>
  )
}

export default Ground