import React, { useEffect, useRef } from "react";
import { useBox } from "@react-three/cannon";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Vector3 } from "three";
import { RepeatWrapping } from "three";
import { useKeyboard } from "../hooks/Keyboard";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Html } from "@react-three/drei";

const speed = 4;

const Player = ({ socket, playerId }) => {
  const player1 = useLoader(TextureLoader, "texture.jpg");
  player1.wrapS = RepeatWrapping;
  player1.wrapT = RepeatWrapping;
  player1.repeat.set(1, 1);

  const [ref, api] = useBox(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 4, 3],
  }));
  const vel = useRef([0, 0, 0]);
  const { stepBackward, stepForward, stepRight, stepLeft } = useKeyboard();

  useEffect(() => {
    api.velocity.subscribe((v) => (vel.current = v));
  }, [api.velocity]);

  const pos = useRef([0, 0, 0]);

  useEffect(() => {
    api.position.subscribe((p) => (pos.current = p));
  }, [api.position]);

  useFrame(() => {
    if (playerId !== socket.id) return; // Only handle controls for the current player

    const direction = new Vector3();
    const frontVector = new Vector3(
      0,
      0,
      (stepBackward ? 1 : 0) - (stepForward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (stepLeft ? 1 : 0) - (stepRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    socket.emit("playerPosition", {
      playerId: socket.id,
      position: pos.current,
    });
  });

  const { camera } = useThree();

  useEffect(() => {
    socket.on("playerPosition", (data) => {
      const { playerId, position } = data;

      if (playerId === playerId) return; // Ignore position updates for the current player

      api.position.set(position[0], position[1], position[2]);
    });

    return () => {
      socket.off("playerPosition");
    };
  }, [api.position, playerId, socket]);

  return (
    <>
      <mesh ref={ref}>
        <Html>
          <p style={{ padding: "5px", color: "hotpink" }}>Player {playerId}</p>
        </Html>
        <boxBufferGeometry attach="geometry" />
        <meshStandardMaterial
          map={player1}
          color="#202020"
          attach="material"
        />
      </mesh>
    </>
  );
};

export default Player;
