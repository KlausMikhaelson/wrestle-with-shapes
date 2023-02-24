import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { RepeatWrapping } from "three"
import { useKeyboard } from "../hooks/Keyboard";
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { Html, Text } from "@react-three/drei";


const speed = 4

do{
    var name1 = prompt("What should I call you player-1 ?")
} while (name1 !== null && name1 === "")

const Player = () => {


    const player1 = useLoader(TextureLoader, 'texture.jpg')
    player1.wrapS = RepeatWrapping
    player1.wrapT = RepeatWrapping
    player1.repeat.set(1, 1)

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

        api.velocity.set(direction.x, vel.current[1], direction.z)
    })
    const itemPos_2 = [Math.round(pos.current[0]), Math.round(pos.current[1]), Math.round(pos.current[2])];
    console.log(itemPos_2)
    if (
        // itemPos_2[2] > 10 || itemPos_2[0] > 10 || itemPos_2[2] < -10 || itemPos_2[0] < -10
        itemPos_2[1] < 0
    ) {
        console.log("Red lose")
        alert(`${name1} died, Enter to restart`)
        window.location.reload()
    }

    const { camera } = useThree()

    return (
        <>
            <mesh ref={ref}>
                <Html>
                    <p style={{ padding: "5px", color: "hotpink" }}>{name1}</p>
                </Html>

                <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial map={player1} color="#202020" attach='material' />
                {/* <Text
                    position={[0, 1, 0]}
                    color="hotpink"
                    anchorX="center"
                    anchorY="middle"
                    fontSize="0.5"
                    >{name1}</Text> */}
            </mesh>
        </>
    )
}

export default Player;