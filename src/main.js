import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

import { loadingManager } from './loaders/loadingManager.js';
import { createFloor } from './objects/floor.js';
import { createText } from './objects/text.js';
import { createLights } from './lights/lights.js';
import { loadPodium } from './models/podium.js';
import { loadKid } from './models/kid.js';

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene & Loaders
const scene = new THREE.Scene();
const dracoLoader = new DRACOLoader(loadingManager);
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
const ktx2Loader = new KTX2Loader(loadingManager);
ktx2Loader.setTranscoderPath('https://cdn.jsdelivr.net/npm/three@0.167.1/examples/jsm/libs/basis/');
ktx2Loader.detectSupport(renderer);
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);
gltfLoader.setKTX2Loader(ktx2Loader);
const textureLoader = new THREE.TextureLoader();
const fontLoader = new FontLoader();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-6, 2, 4);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI / 2.3;
controls.minDistance = 4;

// Floor
const floor = createFloor(textureLoader);
scene.add(floor);

// Models
loadPodium(gltfLoader, scene, textureLoader);
loadKid(gltfLoader, scene, textureLoader);

// Text
let textMesh;
createText(fontLoader, floor).then((mesh) => {
  textMesh = mesh;
});

// Lights
const lights = createLights();
scene.add(...lights, camera);

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation
function animate() {
  if (textMesh) {
    textMesh.rotation.z += 0.01;
  }
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();