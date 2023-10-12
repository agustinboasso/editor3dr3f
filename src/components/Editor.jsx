import React, { useState, useEffect } from 'react';
import { Scene, PerspectiveCamera, WebGLRenderer, Mesh, Vector3 } from 'react-three-fiber';
import { OBJExporter } from 'three/examples/jsm/exporters/OBJExporter';
import ToolBox from './tools/ToolBox';
import CameraSelector from './viewport/CameraSelector';
import PropertiesPane from './viewport/PropertiesPane';
import MeshPropertyController from './viewport/propertyController/meshPropertyController/MeshPropertyController';
import ObjectGenerator from './viewport/utils/ObjectGenerator';
import Viewport from './viewport/Viewport';

const Editor = ({ viewportCanvas, propertiesPaneContainer }) => {
  const [viewport, setViewport] = useState(null);
  const [propertiesPane, setPropertiesPane] = useState(null);

  useEffect(() => {
    setViewport(new Viewport(viewportCanvas, viewportCanvas.getBoundingClientRect().width, viewportCanvas.getBoundingClientRect().height));
    setPropertiesPane(new PropertiesPane(propertiesPaneContainer));
  }, []);

  return (
    <Scene>
      {viewport && (
        <PerspectiveCamera
          position={new Vector3(0, 0, 5)}
          aspect={viewport.width / viewport.height}
          near={0.1}
          far={1000}
        />
      )}
      {viewport && (
        <Mesh>
          <OBJExporter
            src={viewport.scene}
            filename="graphicsAI-exported.obj"
            onFinish={() => {
              console.log('Export finished!');
            }}
          />
        </Mesh>
      )}
      {viewport && (
        <ToolBox viewport={viewport} />
      )}
      {viewport && (
        <CameraSelector viewport={viewport} />
      )}
      {viewport && (
        <PropertiesPane viewport={viewport} propertiesPane={propertiesPane} />
      )}
      {viewport && (
        <MeshPropertyController
          viewport={viewport}
          propertiesPane={propertiesPane}
          objectGenerator={new ObjectGenerator(viewport, propertiesPane, new CameraSelector(viewport.controlledCamera.activeCamera, (camera) => {
            viewport.controlledCamera.changeCamera(camera);
          }))}
        />
      )}
      {viewport && (
        <ObjectGenerator viewport={viewport} propertiesPane={propertiesPane} cameraSelector={new CameraSelector(viewport.controlledCamera.activeCamera, (camera) => {
          viewport.controlledCamera.changeCamera(camera);
        })} />
      )}
      {viewport && (
        <Mesh
          position={new Vector3(-4, 3, 2)}
          geometry={new THREE.BoxGeometry(1, 1, 1)}
          material={new THREE.MeshBasicMaterial({ color: 0x0000ff })}
        />
      )}
      {viewport && (
        <Mesh
          position={new Vector3(0, 0, 0)}
          geometry={new THREE.PlaneGeometry(10, 10)}
          material={new THREE.MeshBasicMaterial({ color: 0x00ff00 })}
        />
      )}
    </Scene>
  );
};

export default Editor;