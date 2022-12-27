import { Canvas } from '@react-three/fiber';
import {OrbitControls} from "@react-three/drei"
import Ground from './components/ground';
import Player from './components/Player';
import './App.css';
import io from "socket.io-client"
import { Physics } from '@react-three/cannon';
const socket = io.connect("http://localhost:3001")


function App() {
  return (
    <div className="App">
      <Canvas camera={[3, 2, 0]}>
        <OrbitControls />
        <ambientLight />
        <Physics>
          <Player />
        <Ground />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
