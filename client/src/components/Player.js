import React from "react";
import { MeshBasicMaterial } from "three";
import { useBox } from "@react-three/cannon";


const Player = () => {
    const [ref] = useBox(() => ({
        mass: 1
    }))

    return(
        <>
        <mesh ref={ref}>
            <boxBufferGeometry attach="geometry"/>
            <meshStandardMaterial color="gray" attach='material'/>
        </mesh>
        </>
    )
}

export default Player;