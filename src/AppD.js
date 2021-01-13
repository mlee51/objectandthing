import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Model from "./Model";
import Shirt from "./Shirt";
import { useThree } from 'react-three-fiber'
import styled, { css } from 'styled-components'
import { useSpring, config, animated } from 'react-spring';


function Main() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = true), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>
    <group position={[0, 0, -7]}>

      <Model position={[-1.1, 0, -0.5]} inc={0.01} />
      <Model position={[1.1, 0, -0.5]} inc={0.01} />
    </group>

  </scene>
}

function HeadsUpDisplay() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>

    <group position={[0, 0, -7]}>

      <pointLight position={[0, 3, 0]} intensity={2} />

      <Shirt position={[1.4, 0.75, -1]} imgurl={"models/kidpix.png"} inc={0.008}
        url={"https://teespring.com/ot_002?edit=1&pid=2&cid=2397"} />
    </group>
  </scene>
}


function HeadsUpDisplay2() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>
    <group position={[0, 0, -7]}>

      <pointLight position={[-2, 4, -0.2]} intensity={0.2} />
      <pointLight position={[0.2, 3, 0]} intensity={0.8} />
      <Shirt position={[-1.4, 0.75, -1]} imgurl={"models/warpedA.png"} inc={-0.008}
        url={"https://teespring.com/ot_001?edit=1&pid=2&cid=2122"} />

    </group>
  </scene>
}

const Sdiv = styled(animated.div)`
backgound-color: white;
width:100%;
height: 100%;
`

const Label = styled(animated.div)`
backgound-color: white;
color: white;
//width:100%;
//height: 100%;
position: fixed;
z-index: 3;
font-size: 150%;
padding: 5rem;
mix-blend-mode: difference;

`

const Simg = styled(animated.img)`
width: 90%;
${props => props.icon && css`
    width: 14%;
    margin-left: 1rem;
    filter: invert(0.3);
  `}
`

const Simg2 = styled(animated.img)`
width: 90%;
${props => props.icon && css`
    margin-left: 1rem;
    filter: invert(0.3);
    width: 13%;
    transform: translateY(1px);
  `}
`

const Fdiv = styled(animated.div)`
top: unset;
left: unset;
position: fixed;
bottom: 1rem;
right: 2rem;
text-align: right;
z-index: 3;


`



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
  const [hovered, setHover] = useState(false);
  const [hovered2, setHover2] = useState(false);
  const move = useSpring({
    opacity: 1, transform: 'translateY(0%)',
    from: { opacity: 0, transform: 'translateY(-200%)' },
    config: config.molasses
  })

  const big = useSpring({
    // padding: hovered ? "0.1vw" : "2vw", "10vw" : "6vw",
     filter: hovered ? "invert(1)" : "invert(0.3)",
 
     config: config.gentle
   });
   const big2 = useSpring({
    // padding: hovered ? "0.1vw" : "2vw", "10vw" : "6vw",
     filter: hovered2 ? "invert(1)" : "invert(0.3)",
 
     config: config.gentle
   });
  return (
    <>
      <Label style={move}>
        <Simg src={"object-thing2.svg"} />

      </Label>
      <Fdiv style={move} >

        <a href="https://teespring.com/stores/object-and-thing" target="_blank">
          <Simg onPointerOver={(e) => setHover(true)}
       onPointerOut={(e) => setHover(false)} icon="true" style={big} src={"shopping-bag.svg"} />
        </a>
        <a href="https://www.instagram.com/objectandthing/" target="_blank">
          <Simg2  onPointerOver={(e) => setHover2(true)}
       onPointerOut={(e) => setHover2(false)} icon="true" style={big2}  src={"instagram1.svg"} />
        </a>
      </Fdiv>
      <Sdiv style={move}>
      <Canvas style={{ height: "100%" }} gl={{ antialias: true }}>
        <App />
      </Canvas>
      </Sdiv>
    </>
  )
}


