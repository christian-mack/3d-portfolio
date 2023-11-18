import { useGLTF } from "@react-three/drei";
import PlaneScene from "../assets/3d/plane.glb";

const Plane = ({ isRotating, ...props }) => {
  const { scene, animations } = useGLTF(PlaneScene);

  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Plane;
