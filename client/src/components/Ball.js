import React from "react";
import { useSphere } from "@react-three/cannon";

const Ball = () => {

    const [ref] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: [2, 2, 3],
        args: [0.5, 0.5],
        onCollideBegin: console.log("FUckk")
    }))

    return(
        <>
            <mesh ref={ref} scale={0.5}>
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