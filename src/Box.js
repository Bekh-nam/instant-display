import { useBox } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const Box = (props) => {
  const [left, setLeft] = useState(false);
  const [right, setRight] = useState(false);
  const [forward, setForward] = useState(false);
  const [back, setBack] = useState(false);

  const [box, api] = useBox(() => ({ mass: 1, ...props }));

  useFrame(() => {
    if (left) {
      api.velocity.set(-1, 0, 0);
    }
    if (right) {
      api.velocity.set(1, 0, 0);
    }
    if (forward) {
      api.velocity.set(0, 0, -1);
    }
    if (back) {
      api.velocity.set(0, 0, 1);
    }

    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          setForward(true);
          return;
        case "s":
          setBack(true);
          return;
        case "a":
          setLeft(true);
          return;
        case "d":
          setRight(true);
          return;
        default:
          return;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          setForward(false);
          return;
        case "s":
          setBack(false);
          return;
        case "a":
          setLeft(false);
          return;
        case "d":
          setRight(false);
          return;
        default:
          return;
      }
    });
  });

  return (
    <mesh ref={box}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="orange" />
    </mesh>
  );
};

export default Box;
