import { useBox } from "@react-three/cannon";
import React, { useRef, useEffect, useState } from "react";
import { useKeyboard } from "../hooks/Keyboard";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader"
import { NearestFilter, RepeatWrapping } from "three";
import { io } from "socket.io-client";
import {Text} from "@react-three/drei"
import ReactGA from "react-ga"

const socket = io.connect("http://localhost:3001")
ReactGA.pageview(window.location.pathname + window.location.search)


const speed_2 = 4

const name2 = prompt("What shuld I call you player-2 ?")

const Hurdle = () => {
    // const [setClients, clients] = useState({})

    const Player2 = useLoader(TextureLoader, 'texture1.jpg')
    Player2.wrapS = RepeatWrapping
    Player2.wrapT = RepeatWrapping
    Player2.repeat.set(1, 1)

    const { id } = socket

    const [ref, api_2] = useBox(() => ({
        mass: 1,
        type: "Dynamic",
        position: [4, 8, 3]
    }))

    const vel_2 = useRef([0, 0, 0])
    const { stepBackward_2, stepForward_2, stepRight_2, stepLeft_2 } = useKeyboard()
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

        api_2.velocity.set(direction.x, vel_2.current[1], direction.z)
        // console.log(pos_2)


    })

    const posArray = pos_2.current

    socket.emit("player", {
        id,
        position: posArray
    })
    const { camera } = useThree()
    const itemPos = [Math.round(pos_2.current[0]), Math.round(pos_2.current[1]), Math.round(pos_2.current[2])];
    console.log(itemPos)
    if (
        // itemPos[2] > 10 || itemPos[0] > 10 || itemPos[2] < -10 || itemPos[0] < -10
        itemPos[1] < 0
    ) {
        console.log("Blue lose")
        alert(`${name2} died, Enter to restart`)
        window.location.reload()

    }

    socket.on('player', (clients) => {
        // console.log(data)
        // const newPos = data
        // console.log(newPos)
        console.log(clients)
    })

    // const {newPos} = clients
    // console.log(newPos)

    return (
        <>
            <mesh ref={ref}>
                <boxBufferGeometry attach="geometry" />
                <meshStandardMaterial map={Player2} color="hotpink" attach='material' />
                <Text
                    position={[0, 1, 0]}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                    fontSize="0.5"
                    >{name2}</Text>
            </mesh>
        </>
    )
}

export default Hurdle;