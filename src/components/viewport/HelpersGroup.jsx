// HelperGroup.js
import React from 'react';
import { Group, Line, Mesh } from 'react-three-fiber';

const HelperGroup = ({ scene, camera, gridSize, axesLength, axesColor, gridColor }) => {
  const helperGroup = new Group();

  // Add the grid

  const grid = new Mesh(
    new Line(
      [
        new Vector3(-gridSize, 0, 0),
        new Vector3(gridSize, 0, 0),
      ],
      new LineBasicMaterial({ color: gridColor }),
    ),
    {
      rotation: new Vector3(0, Math.PI / 2, 0),
    },
  );
  helperGroup.add(grid);

  const gridY = new Mesh(
    new Line(
      [
        new Vector3(0, -gridSize, 0),
        new Vector3(0, gridSize, 0),
      ],
      new LineBasicMaterial({ color: gridColor }),
    ),
    {
      rotation: new Vector3(Math.PI / 2, 0, 0),
    },
  );
  helperGroup.add(gridY);

  const gridZ = new Mesh(
    new Line(
      [
        new Vector3(0, 0, -gridSize),
        new Vector3(0, 0, gridSize),
      ],
      new LineBasicMaterial({ color: gridColor }),
    ),
    {
      position: new Vector3(0, 0, -axesLength / 2),
      rotation: new Vector3(0, 0, Math.PI),
    },
  );
  helperGroup.add(gridZ);

  // Add the axes

  const xAxis = new Mesh(
    new Line(
      [
        new Vector3(-axesLength, 0, 0),
        new Vector3(axesLength, 0, 0),
      ],
      new LineBasicMaterial({ color: axesColor }),
    ),
    {
      position: new Vector3(0, 0, 0),
    },
  );
  helperGroup.add(xAxis);

  const yAxis = new Mesh(
    new Line(
      [
        new Vector3(0, -axesLength, 0),
        new Vector3(0, axesLength, 0),
      ],
      new LineBasicMaterial({ color: axesColor }),
    ),
    {
      position: new Vector3(0, 0, 0),
      rotation: new Vector3(Math.PI / 2, 0, 0),
    },
  );
  helperGroup.add(yAxis);

  const zAxis = new Mesh(
    new Line(
      [
        new Vector3(0, 0, -axesLength),
        new Vector3(0, 0, axesLength),
      ],
      new LineBasicMaterial({ color: axesColor }),
    ),
    {
      position: new Vector3(0, 0, 0),
      rotation: new Vector3(0, 0, Math.PI),
    },
  );
  helperGroup.add(zAxis);

  return (
    <Group ref={helperGroup}>
      {helperGroup.children}
    </Group>
  );
};

export default HelperGroup;