import React from "react";
import { useSphere } from "@react-three/cannon";

const Ball = () => {

    const [ref] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 8, 3]
    }))

    return(
        <>
        <mesh ref={ref}>
        <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial color="hotpink" attach='material' />
        </mesh>
        </>
    )
}

export default Ball;