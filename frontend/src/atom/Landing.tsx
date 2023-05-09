import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";


export default function Landing() {
  const url = 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf'

  const { scene } = useGLTF(url)

  return (
    <div > 
      <Canvas camera={{ position: [10, 10, 40], fov: 50 }}>
        <hemisphereLight color="white" groundColor="blue" intensity={0.75} />
        <spotLight position={[50, 50, 10]} angle={0.15} penumbra={1} />
        <group position={[0, -10, 0]}>
          <primitive object={scene} position={[0, 0.25, 0]} url={url} />
          <ContactShadows scale={20} blur={10} far={20} />
        </group>
        <OrbitControls />
      </Canvas>
    </div >
  )
}