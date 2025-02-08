import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
function MyElement3D() {
  const refMesh = useRef<Mesh>(null);

  useFrame((state, deleta) => {
    if (refMesh.current) {
      refMesh.current.rotation.y += deleta;
    }
  });

  return (
    <>
      <directionalLight position={[1, 1, 1]} />

      <mesh
        ref={refMesh}
        rotation={[
          45 * (Math.PI / 180),
          45 * (Math.PI / 180),
          45 * (Math.PI / 180),
        ]}
      >
        <boxGeometry />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
    </>
  );
}

export default MyElement3D;
