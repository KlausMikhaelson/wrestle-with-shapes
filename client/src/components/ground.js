import React from 'react'
import { useBox, usePlane } from '@react-three/cannon'

const Ground = () => {
	const [ref] = useBox(() => ({
		rotation: [-Math.PI / 2, 0, 0], position: [0, 0, 0], mass: 10, type: "Static", args: [20, 20]
	}))
    
  return (
    <mesh ref={ref}>
        <boxBufferGeometry attach='geometry' args={[20, 20, 0]} /> 
        <meshStandardMaterial color="hotpink" attach='material'/>
    </mesh>
  )
}

export default Ground