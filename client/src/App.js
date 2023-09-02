import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Ground from "./components/ground";
import Player from "./components/Player";
import "./App.css";
import io from "socket.io-client";
import { Physics } from "@react-three/cannon";
import { useEnvironment } from "@react-three/drei";
import ReactGA from "react-ga";
import { Suspense, useEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";

function App() {
  const socketRef = useRef(null);
  const [playerId, setPlayerId] = useState(null);
  const [otherPlayers, setOtherPlayers] = useState([]);

  useEffect(() => {
    ReactGA.initialize("G-XQ7TKF8X99");
    ReactGA.pageview("/");

    const socket = io("http://localhost:3001");
    socketRef.current = socket;

    // socket.on("disconnect", (players) => {
    //   console.log("Disconnected from server.");
    //   setOtherPlayers(players)
    // })

    socket.on("connect", () => {
      console.log("Connected to server.");
      socket.emit("joinGame");
    });

    socket.on("newPlayer", (playerData) => {
      console.log("New player joined:", playerData);
      // setTimeout(() => {
      //   setOtherPlayers((otherPlayers) => ({
      //     ...otherPlayers,
      //     playerData,
      //   }));
      // }, 3000)
    });
    // setOtherPlayers([...otherPlayers, playerData]);
    socket.on("playerData", (data) => {
      const { playerId, players } = data;
      console.log("Received player data:", data);
      setOtherPlayers(data.players);
      // setOtherPlayers((Players) => ({
      //   ...Players,
      //   data,
      // }));
    });
    // });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const something =  otherPlayers.players
    console.log(otherPlayers, "playerlist");
  }, [otherPlayers]);

  const envMap = useEnvironment({ path: "/environment" });

  return (
    <div className="App">
      <Canvas camera={{ position: [0, 5, 12] }}>
        <Suspense
          fallback={
            <Html>
              <h1>Loading...</h1>
            </Html>
          }
        >
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.3} />
          <ambientLight />
          <Physics>
            {otherPlayers &&
              otherPlayers.map((playerId) => {
                const something = playerId
                console.log(something,"playerId")
                return(
                  <Player
                    key={playerId.playerId}
                    playerInfo={playerId}
                    socket={socketRef.current}
                  />
                )
              })}
            {playerId && (
              <Player socket={socketRef.current} playerId={playerId} />
            )}
            <Ground />
          </Physics>
          <Environment map={envMap} background />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
