import { useEffect, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/radial_glass.glb");

function RadialGlassModel() {
  const { scene } = useGLTF("/radial_glass.glb");
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  useEffect(() => {
    if (!clonedScene) return;
    
    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xa82403,
          metalness: 0.5,
          roughness: 0.5,
          transmission: 0.5,
          opacity: 0.4,
          envMapIntensity: 0.5,
          emissive: 0xa82403,
          emissiveIntensity: 0.15,
        });
      }
    });
  }, [clonedScene]);
  
  // Disabled mouse tracking for stationary model
  // useEffect(() => {
  //   const isMobile = window.innerWidth < 768;
  //   if (isMobile) return;
  //   
  //   const handleMouseMove = (event: MouseEvent) => {
  //     const x = (event.clientX / window.innerWidth) * 2 - 0.5;
  //     const y = -(event.clientY / window.innerHeight) * 2 + 1;
  //     setMousePosition({ x, y });
  //   };
  //   
  //   window.addEventListener('mousemove', handleMouseMove);
  //   return () => window.removeEventListener('mousemove', handleMouseMove);
  // }, []);
  
  // Disabled frame rotation for stationary model
  // useFrame(() => {
  //   if (groupRef.current) {
  //     groupRef.current.rotation.y += (mousePosition.x * 0.5 - groupRef.current.rotation.y) * 0.05;
  //     groupRef.current.rotation.x += (mousePosition.y * 0.3 - groupRef.current.rotation.x) * 0.05;
  //   }
  // });
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const scale = isMobile ? 0.3 : 0.6;
  const position: [number, number, number] = isMobile ? [0, 0, 0] : [4, 0, 0];
  
  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={scale} position={position} />
    </group>
  );
}

function Loader() {
  return null;
}

export default function RadialGlassSmall() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        <ambientLight intensity={0.5} color="#ffffff" />
        
        <hemisphereLight
          color="#1c1a1aff"
          groundColor="#a82403"
          intensity={0.6}
        />
        
        <directionalLight
          position={[8, 8, 5]}
          intensity={1.2}
          color="#564c4cff"
        />
        
        <directionalLight
          position={[-5, 3, -3]}
          intensity={0.6}
          color="#ffa500"
        />
        
        <directionalLight
          position={[0, 3, -8]}
          intensity={0.8}
          color="#ff6b00"
        />
        
        <pointLight position={[3, 3, 3]} intensity={1} color="#ff6b00" distance={10} />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#ff8c42" distance={8} />
        
        <Suspense fallback={<Loader />}>
          <RadialGlassModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} enabled={false} />
      </Canvas>
    </div>
  );
}
