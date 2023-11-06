import React from "react";
import { useSnapshot } from "valtio";

import { useGLTF, useTexture, Decal } from "@react-three/drei";

import state from "../store";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

const Shirt = () => {
  const snap = useSnapshot(state);

  // Importing the models from public folder
  
  // const { nodes, materials } = useGLTF("./0001-FM0001-LS0001-01-921-486.glb");
  const { nodes, materials } = useGLTF("./0001-FM0001-LS0001-02-934-473.glb");
  // const { nodes, materials } = useGLTF("./female_model.glb"); 
  // const { nodes, materials } = useGLTF("./tshirt_without_design_on.glb");
  // const { nodes, materials } = useGLTF("./tshirt_with_design_on.glb");


  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  // define the variables for displaying model

  let geometry = null;
  let materialsVal = null;
  let customScale = null;
  let xVal = 0;
  let yVal = 0;
  let zVal = 0;

  // get the values of varialbles for the imported model 


  for (let x in nodes) {
    if (Object.keys(nodes[x]).includes("geometry")) { // extract the needed object data from complex json data
      if (nodes[x]["geometry"].index.array.length > 10000) {  // added code

        geometry = nodes[x]["geometry"];
        
        if (Math.abs(Math.round((geometry.boundingBox.max.x + geometry.boundingBox.min.x)/2)) == 0) {
          xVal = 0
        } else {
          xVal = Math.round((geometry.boundingBox.max.x + geometry.boundingBox.min.x)/2);
        }
        if (Math.abs(Math.round((geometry.boundingBox.max.y + geometry.boundingBox.min.y)/2)) == 0) {
          yVal = 0
        } else {
          yVal = Math.abs((geometry.boundingBox.max.y + geometry.boundingBox.min.y)/2);
        }
        zVal = (Math.abs(geometry.boundingBox.max.z) + Math.abs(geometry.boundingBox.min.z))/2
        if (geometry['boundingSphere']['radius'] > 0 && geometry['boundingSphere']['radius'] < 1) {
          customScale = 1;
        } else if (geometry['boundingSphere']['radius'] > 1 && geometry['boundingSphere']['radius'] < 10) {
          customScale = 0.1;
        }
        else if (geometry['boundingSphere']['radius'] > 10 && geometry['boundingSphere']['radius'] < 100) {
          customScale = 0.01;
        }
        else if (geometry['boundingSphere']['radius'] > 100) {
          customScale = 0.001;
        }
        break;
      }
    }
  }

  for (let x in materials) {
    if (Object.keys(materials[x]).includes("bumpScale") ) { // extract the needed material data from complex json data
      materialsVal = materials[x];
      break;
    }
  }

  // change color
  useFrame((state, delta) =>
    easing.dampC(materialsVal.color, snap.color, 0.25, delta) //updated
  );

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} >
      <mesh
        castShadow
        geometry={geometry} //updated
        material={materialsVal} //updated
        material-roughness={1}
        dispose={null}
        scale={customScale} //updated
      >
        {snap.isFullTexture && (
          <Decal
            position={[xVal, yVal, 0]} //updated
            rotation={[0, 0, 0]}
            scale={zVal*7}         //updated   
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[xVal,  yVal+geometry['boundingSphere']['radius']/10, zVal]} //updated
            rotation={[0, 0, 0]}
            scale={zVal} //updated
            map={logoTexture}
            map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
