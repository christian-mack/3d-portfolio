import { useGLTF } from "@react-three/drei";
import PlaneScene from "../assets/3d/plane.glb";

const Plane = () => {
  const { scene, animations } = useGLTF(PlaneScene);

  return (
    <mesh>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
