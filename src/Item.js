import axios from "axios";
import { useContext } from "react";
import * as THREE from "three";
import { PopupContext } from "./context";

const setPosition = async (itemId, positionName, userAddress, templateId) => {
  const result = await axios.post("http://192.168.0.88:8000/gallery/set", {
    itemId,
    positionName,
    userAddress,
    templateId,
  });
  return result;
};

const Item = (props) => {
  const { itemId, itemTokenId, itemName, itemMedia } = props;

  const { setPopup, position, gallery, setGallery } = useContext(PopupContext);
  const choose = async (e) => {
    const img = e.target.currentSrc;
    if (position) {
      const texture = new THREE.TextureLoader().load(img);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.5,
      });

      gallery.nodes[position].material = material;
      gallery.nodes[position].material.map.center = new THREE.Vector2(0.5, 0.5);
      gallery.nodes[position].material.map.flipY = false;
      setGallery({ nodes: gallery.nodes, scene: gallery.scene });
      setPopup(false);
      const result = await setPosition(
        itemId,
        position,
        "0x00b91b2f8afe87fcdc2b3ffa9ee2278cd1e4ddf8",
        "6315c02ab4dfe33a9edebb09"
      );
      console.log(result);
    }
  };

  return (
    <div>
      <p>Token ID: {itemTokenId}</p>
      <p>Name: {itemName}</p>
      <img
        onDoubleClick={choose}
        style={{ width: "50%", height: "50%" }}
        src={itemMedia}
        alt={itemTokenId}
      />
    </div>
  );
};

export default Item;
