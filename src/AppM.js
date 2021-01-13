import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import Model from "./Model";
import ShirtM from "./ShirtM";
import { useThree } from 'react-three-fiber'
import styled, { css } from 'styled-components'
import { useSpring, config, animated } from 'react-spring';



function Main() {
  const scene = useRef()
  const { camera } = useThree()
  let inc = 0;//scene.current.children[0].children[0].position.z=Math.sin(inc)

  useFrame(({ gl }) => void ((gl.autoClear = true), inc += 0.01, gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>
    <group position={[0, 0, -6]}>
      {/*<pointLight position={[0, 0, -0.5]} intensity={70} />*/}



      <Model position={[0, 0, -0.5]} inc={0.01} />

    </group>

  </scene>
}

function HeadsUpDisplay() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>

    <group position={[0, 0, -6]}>

      <pointLight position={[0, 3, 1]} intensity={2} />
      <pointLight position={[1.6, 3, 1]} intensity={0.8} />
      <ShirtM position={[0, 0.75, 0]} imgurl={"models/kidpix.png"} inc={-0.008}
        url={"https://teespring.com/ot_002?edit=1&pid=2&cid=2397"} />
    </group>
  </scene>
}


function HeadsUpDisplay2() {
  const scene = useRef()
  const { camera } = useThree()
  useFrame(({ gl }) => void ((gl.autoClear = false), gl.clearDepth(), gl.render(scene.current, camera)), 100)
  return <scene ref={scene}>
    <group position={[0, 0, -6]}>

      <pointLight position={[-0.6, 4, 0.8]} intensity={0.2} />
      <pointLight position={[1.6, 3, 1]} intensity={0.8} />
      <ShirtM position={[0, 0.75, 0]} imgurl={"models/warpedA.png"} inc={-0.008}
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
padding: 1rem;
mix-blend-mode: difference;

`

const Simg = styled.img`
//padding: 5px;
width: 90%;
//height: 80%;
${props => props.icon && css`


    width: 14%;
    
    margin-left: 1rem;
    filter: invert(0.3);
    
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



function App(props) {
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

      {props.black ? <HeadsUpDisplay2 /> : <HeadsUpDisplay />}


    </>
  )
}
export default function App2() {
  const move = useSpring({
    opacity: 1, transform: 'translateY(0%)',
    from: { opacity: 0, transform: 'translateY(-200%)' },
    config: config.molasses


  })



  return (
    <>
      <Label style={move}>
        <Simg src={"object-thing2.svg"} />
        
      </Label>
      <Fdiv style={move} >
      
      <a href="https://teespring.com/stores/object-and-thing" target="_blank">
        <Simg icon  src={"shopping-bag.svg"} />
      </a>
      <a href="https://www.instagram.com/objectandthing/" target="_blank">
        <Simg icon style={{  width: "13%", transform: "translateY(1px)" }} src={"instagram1.svg"} />
      </a>
      </Fdiv>
      <Sdiv style={move}>

        <Canvas gl={{ antialias: true }}>
          <App black={true} />
        </Canvas>
        <Canvas gl={{ antialias: true }}>
          <App />
        </Canvas>
        <br />
        <br />
        <br />



      </Sdiv>
    </>


  )
}


