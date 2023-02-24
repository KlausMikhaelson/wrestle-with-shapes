import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from "@react-three/drei"
import Ground from './components/ground';
import Player from './components/Player';
import './App.css';
// import io from "socket.io-client"
import { Physics } from '@react-three/cannon';
import Hurdle from './components/Hurdle';
import { useEnvironment } from '@react-three/drei';
import ReactGA from "react-ga"
import { Suspense, useEffect } from 'react';
import { Html } from '@react-three/drei';
import Ball from './components/Ball';
// const socket = io.connect("http://localhost:3001")


function App() {

  
  useEffect(() => {
    ReactGA.initialize('G-XQ7TKF8X99')
    
    ReactGA.pageview("/")
  }, []);

  const envMap = useEnvironment({ path: "/environment" })

  return (
    <div className="App">
      <Canvas camera={{ position: [0, 5, 12] }}>
        <Suspense fallback={<Html><h1>Loading...</h1></Html>}>
          <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2.3}/>
          <ambientLight />
          <Physics>
            {/* <Ball /> */}
            <Hurdle />
            <Player />
            <Ground />
          </Physics>
          <Environment map={envMap} background />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
