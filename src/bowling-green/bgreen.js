import * as THREE from 'three';

import { loadManager } from './utils.js';

import * as scenes from './scenes.js'

import { CameraType, initialiseCamera } from './cameras.js';
import { sunHelper } from './lighting.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { Mesh, Vector2 } from 'three';
import './helpergui.js';



const canvas = document.querySelector("#i01");


// View is used to store references to current scene and camera,
// it also holds the view dimensions.
const view = {
    camera: {
        object: null,
        type: "",
    },
    scene: null,
    size: {
        width: window.innerWidth,
        height: window.innerHeight, 
    }
}

// Used to manage more than one camera. 
const cameras = {
    "main": {
        type: CameraType.PERSPECTIVE,
        config: {
            fov: 60,
            aspect: view.size.width / view.size.height,
            near: 0.1,
            far: 500.0, 
        },
        ref: null,
    },
}


// load files 








view.camera = initialiseCamera(cameras["main"]);
view.scene = scenes.mainScene;
view.camera.object.position.y = 2;

// rendering
const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setPixelRatio(1);
renderer.setSize(view.size.width, view.size.height);

renderer.shadowMap.enabled = true;
renderer.physicallyCorrectLights = true;
const controls = new OrbitControls( view.camera.object, renderer.domElement );
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1

function renderFrame(time) {
    renderer.render(view.scene, view.camera.object);
    //dirHelper.update()
    controls.update();
    requestAnimationFrame(renderFrame);
}

requestAnimationFrame(renderFrame);



//events
window.addEventListener("resize", (e)=>{
    view.size.width = window.innerWidth;
    view.size.height = window.innerHeight;

    if (view.camera.type === CameraType.PERSPECTIVE) {
        view.camera.object.aspect = view.size.width / view.size.height;
    }
    
    view.camera.object.updateProjectionMatrix();  
    
    renderer.setSize(view.size.width, view.size.height);
    renderer.render(view.scene, view.camera.object);  
});  
