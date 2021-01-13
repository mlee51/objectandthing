import React, { Suspense, useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { useGLTF, useTexture } from "@react-three/drei";
import {useSpring, config, animated as a} from "react-spring/three";
import "./styles.css";
import * as THREE from "three";

function Loading() {
  return (
    <mesh visible={false} position={[0, 0, 0]} rotation={[0, 0, 0]}>
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
  const tex = useTexture(props.imgurl);
  const inc = props.inc;
  
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.center.set(0.5,0.5);
  tex.repeat.set(4,4);
  tex.offset.set(0.8,-0.7);
  tex.flipY = false;
  
  const [hovered, setHover] = useState(false);
  const props2 = useSpring({
    scale: hovered? [4,4,4] : [1,1,1],
    
 
   config: config.wobbly
 });
  // useFrame will run outside of react in animation frames to optimize updates.
  useFrame(() => {
    
    group.current.rotation.z += inc;
    //tex.rotation += 0.01;
    if(hovered){
      group.current.rotation.z -= inc;
    
    
  }

  
  //console.log(toggle);
  });
  
  return (
    // Add a ref to the group. This gives us a hook to manipulate the properties of this geometry in the useFrame callback.
    <group  {...props}  ref={group} rotation={[-3.14*0.5,3.14,3.14]} scale={[3,3,3]}>
      <a.mesh  onClick={() => window.open(props.url)}  rotation={[0,0,0]} scale={props2.scale}  visible geometry={gltf.nodes.Shirt_on_Hanger_1.geometry} onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}   >
        <meshStandardMaterial
          attach="material"
          color="white" 
          emissive="white"
          roughness={0.55}
          metalness={0}
          map={tex}
          emissiveMap={tex}
        emissiveIntensity={0}
         
          opacity={1}
          
          side={2}
          
          
        />
      </a.mesh>
    </group>
  );
}

export default function Shirt(props) {
 

  return (
    
      <Suspense fallback={<Loading />}>
       
        <ArWing   position={props.position} imgurl={props.imgurl} inc={props.inc} url={props.url}/>
      
      </Suspense>
   
  );
} 