import {Canvas} from "@react-three/fiber"
import React from "react"

const Ground = () => {
    return(
        <>
        <mesh>
            <planeBufferGeometry args={[100, 100]}/>
            <meshNormalMaterial color="hotpink"/>
        </mesh>
        </>
    )
}

export default Ground