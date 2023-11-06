import React from "react";
import { Canvas } from "@react-three/fiber";
import Shirt from "./Shirt";
import CameraRig from "./CameraRig";
import { Center, Environment } from "@react-three/drei";
import Backdrop from "./Backdrop";

const CanvasModel = () => {
  // fov: is size object like as Shirt
  // if number is greater it will show object small and opposite
  // position override object appear
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className='w-full max-w-full h-full transition-all ease-in'
    >
      <ambientLight intensity={0.5} />
      {/* <Environment preset='city' /> */}
      <Environment
        files='https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@environment/public/img/venice_sunset_1k.hdr'
        background
        blur={0.5}
      />
      <CameraRig>
        <Backdrop />
        <Center>
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  );
};

export default CanvasModel;
