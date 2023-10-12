import React, { useRef, useState } from "react";
import { useFrame } from "react-three-fiber";
import { GUI } from "dat.gui";

class CameraPropertyController extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gui: new GUI(),
    };

    this.minMaxHelper = new MinMaxPropertyHelper(this.props.interactiveCamera.camera, "near", "far", 0.1);
  }

  componentDidMount() {
    this.initProperties();
  }

  render() {
    return this.state.gui.domElement;
  }

  initProperties() {
    const { interactiveCamera } = this.props;

    this.state.gui.add(interactiveCamera.camera, "fov").min(1).max(180).listen().onChange(() => {
      interactiveCamera.camera.updateProjectionMatrix();
      interactiveCamera.update();
    });

    this.state.gui.add(this.minMaxHelper, "min", 0.1, 50, 0.1).name("near").listen().onChange(() => {
      interactiveCamera.camera.updateProjectionMatrix();
      interactiveCamera.update();
    });
    this.state.gui.add(this.minMaxHelper, "max", 0.1, 50, 0.1).name("far").listen().onChange(() => {
      interactiveCamera.camera.updateProjectionMatrix();
      interactiveCamera.update();
    });
  }
}

export default CameraPropertyController;

class MinMaxPropertyHelper {
  constructor(obj, minProp, maxProp, minDif) {
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
    this.minDif = minDif;
  }

  get min() {
    return this.obj[this.minProp];
  }

  set min(v) {
    this.obj[this.minProp] = v;
    this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
  }

  get max() {
    return this.obj[this.maxProp];
  }

  set max(v) {
    this.obj[this.maxProp] = v;
    this.min = this.min;  // this will call the min setter
  }
}