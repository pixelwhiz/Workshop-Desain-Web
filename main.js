import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Buat scene, kamera, dan renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xdddddd);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.z = 4;
camera.position.y = 0.5;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

const loader = new GLTFLoader();
loader.load(
    './models/scene.gltf',
    (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        model.position.set(0, 0, 0);
        model.scale.set(1, 1, 1);

        function animate() {
            requestAnimationFrame(animate);

            model.rotation.x += 0.00;
            model.rotation.y += 0.00;
            model.rotation.z += 0.00;
            controls.update();

            renderer.render(scene, camera);
        }

        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading the model', error);
    }
);

animate();
