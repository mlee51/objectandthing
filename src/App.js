import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Model from "./Model";
import Shirt from "./Shirt";

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.y += 0.01
  })
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [0.5, 0.5, 0.5]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas camera={{fov:60}}   >
      <ambientLight intensity={0} />
      <spotLight position={[10, 10, 1]} angle={0.15} penumbra={1} intensity={100} />
      <pointLight position={[0,0,-0.5]} intensity={80} />
     
      <Shirt position={[-1.4,0.75,-1]}  />
      <Shirt position={[1.4,0.75,-1]}  />
      {/*<Box position={[1.5,0,0]} />*/}
      <Model  position={[-1.1,0,-0.5]} />
      <Model  position={[1.1,0,-0.5]} />
      
    </Canvas>
  )
}
