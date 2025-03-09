import './style.css'
import CModel from '/public/Assets/C_anime.glb';
import GModel from '/public/Assets/G_anime.glb';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';
// import { Break, color } from 'three/tsl';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

document.querySelector('#app').innerHTML = `
    <!-- <div id="loading-screen"> </div> -->
    <div class="three-container">
        <div class="entry">
            <nav>
                <h1 class="name">CG Craft</h1>
                <ul class = "menu">
                    <li> About </li>
                    <li> Contact </li>
                </ul>
            </nav>
            <div class = "info">
               I am Dhruv
            </div>
        </div>
    </div>
`




/* Three js starting from here */
/*
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
// scene.background = new THREE.Color( 0x1E201E ); //3C3D37
camera.position.z = 5;


const loadingScreen = document.getElementById("loading-screen");
// const progressBar = document.getElementById("progress-bar");

const manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	// console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

    loadingScreen.style.display = "flex";
};

const minLoadingTime = 2; // Minimum time in seconds
const startLoadTime = performance.now(); // Capture the start time

manager.onLoad = function ( ) {
	// console.log( 'Loading complete!');
    const elapsed = (performance.now() - startLoadTime) / 1000;
    const remainingTime = Math.max(minLoadingTime - elapsed, 0); // Ensure non-negative time
    let sceneCompleted = false;


    setTimeout(() => {
        console.log("Loading complete! Moving camera...");
        
        // Start the camera movement
        moveCameraSmoothly(camera, new THREE.Vector3(0, 0, -6), 1.5);
    
        // Smooth fade-out for the loading screen
        loadingScreen.style.opacity = "0";
    
        // Ensure it disappears after the fade-out duration (1s)
        setTimeout(() => {
            loadingScreen.style.display = "none";
            sceneCompleted = true;
            startMainScene();
        }, 1000); // Matches CSS transition time
    }, remainingTime * 1000);
};

// manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
// 	// console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );

//     // let progress = (itemsLoaded / itemsTotal) * 100;
//     // progressBar.style.width = progress + "%"; // Update width
//     // progressBar.innerText = Math.round(progress) + "%"; // Optional: Show text


//     // const progress = (itemsLoaded / itemsTotal) * 100;
//     // console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files. (${progress.toFixed(2)}%)`);

//     // Move the camera when loading reaches 90%
//     // if (progress >= 90) {
//     //     moveCameraSmoothly(camera, new THREE.Vector3(0, 0, -6), 1.5); // Move over 1.5 seconds
//     // }
// };

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};

function moveCameraSmoothly(camera, targetPosition, duration) {
    const startPosition = camera.position.clone();
    let startTime = performance.now();

    function updateCamera() {
        let elapsed = (performance.now() - startTime) / 1000;
        let t = Math.min(elapsed / duration, 1); // Normalize time (0 to 1)

        // Interpolate position
        camera.position.lerpVectors(startPosition, targetPosition, t);

        if (t < 1) {
            requestAnimationFrame(updateCamera);
        }
    }

    updateCamera();
}   

const loader = new GLTFLoader( manager );
let modelC;
let modelG;
let mixerC;
let mixerG;

loader.load( CModel, (gltf) => {
    modelC = gltf.scene;

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
    modelC.scale.set(3,3,3);
    scene.add(modelC);

    // mixer = new AnimationMixer(modelC);
    mixerC = new THREE.AnimationMixer(modelC);
    const clip = gltf.animations[0]; 
    if (clip) {
        const action = mixerC.clipAction(clip);
        action.play();
    }
    
    modelC.position.x = -2;
    modelC.position.y = 4;
    // modelC.position.y = -2;

},undefined, (error) => {
    console.error('Error loading GLB:', error);
});

loader.load(GModel, (gltf) => {
    modelG = gltf.scene;

    modelG.traverse((child) => {
        if (child.isMesh && child.material) {
            child.material.color.set(0xffffff);
        }
    });
    scene.add(modelG);

    mixerG = new THREE.AnimationMixer(modelG);
    const clip = gltf.animations[0]; 
    if (clip) {
        const action = mixerG.clipAction(clip);
        action.play();
    }
    
    modelG.position.x = -1.8;
    modelG.position.y = 4;
    modelG.scale.set(3,3,3);
},undefined, (error) => {
    console.error('Error loading GLB:', error);
});



const container = document.querySelector('#loading-screen'); 
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


const clock = new THREE.Clock();
let previousTime = 0;
let sceneCompleted = false;

const renderloop = () => {
    const currentTime = clock.getElapsedTime()
	const delta = currentTime - previousTime
	previousTime = currentTime

    const xspeed = 6;
    const zspeed = 3;
    let toZoom = false;

    if (mixerC) {
        mixerC.update(delta);
    }
    if (mixerG) {
        mixerG.update(delta);
    }

    if (modelC) {
        modelC.position.y += delta * -10;
        modelC.position.y = Math.max( -2, Math.min(modelC.position.y, 7));

    }
    if (modelG) {
        modelG.position.y += delta * -10;
        modelG.position.y = Math.max( -2, Math.min(modelG.position.y, 7));
    }

    renderer.render(scene, camera)	
	window.requestAnimationFrame(renderloop)
}

renderloop()
*/



// ----------------------------------------After loading starting page----------------------------------------------//

function startMainScene(){

    // renderer.domElement.style.display = "none";
    
    const scene_1 = new THREE.Scene();
    scene_1.background = new THREE.Color(0xB4EBE6);  // Dark gray background
    
    const camera_1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(5, 5, 5);
    scene_1.add(directionalLight);

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene_1.add(ambientLight);

    camera_1.position.z = 5;

    // container
    const container_1 = document.querySelector('.three-container'); 
    const renderer_1 = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer_1.setSize(window.innerWidth, window.innerHeight);
    container_1.appendChild(renderer_1.domElement);


    // event listner for window size
    window.addEventListener('resize', () => {
        camera_1.aspect = window.innerWidth/window.innerHeight;
        camera_1.updateProjectionMatrix();
        renderer_1.setSize(window.innerWidth, window.innerHeight);
    });

    // create model
    const box1 = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0xdddddd });
    const cube1 = new THREE.Mesh(box1, material);
    scene_1.add(cube1);

    cube1.position.y = 4.4;

    let scrollSpeed = 0;

    window.addEventListener("wheel", (event) => {
        scrollSpeed = event.deltaY * 0.005;
    });

    const clock = new THREE.Clock();
    let previousTime = 0;

    // start rendering
    const renderloop_1 = () => {
        const currentTime = clock.getElapsedTime();
        const delta = currentTime - previousTime;
        previousTime = currentTime;

        cube1.position.y += delta * -7;
        cube1.position.y = Math.max( -1, Math.min(cube1.position.y, 4.4));

        if(cube1.position.y != -1){
            cube1.rotation.y += delta * 4;
        }
        
        // Reset scroll speed each frame for smooth movement
        scrollSpeed *= 0.95;

        renderer_1.render(scene_1, camera_1);
        window.requestAnimationFrame(renderloop_1);
    }

    renderloop_1();
}
startMainScene()
