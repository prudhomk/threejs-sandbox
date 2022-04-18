import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const canvas = document.getElementById("webgl");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.z = 2;

//Sets orbit controls, set to a constant to target specific properties
new OrbitControls(camera, canvas);
// const orbitControls = new OrbitControls(camera, canvas);
// orbitControls.enableZoom = false;

//Box
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: "white" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Displays an X, Y, Z axis guide
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

//Lighting
const dirLight = new THREE.DirectionalLight("yellow", 1.0);
dirLight.position.set(1, 1, 1);
//By default light is targeted towards 0, 0, 0
scene.add(dirLight);

const dirLightHelper = new THREE.DirectionalLightHelper(dirLight);
scene.add(dirLightHelper);

const ambientLight = new THREE.AmbientLight("purple", 0.5);
scene.add(ambientLight);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Renders and animates object 60 fps (think useEffect)
const tick = () => {
  renderer.render(scene, camera);
  mesh.rotation.y += 0.01;

  requestAnimationFrame(tick);
};

tick();
