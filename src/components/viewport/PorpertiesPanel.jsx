import React, { useState, useEffect } from 'react';
import { useFrame } from 'react-three-fiber';
import { GUI } from 'dat.gui';

const RendererPropertyFolder = ({ renderer, scene }) => {
    const [rendererPropertyFolder, setRendererPropertyFolder] = useState(null);
  
    useEffect(() => {
      setRendererPropertyFolder(bindRendererProperties(renderer, scene));
    }, [renderer, scene]);
  
    return (
      <GUI.Folder name="Renderer">
        {rendererPropertyFolder}
      </GUI.Folder>
    );
  };
  
  const ControlledCameraPropertiesFolder = ({ controlledCamera }) => {
    const [pcameraFolder, setPcameraFolder] = useState(null);
    const [ocameraFolder, setOcameraFolder] = useState(null);
  
    useEffect(() => {
      setPcameraFolder(bindControlledCameraProperties(controlledCamera));
      setOcameraFolder(bindControlledCameraProperties(controlledCamera));
    }, [controlledCamera]);
  
    return (
      <div>
        <GUI.Folder name="Viewport(Perspective)">
          {pcameraFolder}
        </GUI.Folder>
        <GUI.Folder name="Viewport(Orthographic)">
          {ocameraFolder}
        </GUI.Folder>
      </div>
    );
  };
  
  const CameraSelectorOption = ({ cameraSelector }) => {
    const [cameraSwitchOption, setCameraSwitchOption] = useState(null);
  
    useEffect(() => {
      setCameraSwitchOption(bindCameraSelector(cameraSelector));
    }, [cameraSelector]);
  
    return (
      <GUI.Folder name="Camera">
        {cameraSwitchOption}
      </GUI.Folder>
    );
  };
  
  const ObjectGeneratorFolder = ({ objectGenerator }) => {
    const [addObjectFolder, setAddObjectFolder] = useState(null);
  
    useEffect(() => {
      setAddObjectFolder(bindObjectGenerator(objectGenerator));
    }, [objectGenerator]);
  
    return (
      <GUI.Folder name="Add">
        {addObjectFolder}
      </GUI.Folder>
    );
  };


  const PropertiesPanel = ({ container, renderer, scene, controlledCamera, cameraSelector, objectGenerator }) => {
    const [rendererPropertyFolder, setRendererPropertyFolder] = useState(null);
    const [pcameraFolder, setPcameraFolder] = useState(null);
    const [ocameraFolder, setOcameraFolder] = useState(null);
    const [cameraSwitchOption, setCameraSwitchOption] = useState(null);
    const [addObjectFolder, setAddObjectFolder] = useState(null);
    const [addObjectFolderRef, setAddObjectFolderRef] = useState(null);
  
    useEffect(() => {
      // Inicializar los controles de la interfaz de usuario
      setRendererPropertyFolder(new GUI.Folder('Renderer'));
      setRendererPropertyFolder.current.add(renderer.shadowMap, 'enabled')
        .name("Shadow")
        .onChange(updateShadowOnChilds);
      setRendererPropertyFolder.current.add(renderer.shadowMap, 'type', { "PCFShadowMap": PCFShadowMap, "PCFSoftShadowMap": PCFSoftShadowMap })
        .onChange(updateShadowOnChilds);
  
      setPcameraFolder(new GUI.Folder('Viewport(Perspective)'));
      setPcameraFolder.current.add(controlledCamera.perspectiveCamera.position, 'x').min(-10).max(10).listen();
      setPcameraFolder.current.add(controlledCamera.perspectiveCamera.position, 'y').min(-10).max(10).listen();
      setPcameraFolder.current.add(controlledCamera.perspectiveCamera.position, 'z').min(-10).max(10).listen();
      setPcameraFolder.current.add(controlledCamera.perspectiveCamera, 'fov').min(1).max(180).listen().onChange(() => controlledCamera.perspectiveCamera.updateProjectionMatrix());
  
      setOcameraFolder(new GUI.Folder('Viewport(Orthograhpic)'));
      setOcameraFolder.current.add(controlledCamera.orthographicCamera.position, 'x').min(-10).max(10).listen();
      setOcameraFolder.current.add(controlledCamera.orthographicCamera.position, 'y').min(-10).max(10).listen();
      setOcameraFolder.current.add(controlledCamera.orthographicCamera.position, 'z').min(-10).max(10).listen();
      setOcameraFolder.current.add(controlledCamera.orthographicCamera, 'zoom').min(1).max(2000).listen().onChange(() => controlledCamera.orthographicCamera.updateProjectionMatrix());
  
      controlledCamera.onCameraSwitch = () => {
        if (controlledCamera.activeCamera.type === 'PerspectiveCamera') {
          pcameraFolder.domElement.hidden = false;
          ocameraFolder.domElement.hidden = true;
        } else {
          ocameraFolder.domElement.hidden = false;
          pcameraFolder.domElement.hidden = true;
        }
      };
      controlledCamera.onCameraSwitch();
  
      // Inicializar el control de la cámara
      setCameraSwitchOption(new GUI.Folder('Camera'));
      setCameraSwitchOption.current.add(cameraSelector, 'currentCameraName', Array.from(cameraSelector.keys()))
        .name('Camera')
        .listen()
        .onChange(() => {
          cameraSelector.switchCamera();
        });
  
      // Inicializar el control de los objetos
      setAddObjectFolder(new GUI.Folder('Add'));
      setAddObjectFolder.current.add(objectGenerator, 'sharedMaterial', Array.from(objectGenerator.assetsManager.materials.keys())).listen();
      setAddObjectFolder.current.add(objectGenerator, 'addPlane').name('Plane').onFinishChange(() => objectGenerator.unsetSharedMaterial());
      setAddObjectFolder.current.add(objectGenerator, 'addCube').name('Cube').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addCircle').name('Circle').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addUVSphere').name('UVSphere').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addIcoSphere').name('IcoSphere').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addCylinder').name('Cylinder').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addCone').name('Cone').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addTorus').name('Torus').onFinishChange(() => objectGenerator.unsetSharedMaterial());
        setAddObjectFolder.current.add(objectGenerator, 'addText').name('Text').onFinishChange(() => objectGenerator.unsetSharedMaterial());
    
        setAddObjectFolder.current.add(objectGenerator, 'addSpiralGalaxy').name('Spiral Galaxy');
        
        this.addObjectFolder.add(objectGenerator, 'addCamera').name('Camera');
        let addLightFolder = this.addObjectFolder.addFolder('Light');
        let ambientOption = addLightFolder.add(objectGenerator, 'addAmbientLight').name('Ambient').onChange(() => {
            addLightFolder.remove(ambientOption);
        });
        addLightFolder.add(objectGenerator, 'addDirectionalLight').name('Directional');
        addLightFolder.add(objectGenerator, 'addHemisphereLight').name('Hemisphere');
        addLightFolder.add(objectGenerator, 'addPointLight').name('Point');
        addLightFolder.add(objectGenerator, 'addRectAreaLight').name('RectArea')
        addLightFolder.add(objectGenerator, 'addSpotLight').name('Spot');

        //import .obj option
        this.addObjectFolder.add(objectGenerator, 'importModel').name('Import (.obj | .stl)');
    }
    , [renderer, scene, controlledCamera, cameraSelector, objectGenerator]);
  
    useFrame(() => {
      // Actualizar las propiedades de los objetos
      rendererPropertyFolder?.updateDisplay();
      pcameraFolder?.updateDisplay();
      ocameraFolder?.updateDisplay();
    });
  
    return (
      <div className="properties-panel">
        <h1>Properties Panel</h1>
        <div className="renderer-properties">
          {rendererPropertyFolder}
        </div>
        <div className="camera-properties">
          {pcameraFolder}
          {ocameraFolder}
          <div className="camera-selector">
            {cameraSwitchOption}
          </div>
        </div>
        <div className="object-generator">
          {addObjectFolder}
        </div>
      </div>
    );
  };
  
  export default PropertiesPanel;