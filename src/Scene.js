import React, { useEffect, useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import axios from "axios";
import * as THREE from "three";

const loadGallery = async () => {
  const response = await axios.post("http://localhost:8000/gallery/load", {
    templateId: "6315c02ab4dfe33a9edebb09",
    userAddress: "0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8",
  });
  return response.data.data;
};

const Scene = (props) => {
  const {
    setPopup,
    setPosition,
    gallery,
    setGallery,
    galleryUrl,
    setGalleryUrl,
    listPosition,
    setListPosition,
  } = props.value;

  useEffect(() => {
    loadGallery().then((data) => {
      setListPosition(data.positions);
      setGalleryUrl(data.url);
    });
  }, []);

  const { nodes, scene } = useLoader(
    GLTFLoader,
    galleryUrl ? galleryUrl : "http://192.168.0.88:8000/static/VRGallery.glb"
  );

  const handleClickObject = (e) => {
    if (e.object.name.includes("Cylinder")) {
      setPosition(e.object.name);
      setPopup(true);
    }
  };

  const texture = useLoader(
    TextureLoader,
    "https://res.cloudinary.com/dkgnummck/image/upload/v1658375862/nft/QmbEZ8H3XbERPjHjTj27RNp5WkFbu2qEGsij44rHVguUqf.gif"
  );

  if (!gallery && galleryUrl && listPosition) {
    const defaultMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      metalness: 0.5,
    });
    listPosition.map((position) => {
      const texture = position.media
        ? new THREE.TextureLoader().load(position.media)
        : null;
      const material = texture
        ? new THREE.MeshStandardMaterial({
            map: texture,
            metalness: 0.5,
          })
        : defaultMaterial;

      nodes[position.name].material = material;
      nodes[position.name].material.map.flipY = false;
      nodes[position.name].material.map.center = new THREE.Vector2(0.5, 0.5);
    });
    setGallery({ nodes, scene });
  }

  return gallery ? (
    <primitive
      background={texture}
      onDoubleClick={handleClickObject}
      object={gallery.scene}
    />
  ) : (
    <mesh />
  );
};

export default Scene;
