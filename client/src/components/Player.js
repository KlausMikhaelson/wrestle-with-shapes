import React, { useEffect, useRef } from "react";
import { MeshBasicMaterial } from "three";
import { useBox } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { useKeyboard } from "../hooks/Keyboard";


const speed = 4

const Player = () => {

    const [ref, api] = useBox(() => ({
        mass: 1,
        type: "Dynamic",
        position: [0, 4, 3]
    }))
    const vel = useRef([0, 0, 0])
    const { stepBackward, stepForward, stepRight, stepLeft, jump } = useKeyboard()
    useEffect(() => {
        api.velocity.subscribe((v) => vel.current = v)
    }, [api.velocity])

    const pos = useRef([0, 0, 0])
    useEffect(() => {
        api.position.subscribe((p) => pos.current = p)
    }, [api.position])

    useFrame(() => {
        const direction = new Vector3()
        const frontVector = new Vector3(
            0,
            0,
            (stepBackward ? 1 : 0) - (stepForward ? 1 : 0)
        )
        const sideVector = new Vector3(
            (stepLeft ? 1 : 0) - (stepRight ? 1 : 0),
            0,
            0,
        )

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(speed)
            .applyEuler(camera.rotation)

            api.velocity.set(direction.x,vel.current[1],direction.z)
    })

    const { camera } = useThree()

    return (
        <>
            <mesh ref={ref}>
                <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial color="gray" attach='material' />
            </mesh>
        </>
    )
}

export default Player;