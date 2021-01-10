import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Model from "./Model";
import Shirt from "./Shirt";
import { useThree } from 'react-three-fiber'

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

function Main() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = true), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>{/*
    <pointLight position={[0,0,-0.5]} intensity={0} />
    <spotLight position={[1, 1, 1]} angle={0.15} penumbra={1} intensity={1000} />
    <Model  position={[-1.1,0,-10.5]} />
      <Model  position={[1.1,0,-10.5]} />
    
    <Shirt position={[-2,0.75,-10]}  />
  <Shirt position={[2,0.75,-10]}  />*/}
  <group position={[0,0,-7]}>
    <pointLight position={[0, 0, -0.5]} intensity={70} />

   

    <Model position={[-1.1, 0, -0.5]} />
    <Model position={[1.1, 0, -0.5]} />
    </group>

  </scene>
}

function HeadsUpDisplay() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>
    <group position={[0,0,-7]}>
   
    <pointLight position={[0, 3, 0]} intensity={2} /> 
    <Shirt position={[1.4, 0.75, -1]} imgurl={"models/kidpix.png"}  inc={0.008}/>
    </group>
    </scene>
}


function HeadsUpDisplay2() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>
    <group position={[0,0,-7]}>
   
    <pointLight position={[-2, 4, -0.2]} intensity={0.2} /> 
    <pointLight position={[0.2, 3, 0]} intensity={0.8} /> 
    <Shirt position={[-1.4, 0.75, -1]} imgurl={"models/warpedA.png"} inc={-0.008}/>
    
    </group>
    </scene>
}

function App() {
  const camera = useRef()
  const { size, setDefaultCamera } = useThree()
  useEffect(() => void setDefaultCamera(camera.current), [])
  useFrame(() => camera.current.updateMatrixWorld())
  return (
    <>

      <perspectiveCamera
        ref={camera}
        aspect={size.width / size.height}
        radius={(size.width + size.height) / 4}
        onUpdate={self => self.updateProjectionMatrix()}
      />
      <Main />
      <HeadsUpDisplay />
      <HeadsUpDisplay2 />

    </>
  )
}
export default function App2() {
  return (
    <Canvas  >
      <App />
    </Canvas>
  )
}


