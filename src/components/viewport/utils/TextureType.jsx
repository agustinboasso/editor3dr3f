import { useLoader } from 'react-three-fiber';

const TextureType = ({ type, path, properties }) => {
  const texture = useLoader(THREE.TextureLoader, path);

  if (type === 'normalMap') {
    texture.normalMap = true;
  }

  if (properties) {
    texture.applyProperties(properties);
  }

  return texture;
};

export default TextureType;