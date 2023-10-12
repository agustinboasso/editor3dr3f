import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { GUI } from "dat.gui";

class BoxProperty extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        gui: new GUI(),
        geometryData: {
          width: 10,
          height: 10,
          depth: 10,
          widthSegments: 1,
          heightSegments: 1,
          depthSegments: 1,
        },
      };
    }
  
    componentDidMount() {
      this.initProperties();
    }
  
    render() {
      return this.state.gui.domElement;
    }
  
    initProperties() {
      const { interactiveObject } = this.props;
  
      const geometryPropertyFolder = this.state.gui.addFolder("Geometry");
  
      geometryPropertyFolder.add(this.state.geometryData, "width").min(1).max(50).onChange(() => {
        this.regenerate();
      });
      geometryPropertyFolder.add(this.state.geometryData, "height").min(1).max(50).onChange(() => {
        this.regenerate();
      });
      geometryPropertyFolder.add(this.state.geometryData, "depth").min(1).max(50).onChange(() => {
        this.regenerate();
      });
      geometryPropertyFolder.add(this.state.geometryData, "widthSegments").min(1).max(50).onChange(() => {
        this.regenerate();
      });
      geometryPropertyFolder.add(this.state.geometryData, "heightSegments").min(1).max(50).onChange(() => {
        this.regenerate();
      });
      geometryPropertyFolder.add(this.state.geometryData, "depthSegments").min(1).max(50).onChange(() => {
        this.regenerate();
      });
  
      this.regenerate();
    }
  
    regenerate() {
      const { geometryData } = this.state;
      const newGeometry = new THREE.BoxGeometry(
        geometryData.width,
        geometryData.height,
        geometryData.depth,
        geometryData.widthSegments,
        geometryData.heightSegments,
        geometryData.depthSegments
      );
      interactiveObject.updateGeometry(newGeometry);
    }
  }
  
  export default BoxProperty;