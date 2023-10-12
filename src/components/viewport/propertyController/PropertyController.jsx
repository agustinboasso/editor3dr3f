import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { GUI } from "dat.gui";

class PropertyController extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        gui: new GUI(),
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
  
      // visibility
      this.state.gui.add(interactiveObject, "visible").onChange(() => {
        interactiveObject.onVisibleChange();
      });
  
      if (interactiveObject.helper.selectable) {
        // selection
        this.state.gui.add(interactiveObject.helper, "selected").listen().onChange(() => {
          interactiveObject.helper.onSelectionChange();
        });
        interactiveObject.helper.addEventListener("select", () => {
          this.state.gui.open();
        });
        interactiveObject.helper.addEventListener("deselect", () => {
          this.state.gui.close();
        });
      }
  
      // enable/disable transform controller
      this.state.gui.add(interactiveObject.helper, "hasTransformControl").name("Transform control").listen().onChange(() => {
        interactiveObject.helper.onTransformControlsChange();
      });
  
      // delete button
      this.state.gui.add(interactiveObject.helper, "dispose").name("Delete");
  
      // transform
      const transformPropertyFolder = this.state.gui.addFolder("Transform");
      PropertyController.attachTranformProperties(interactiveObject, transformPropertyFolder);
    }
  
    static attachTranformProperties(interactiveObject, propertiesFolder) {
      propertiesFolder.add(interactiveObject.position, "x").name("PositionX").min(-50).max(50).step(0.01).listen();
      propertiesFolder.add(interactiveObject.position, "y").name("PositionY").min(-50).max(50).step(0.01).listen();
      propertiesFolder.add(interactiveObject.position, "z").name("PositionZ").min(-50).max(50).step(0.01).listen();
  
      propertiesFolder.add(interactiveObject.rotation, "x").name("RotateX").min(-3.14).max(3.14).step(0.01).listen();
      propertiesFolder.add(interactiveObject.rotation, "y").name("RotateY").min(-3.14).max(3.14).step(0.01).listen();
      propertiesFolder.add(interactiveObject.rotation, "z").name("RotateZ").min(-3.14).max(3.14).step(0.01).listen();
  
      propertiesFolder.add(interactiveObject.scale, "x").name("ScaleX").min(-100).max(100).step(0.01).listen();
      propertiesFolder.add(interactiveObject.scale, "y").name("ScaleY").min(-100).max(100).step(0.01).listen();
      propertiesFolder.add(interactiveObject.scale, "z").name("ScaleZ").min(-100).max(100).step(0.01).listen();
    }
  }
  
  export default PropertyController;
  