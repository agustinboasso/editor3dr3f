import { useFrame, useMemo, useState } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

const ControlledCamera = ({ width, height, cameraPosition }) => {
  const [activeCamera, setActiveCamera] = useState(null);

  const perspectiveCamera = useMemo(() => {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(...cameraPosition);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }, [width, height, cameraPosition]);

  const orthographicCamera = useMemo(() => {
    const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 1000);
    camera.position.set(...cameraPosition);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    return camera;
  }, [width, height, cameraPosition]);

  useFrame(() => {
    activeCamera.updateProjectionMatrix();
  });

  const handleCameraSwitch = () => {
    if (activeCamera === perspectiveCamera) {
      setActiveCamera(orthographicCamera);
    } else {
      setActiveCamera(perspectiveCamera);
    }
  };

  return (
    <>
      <OrbitControls object={activeCamera} />
      {activeCamera}
    </>
  );
};

export default ControlledCamera;