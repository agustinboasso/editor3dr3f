import React, { useState } from "react";
import { useFrame } from "react-three-fiber";
import {
  Mesh,
  SphereGeometry,
  MeshStandardMaterial,
  TextureLoader,
  THREE,
} from "three";

const AssetsManager = () => {
  const [state, setState] = useState({
    textures: new Map(),
    materials: new Map(),
    fonts: new Map(),
  });

  useFrame(() => {
    // ...
  });

  return (
    <div>
      <h1>Assets Manager</h1>

      <div>
        <h2>Textures</h2>
        {state.textures.map((texture, textureId) => (
          <div key={textureId}>
            <img src={texture} />
            <button onClick={() => setState({ textures: state.textures.delete(textureId) })}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Materials</h2>
        {state.materials.map((material, materialId) => (
          <div key={materialId}>
            <Mesh
              geometry={new SphereGeometry(100, 100, 100)}
              material={material}
            />
            <button onClick={() => setState({ materials: state.materials.delete(materialId) })}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div>
        <h2>Fonts</h2>
        {state.fonts.map((font, fontId) => (
          <div key={fontId}>
            <p>Hola, mundo!</p>
            <button onClick={() => setState({ fonts: state.fonts.delete(fontId) })}>
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setState({ textures: state.textures.set("my-texture.png", new TextureLoader().load("my-texture.png")) })}>
        Cargar textura
      </button>

      <button onClick={() => setState({
        materials: state.materials.set(
          "my-material",
          new MeshStandardMaterial({
            color: 0xffffff,
            transparent: true,
          }),
        ),
      })}>
        Cargar material
      </button>

      <button onClick={() => setState({
        fonts: state.fonts.set(
          "my-font",
          new FontLoader().load("my-font.ttf"),
        ),
      })}>
        Cargar fuente
      </button>
    </div>
  );
};

export default AssetsManager;