import { useEffect, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// Preload the model
useGLTF.preload("/radial_glass.glb");

function RadialGlassModel() {
  const { scene } = useGLTF("/radial_glass.glb");
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0});
  
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
          // transparent: true,
          opacity: 0.4,
          envMapIntensity: 0.5,
          emissive: 0xa82403,
          emissiveIntensity: 0.15,
        });
      }
    });
  }, [clonedScene]);
  
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Disable mouse tracking on mobile
    
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 0.5;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y});
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth rotation based on mouse position
      groupRef.current.rotation.y += (mousePosition.x * 0.5 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mousePosition.y * 0.3 - groupRef.current.rotation.x) * 0.05;
    }
  });
  
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const scale = isMobile ? 0.4 : 0.8;
  
  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} scale={scale} position={[0, -1, 0]} />
    </group>
  );
}

function Loader() {
  return null;
}

export default function RadialGlass() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 md:z-auto">
      <Canvas 
        camera={{ position: [1, 0, 6], fov: 50 }}
        shadows
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
      >
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.5} color="#453f3fff" />
        
        {/* Hemisphere light for natural lighting */}
        <hemisphereLight
          color="#1c1a1aff"
          groundColor="#a82403"
          intensity={0.6}
        />
        
        {/* Main directional light (key light) from top-right */}
        <directionalLight
          position={[8, 8, 5]}
          intensity={1.2}
          color="#564c4cff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light from left to soften shadows */}
        <directionalLight
          position={[-5, 3, -3]}
          intensity={0.6}
          color="#ffa500"
        />
        
        {/* Back light for rim lighting effect */}
        <directionalLight
          position={[0, 3, -8]}
          intensity={0.8}
          color="#ff6b00"
        />
        
        {/* Point lights for accent */}
        <pointLight position={[3, 3, 3]} intensity={1} color="#ff6b00" distance={10} />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#ff8c42" distance={8} />
        
        {/* Spotlight from top for focus */}
        <spotLight
          position={[0, 8, 3]}
          angle={0.4}
          penumbra={0.5}
          intensity={1}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <Suspense fallback={<Loader />}>
          <RadialGlassModel />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
