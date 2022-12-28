import { Canvas } from '@react-three/fiber';
import {OrbitControls} from "@react-three/drei"
import Ground from './components/ground';
import Player from './components/Player';
import './App.css';
import io from "socket.io-client"
import { Physics } from '@react-three/cannon';
import Hurdle from './components/Hurdle';
const socket = io.connect("http://localhost:3001")


function App() {
  socket.emit("new_player", (p) => {
    return(
      <Player position={[0,2,0]}/>
    )
  })
  return (
    <div className="App">
      <Canvas camera={{position:[0, 20, 0]}}>
        <OrbitControls />
        <ambientLight />
        <Physics>
          <Hurdle />
          <Player />
        <Ground />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
