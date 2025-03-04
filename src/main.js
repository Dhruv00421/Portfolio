import './style.css'
import CModel from '/public/Assets/C.glb';
import GModel from '/public/Assets/G.glb';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { Break, color } from 'three/tsl';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.querySelector('#app').innerHTML = `
  <div id="loading-screen"> Welcome </div>
    <div class="three-container">
        <div class="entry">
            <nav>
                <h1 class="name">CG Craft</h1>
            </nav>
        </div>
    </div>
`
window.addEventListener("load", function () {
  let loadingScreen = document.getElementById("loading-screen");

  loadingScreen.style.display = "flex";
  void loadingScreen.offsetWidth;
  loadingScreen.style.opacity = "0";

  setTimeout(() => {
      loadingScreen.style.display = "none";
  }, 500); // Matches CSS transition duration
});



/* Three js starting from here */

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
scene.background = new THREE.Color( 0x1E201E ); //3C3D37
camera.position.z = 5;

const loader = new GLTFLoader();
let modelC;
let modelG;

loader.load( CModel, (gltf) => {
    modelC = gltf.scene;

    // Change Material for Each Mesh in Model
    modelC.traverse((child) => {
        // if (child.isMesh) {
        //     child.material = new THREE.MeshStandardMaterial({
        //         color: 0xffffff,
        //         metalness: 0.5,
        //         roughness: 0.5
        //     });
        // }
        if (child.isMesh && child.material) {
            child.material.color.set(0xffffff);
        }
    });
    
    scene.add(modelC);
    modelC.position.x = -2;
    modelC.position.y = -2;
    modelC.scale.set(3,3,3);

});

loader.load(GModel, (gltf) => {
    modelG = gltf.scene;

    modelG.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.color.set(0xffffff);
        }
    });
    
    scene.add(modelG);
    modelG.position.x = -1.8;
    modelG.position.y = -2;
    modelG.scale.set(3,3,3);
});


const box1 = new THREE.BoxGeometry(1,1,1);
const box2 = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial( { color: 0x6c3 } );
const cube1 = new THREE.Mesh( box1, material );
const cube2 = new THREE.Mesh( box1, material );
scene.add( cube1 );
// scene.add( cube2 );

cube1.position.x = -5;
cube1.position.y = -10;


const container = document.querySelector('.three-container'); 
const renderer = new THREE.WebGLRenderer({
	// canvas: canvas,
	antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
container.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	
})

let scrollSpeed = 0;

window.addEventListener("wheel", (event) => {

    scrollSpeed = event.deltaY * 0.005;

});

const clock = new THREE.Clock()
let previousTime = 0 

const renderloop = () => {
    const currentTime = clock.getElapsedTime()
	const delta = currentTime - previousTime
	previousTime = currentTime

    // camera.position.z -= scrollSpeed * delta * 5; // Frame-rate independent movement
    // camera.position.z = Math.max(-1, Math.min(camera.position.z, 5));

    cube1.position.y += scrollSpeed * delta * 20;
    cube1.position.y = Math.max(-10, Math.min(cube1.position.y, 0));

    if (modelC) {
        modelC.position.x += scrollSpeed * delta * -10;
        modelC.position.x = Math.max(-100, Math.min(modelC.position.x, -2));
        modelC.position.z += scrollSpeed * delta * 10;
        modelC.position.z = Math.max( 1, Math.min(modelC.position.z, 10));
        // modelC.rotation.y += scrollSpeed * delta * -40;

    }
    if (modelG) {
        modelG.position.x += scrollSpeed * delta * 10; 
        modelG.position.x = Math.max( -1.8, Math.min(modelG.position.x, 100));
        modelG.position.z += scrollSpeed * delta * 10;
        modelG.position.z = Math.max( 1, Math.min(modelG.position.z, 10));
        // modelC.rotation.y += scrollSpeed * delta * -40;

    }
    // cube2.position.x = Math.max( 1,  Math.min(cube2.position.z, 10));

    // cube1.rotation.y += scrollSpeed * delta * 10; // Rotate cubes smoothly
    // cube2.rotation.y += scrollSpeed * delta * 10;

    scrollSpeed *= 0.95; // Reduce speed over time for a natural stop


    renderer.render(scene, camera)	
	window.requestAnimationFrame(renderloop)
}

renderloop()
