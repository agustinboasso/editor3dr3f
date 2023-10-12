import { useState } from 'react';
import { useMemo } from 'react-three-fiber';
import { OrbitControls } from '@react-three/drei';

const CameraSelector = ({ onCameraSwitch, onAddCamera, onDeleteCamera, defaultCamera }) => {
  const [currentCameraName, setCurrentCameraName] = useState(defaultCamera.name);

  const cameras = useMemo(() => {
    const cameras = new Map();
    cameras.set(defaultCamera.name, defaultCamera);
    return cameras;
  }, [defaultCamera]);

  const addCamera = (camera) => {
    setCurrentCameraName(camera.name);
    cameras.set(camera.name, camera);
    camera.onDisposeCamera = () => {
      if (currentCameraName === camera.name) {
        setCurrentCameraName('Primary Camera');
        this.switchCamera();
      }
      cameras.delete(camera.name);
      onDeleteCamera(camera);
    };
    onAddCamera(camera);
  };

  const switchCamera = () => {
    onCameraSwitch(cameras.get(currentCameraName));
  };

  return (
    <>
      <OrbitControls object={cameras.get(currentCameraName)} />
      <button onClick={switchCamera}>Switch Camera</button>
      <AddCameraButton onCameraAdded={addCamera} />
    </>
  );
};

export default CameraSelector;