import * as THREE from '../node_modules/three/build/three.module.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { Axes } from './objects/axes.js';
import { Plane } from './objects/plane.js';
import { Clock } from './objects/clock/clock.js';
import { AmbientLight } from './objects/lights/ambientLight.js';

export class SceneManager {
    constructor(canvas) {
        this._canvas = canvas;
        this._scene = this._buildScene();
        this._camera = this._buildCamera(canvas.width, canvas.height);
        this._renderer = this._buildRenderer(canvas.width, canvas.height);
        this._sceneObjects = this._buildSceneObjects();
        this._cameraControls = this._buildCameraControls();
    }

    // --- Pseudo private methods ---
    _buildScene() {
        const scene = new THREE.Scene({ background: 0x000000 });
        scene.fog = new THREE.Fog(0x000000, 5, 100);
        return scene;
    }

    _buildCamera(width, height) {
        const fov = 75;
        const aspectRatio = width / height;
        const zNear = 1;
        const zFar = 1000;
        const camera = new THREE.PerspectiveCamera(fov, aspectRatio, zNear, zFar);
        camera.position.set(0, 0, -25);
        camera.lookAt(0, 0, 0);
        return camera;
    }

    _buildRenderer(width, height) {
        const renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true });
        renderer.setSize(width, height);
        return renderer;
    }

    _buildSceneObjects() {
        const sceneObjects = {
            "light": new AmbientLight(this._scene, 0x404040),
            //"axes": new Axes(this._scene),
            "plane": new Plane(this._scene, 1000, 1000, 0x3b3b3b, -20, 32),
            "clock": new Clock(this._scene)
        };

        return sceneObjects;
    }

    _buildCameraControls() {
        const cameraControls = new OrbitControls(this._camera, this._renderer.domElement);
        cameraControls.autoRotate = false;
        cameraControls.autoRotateSpeed = 5.0;
        cameraControls.rotateSpeed = 0.5;
        cameraControls.enablePan = false;
        cameraControls.enableDamping = true;
        cameraControls.maxDistance = 100;
        cameraControls.minDistance = 10;
        return cameraControls;
    }

    // --- Pseudo public core methods ---
    update() {
        this._cameraControls.update();
        this._sceneObjects["clock"].update();
        //console.log(this._renderer.info);
        this._renderer.renderLists.dispose();
    }

    render() {
        this._renderer.render(this._scene, this._camera);
    }

    // --- Pseudo public additional methods ---
    onWindowResize() {
        const { width, height } = canvas;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }
}