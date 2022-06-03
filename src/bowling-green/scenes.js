import { Scene } from "three";
import { loadManager } from "./utils.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Color, Mesh } from "three";
import * as environment from './environment.js';
import * as lighting from './lighting.js';

import file3D from './bg-asset/testbowlinggreen.glb'



/*
 * Start of Main scene
 */
export const mainScene = new Scene();
mainScene.environment = environment.cubeEnvTexture;

// add sky
const sceneSky = environment.skyInstance;
environment.updateSky();
mainScene.add(sceneSky);


// add sun
const sunlight = lighting.sunLight;
lighting.updateSunLight();
mainScene.add(sunlight);
mainScene.add(sunlight.target);


// load objects
const gltfLoad = new GLTFLoader(loadManager);
gltfLoad.load(file3D, (gltf)=>{
    mainScene.add(gltf.scene);
    console.log(gltf.scene)

    // TODO: Refine the following steps 
    const lawnMesh = gltf.scene.getObjectByName('lawn');
    const lawnBase = gltf.scene.getObjectByName('lawn_base');
    lawnBase.castShadow = true;


    lawnBase.receiveShadow = true;
    const bowl = gltf.scene.getObjectByName('bowl');
    bowl.material.roughness = .1;
    bowl.material.envmapIntensity = 10;
    bowl.material.color = new Color(0x111111)
    bowl.castShadow = true;
    const jack = gltf.scene.children[2];
    jack.castShadow = true; 
    lawnMesh.receiveShadow = true;

    
    
},()=>{},(e)=>{
    console.log(e.message)
});


/* scene ends */
