import React from "react";
import { useBox, useSphere } from "@react-three/cannon";

const Ball = () => {

    const [ref, api_2] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [2, 8, 3],
        args: [1,1]
    }))

    return(
        <>
            <mesh ref={ref}>
                <sphereBufferGeometry attach="geometry" />
                <meshStandardMaterial color="hotpink" attach='material' />
                {/* <Text
                    position={[0, 1, 0]}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    fontSize="0.5"
                    >{name2}</Text> */}
            </mesh>
        </>
    )
}

export default Ball;