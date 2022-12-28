import { useBox } from "@react-three/cannon";
import React, { useRef, useEffect } from "react";
import { useKeyboard } from "../hooks/Keyboard";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
// import { useHistory } from 'react-router-dom';
import {Navigate, useNavigate} from "react-router-dom"

const speed_2 = 4


const Hurdle = () => {
    
    // const navigate = useNavigate();

    const [ref, api_2] = useBox(() => ({
        mass: 1,
        type: "Dynamic",
        position: [4, 5, 3]
    }))
    
    const vel_2 = useRef([0,0,0])
    const {stepBackward_2, stepForward_2, stepRight_2, stepLeft_2} = useKeyboard()
    useEffect(() => {
        api_2.velocity.subscribe((v) => vel_2.current = v)
        console.log(pos_2)
    }, [api_2.velocity])

    const pos_2 = useRef([0, 0, 0])
    useEffect(() => {
        api_2.position.subscribe((p) => pos_2.current = p)
    }, [api_2.position])

    useFrame(() => {
        const direction = new Vector3()
        const frontVector = new Vector3(
            0,
            0,
            (stepBackward_2 ? 1 : 0) - (stepForward_2 ? 1 : 0)
        )
        const sideVector = new Vector3(
            (stepLeft_2 ? 1 : 0) - (stepRight_2 ? 1 : 0),
            0,
            0,
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(speed_2)
            .applyEuler(camera.rotation)

            api_2.velocity.set(direction.x,vel_2.current[1],direction.z)
        // console.log(pos_2)


    })
    const {camera} = useThree()
    const itemPos = [Math.round(pos_2.current[0]), Math.round(pos_2.current[1]), Math.round(pos_2.current[2])];
    console.log(itemPos)
    if(itemPos[2] > 10 || itemPos[0] > 10 || itemPos[2] < -10 || itemPos[0] < -10) {
        console.log("Blue lose")
        alert("Red Won")
    }

    return (
        <>
            <mesh ref={ref}>
                <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial color="blue" attach='material' />
            </mesh>
        </>
    )
}

export default Hurdle;