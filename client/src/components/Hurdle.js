import { useBox } from "@react-three/cannon";
import React from "react";

const Hurdle = () => {

    const [ref] = useBox(() => ({
        mass: 1,
        type: "Dynamic",
        position: [4, 0.7, 3]
    }))

    return(
        <>
        <mesh ref={ref}>
                <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial color="blue" attach='material' />
            </mesh>
        </>
    )
}

export default Hurdle;