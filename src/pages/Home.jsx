import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Loader } from "../components";

import { Sky, Island, Plane, Bird } from "../models";

const Home = () => {
  const adjustModelForScreenSize = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
    } else {
      screenScale = [1, 1, 1];
    }
    return [screenScale, screenPosition, rotation];
  };

  const [islandScale, islandPosition, islandRotation] =
    adjustModelForScreenSize();

  return (
    <section className="w-full h-screen relative">
      {/* <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        POPUP
      </div> */}

      <Canvas
        className="w-full h-screen bg-transparent"
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          {/* simulates light coming from distant source, i.e. sunlight */}
          <directionalLight position={[1, 1, 1]} intensity={2} />

          {/* illuminates all objects in the scene equally without casting shadows */}
          <ambientLight intensity={0.5} />

          {/* emits light in all directions from a single point. Unneeded for outdoor scenes */}
          {/* <pointLight /> */}

          {/* it emits light in one direction in the shape of a cone */}
          {/* <spotLight /> */}

          {/* illuminates the scene with a gradient */}
          <hemisphereLight
            skyColor="#b1e1ff"
            groundColor="#000000"
            intensity={1}
          />

          <Bird />
          <Sky />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
          />
          <Plane />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Home;
