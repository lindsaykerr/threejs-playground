import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import steamEngine from './assets/steamengine.glb';
import { AnimateObject } from './animation';
import { STATE } from './state';
import { CONFIG } from './configs';

/**
 * Module deals with loading 3D assets
 */

export const loadSteamEngineIntoScene = () => {
    const glbLoader = new GLTFLoader();
    glbLoader.load(steamEngine,(glb)=>{

        const assignAnimationObjectToClip = (animationObjectName, animationClipName) => {

            const object = new AnimateObject(glb.scene.getObjectByName(animationObjectName));
            object.addClipAction(glb.animations, animationClipName);
            STATE.animations[animationObjectName] = object;
        }
        
        for (let key in CONFIG.animations) {
            assignAnimationObjectToClip(key, CONFIG.animations[key]);
        }
        

        glb.scene.scale.set(2,2,2);
        glb.scene.traverse((node)=>{
            if(node instanceof THREE.Mesh) {
                node.castShadow = true;
                node.receiveShadow = true;
                if (node.material instanceof THREE.MeshStandardMaterial) {
                    node.material.envMap = STATE.scene?.envMap;
                    node.material.envMapIntensity = CONFIG.scene?.envMapIntensity;
                }
            } 
        })
        STATE.scene?.Obj.add(glb.scene);
        STATE.sceneAssets.loaded = true; 
    },) 
}