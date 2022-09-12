import React, { useContext, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Scene from "./Scene";
import ListItem from "./ListItem";
import { PopupContext } from "./context";
import { CubeTextureLoader } from "three";
import negX from "./assets/Yokohama2/negx.jpg";
import negY from "./assets/Yokohama2/negy.jpg";
import negZ from "./assets/Yokohama2/negz.jpg";
import posX from "./assets/Yokohama2/posx.jpg";
import posY from "./assets/Yokohama2/posy.jpg";
import posZ from "./assets/Yokohama2/posz.jpg";

const Background = () => {
  const { scene } = useThree();

  useMemo(() => {
    const loader = new CubeTextureLoader();
    const texture = loader.load([posX, negX, posY, negY, posZ, negZ]);
    scene.background = texture;
  }, [scene]);
  return null;
};

const App = () => {
  const {
    isPopup,
    setPopup,
    position,
    setPosition,
    gallery,
    setGallery,
    galleryUrl,
    setGalleryUrl,
    listPosition,
    setListPosition,
  } = useContext(PopupContext);
  return (
    <div>
      <ListItem />
      <Canvas
        camera={{ position: [2, 10, 20] }}
        style={{
          width: "100vw",
          height: "100vh",
          opacity: !isPopup ? 1 : 0.5,
        }}
      >
        <hemisphereLight intensity={0.8} />
        <Background />

        <Scene
          value={{
            isPopup,
            setPopup,
            position,
            setPosition,
            gallery,
            setGallery,
            galleryUrl,
            setGalleryUrl,
            listPosition,
            setListPosition,
          }}
        />
        <OrbitControls
          enabled={!isPopup}
          minDistance={20}
          maxDistance={40}
          maxPolarAngle={Math.PI / 2.5}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
};

export default App;
