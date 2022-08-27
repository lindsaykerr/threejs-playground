import * as THREE from 'three';
import * as CONFIG from './configs';
import {CreateNewScene} from './scenes';
import * as LIGHTING from './lighting';
import { Scene, StereoCamera, Vector2, Vector3 } from 'three';

import * as TEXTURE from './textures'
import * as ASSETS from './assets'
import * as RENDERER from './renderer';
//import { generateUUID } from 'three/src/math/MathUtils';
import { STATE } from './state';
import {OrthographicCamera} from './camera';
import {gui} from './gui';

let scene;



const canvasElement = document.querySelector(".viewer-3d");
const envMap = TEXTURE.loadEnvironmentCubMap();
envMap.encoding = THREE.sRGBEncoding;

window.addEventListener("resize", (e) =>{
    // get width and height of the browser window
    const width = e.target.innerWidth;
    const height = e.target.innerHeight;

    const updateViewer = () => {
        STATE.viewer.width = width;
        STATE.viewer.height = height;

    }
    
    const updateCamera = () => {
        const aspect = width / height
        mainCamera.camera.left = -5 * aspect;
        mainCamera.camera.right = 5 * aspect;
        mainCamera.camera.updateProjectionMatrix();
    }

    const updateRenderer = () => {
        renderer.setSize(width, height);
        renderer.render(scene, mainCamera.camera);
    }

    updateViewer();
    updateCamera();
    updateRenderer();
});

// set up a scene and camera
const sceneSetup = () => {
    const mainScene = new CreateNewScene();
    mainScene.setAsMain();
    scene = STATE.scene.Obj;
    ASSETS.loadSteamEngineIntoScene();
    LIGHTING.addLighting()
};

sceneSetup();



const mainCamera = new OrthographicCamera(10, 10, 0.1, 20, [-10, 4, 6], [0, 0, 0]);
mainCamera.helperOn();
STATE.camera.obj = mainCamera.camera;
STATE.camera.helper = mainCamera.helper;

const renderer = RENDERER.setup(canvasElement, STATE.scene.Obj, mainCamera.camera);

/**
 * @type {THREE.AnimationClip}
 */
const animations = STATE.animations;
console.log(animations)
const clock = new THREE.Clock();

function onAssetsLoaded(func){
    if (!STATE.sceneAssets.loaded) {
        setTimeout(onAssetsLoaded, 100);
    }
    if (func) func();
}

const initialiseEngine = (duration, timeScale) => {

    const flywheelAction = animations['flywheelHandle']?.getClipAction('flywheelCycle');
    flywheelAction?.warp(0, timeScale, duration);
    
    const mainPistonAction = animations['mainPistonArmature']?.getClipAction('mainPistonCycle');
    mainPistonAction?.syncWith(flywheelAction).warp(0, timeScale, duration);
    
    const valvePistonAction = animations.valvePistonArmature?.getClipAction('valvePistonCycle');
    valvePistonAction?.syncWith(flywheelAction).warp(0, timeScale, duration);
}


const runningEngine = () => {
    animations['flywheelHandle']?.getClipAction('flywheelCycle').play();
    animations['mainPistonArmature']?.getClipAction('mainPistonCycle').play();
    animations['valvePistonArmature']?.getClipAction('valvePistonCycle').play();
}

const stoppingEngine = (timeScale) => {
    const flywheel = animations['flywheelHandle']?.getClipAction('flywheelCycle')
    flywheel?.halt(10);
    const piston = animations['mainPistonArmature']?.getClipAction('mainPistonCycle');
    piston?.halt(10);
    const valve = animations['valvePistonArmature']?.getClipAction('valvePistonCycle');
    valve?.halt(10);
}

const resetEngine = (startAt, duration, timeScale) => {
    animations['flywheelHandle']?.getClipAction('flywheelCycle').stop();
    animations['mainPistonArmature']?.getClipAction('mainPistonCycle').stop();
    animations['valvePistonArmature']?.getClipAction('valvePistonCycle').stop();   

}

let animationActive = "";

const lastTime = clock.getDelta();
onAssetsLoaded(()=> {

    
    
    gui();

    const renderLoop = () => {
        const time = clock.getDelta();     
        const animationAction = animations['flywheelHandle']?.getClipAction('flywheelCycle');
        let timeScale = animationAction?.getEffectiveTimeScale();

        if (STATE.animationControls.engineRunning) {
            console.log("in")
            
            if (animationActive !== "running") {
                initialiseEngine(20, 1.5)
                runningEngine();
                animationActive = "running";
            }            
 
        }
        else {
            if (animationActive === "running") {
                stoppingEngine(timeScale);
                animationActive = "stopping";
            }
            if (!animationAction?.isRunning()) {
 
                resetEngine(time, 20, 1.5);
            }
    
        }
        for(const key in animations) {
            animations[key].update(time);
        }



        
        renderer.render(scene, mainCamera.camera);

        requestAnimationFrame(renderLoop);
    } 

    renderLoop();
});
    









