import { Canvas } from '@react-three/fiber';
import {Environment, OrbitControls} from "@react-three/drei"
import Ground from './components/ground';
import Player from './components/Player';
import './App.css';
import io from "socket.io-client"
import { Physics } from '@react-three/cannon';
import Hurdle from './components/Hurdle';
import { useEnvironment } from '@react-three/drei';
// const socket = io.connect("http://localhost:3001")


function App() {

  const envMap = useEnvironment({path: "/environment"})

  return (
    <div className="App">
      <Canvas camera={{position:[0, 5, 12]}}>
        <OrbitControls />
        <ambientLight />
        <Physics>
          <Hurdle />
          <Player />
        <Ground />
        </Physics>
        <Environment map={envMap} background />
      </Canvas>
    </div>
  );
}

export default App;
