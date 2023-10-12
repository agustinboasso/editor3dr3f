import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/Editor';

const viewportCanvas = document.getElementById('webgl');

// Create the React element for the Editor component
const editorElement = <Editor viewportCanvas={viewportCanvas} />;

// Render the React element to the DOM
ReactDOM.render(editorElement, document.getElementById('root'));