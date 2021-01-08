import React, { Suspense, useRef, useState } from "react";
import { Canvas, useLoader, useFrame } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {useSpring, config, animated as a} from "react-spring/three";
import "./styles.css";
import * as THREE from "three";

function Loading() {
  return (
    <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <sphereGeometry attach="geometry" args={[1, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color="white"
        transparent
        opacity={0.6}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function ArWing(props) {
  const group = useRef();
  const gltf = useGLTF("models/shirt1.glb");
  const tex = useTexture("models/window2.png");
  tex.magFilter = 1;
  tex.minFilter = 1;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1,1);
  
  
  
  const [hovered, setHover] = useState(false);
  const props2 = useSpring({
    scale: hovered? [2,2,2] : [1.5,1.5,1.5],
    
 
   config: config.wobbly
 });
  // useFrame will run outside of react in animation frames to optimize updates.
  useFrame(() => {
    //inc += 0.01;
    //group.current.rotation.x = group.current.rotation.y  = !hovered? group.current.rotation.y = (group.current.rotation.y + 0.01) % 6.28 : group.current.rotation.y = group.current.rotation.y * 1.01;
    group.current.rotation.z += 0.008;
   
    if(!hovered){

    
    //group.current.children[0].material.opacity = Math.abs(Math.sin(inc+ group.current.rotation.y))*0.2;
    //group.current.rotation.z = group.current.rotation.y ;
    //xgroup.current.rotation.z += 0.05;
  }

  
  //console.log(gltf);
  });
  //return <primitive object={gltf} dispose={null} />  geometry={gltf.nodes.Cube.geometry}  geometry={gltf.nodes.Shirt_on_Hanger_1.geometry}
  return (
    // Add a ref to the group. This gives us a hook to manipulate the properties of this geometry in the useFrame callback.
    <group {...props}  ref={group} rotation={[-3.14*0.5,3.14,3.14]} scale={[3,3,3]}>
      <a.mesh rotation={[0,0,0]} scale={[1,1,1]}  visible geometry={gltf.nodes.Shirt_on_Hanger_1.geometry} onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}   >
        <meshStandardMaterial
          attach="material"
          color="black" 
          emissive="white"
          roughness={0.35}
          metalness={0.9}
          
          emissiveIntensity={0}
          //transparent//"#00CED3"//"blue"
          opacity={1}
          
          side={0}
          
          
        />
      </a.mesh>
    </group>
  );
}

export default function Shirt(props) {
  const h = [...Array(1)].map((_, i) => i);
  const v = [...Array(1)].map((_, i) => i);


  return (
    
      <Suspense fallback={<Loading />}>
        <ArWing   position={props.position}  />
      </Suspense>
   
  );
} 