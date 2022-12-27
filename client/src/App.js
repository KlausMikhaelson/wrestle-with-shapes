import { Canvas } from '@react-three/fiber';
import Ground from './components/ground';
import './App.css';
import io from "socket.io-client"
const socket = io.connect("http://localhost:3001")


function App() {
  return (
    <div className="App">
      <Canvas>
        <Ground />
      </Canvas>
    </div>
  );
}

export default App;
