import React, { useState, useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Vector2, Raycaster } from 'react-three-fiber';
import ControlledCamera from './ControlledCamera';
import HelperGroup from './HelperGroup';
import RaycasterGroup from './RaycasterGroup';

const Viewport = ({ domElement, width, height, cameraPosition, clearColor }) => {
  const [mouse, setMouse] = useState({
    pointer: new Vector2(),
    clicked: false,
  });

  const [controlledCamera, setControlledCamera] = useState(new ControlledCamera(width, height, cameraPosition, domElement));

  const [helperGroup, setHelperGroup] = useState(new HelperGroup());
  const [raycasterGroup, setRaycasterGroup] = useState(new RaycasterGroup());

  useEffect(() => {
    controlledCamera.turnOn();
  }, [controlledCamera]);

  useEffect(() => {
    const onMouseClick = (event) => {
      setMouse({
        ...mouse,
        clicked: true,
        pointer: new Vector2((event.clientX / width) * 2 - 1, -(event.clientY / height) * 2 + 1),
      });
    };

    domElement.addEventListener('click', onMouseClick);
    domElement.addEventListener('touchstart', (event) => {
      onMouseClick(event);
      event.preventDefault();
    });

    return () => {
      domElement.removeEventListener('click', onMouseClick);
      domElement.removeEventListener('touchstart', onMouseClick);
    };
  }, [domElement]);

  return (
    <Scene>
      <ControlledCamera ref={controlledCamera} />
      <Mesh>
        <Raycaster ref={raycasterGroup} />
      </Mesh>
      <HelperGroup ref={helperGroup} />
      <PropertiesPanel
        container={container}
        renderer={renderer}
        scene={scene}
        controlledCamera={controlledCamera}
        cameraSelector={cameraSelector}
        objectGenerator={objectGenerator}
      />
    </Scene>
  );
};