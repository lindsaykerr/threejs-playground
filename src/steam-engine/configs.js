import {STATE} from './state';
import * as THREE from 'three';
/**
 * Module contains configuration objects, which the rest of the application
 * can reference 
 */

export const CONFIG = {
    renderer : {
        parameters : {
            antialias: true, 
            precision: "highp"
        },

        shadowMap : {
            enabled : true,
            type : THREE.PCFSoftShadowMap,
        },
        
        outputEncoding : THREE.sRGBEncoding,
        
        toneMapping : THREE.CustomToneMapping,
        toneMappingExposure : 1,
    },
    animations: {
        flywheelHandle : "flywheelCycle",
        mainPistonArmature : "mainPistonCycle",
        valvePistonArmature : "valvePistonCycle",
    },
    lighting: {
        areaLightA : {
            position: [-7, 2, 3],
            target : [-7, 0, 0],
            settings: {
                colour: 0xebfdff,
                intensity: 5, 
                areaHeight: 2, 
                areaWidth: 3
            },            
        },
        areaLightB : {
            position: [0, 2, 3],
            target : [0, 0, 0],
            settings: {
                colour: 0xebfdff,
                intensity: 5, 
                areaHeight: 2, 
                areaWidth: 3
            },
        },
        spotlightA : {
            position: [-0.8, 8, 0],
            target: [-0.8, 0, 0],
            lightProperties: {             
                colour : 0xfde696, 
                intensity : 7, 
                distance: 25, 
                angle:  Math.PI * 0.12, 
                penumbra: 0.5, 
                decay: 1,
            },
            shadowProperties: {
                width: 512,
                height: 512, 
                far: 10, 
                near: 2, 
                bias: -0.02,
                fov: 20,
            },
            
        }, 
        spotlightB : {
            position:  [-6, 8, 1],
            target: [-6, 0, 1],
            lightProperties: {             
                colour : 0xfde696, 
                intensity : 7, 
                distance: 25, 
                angle:  Math.PI * 0.12, 
                penumbra: 0.5, 
                decay: 1,
            },
            shadowProperties: {
                width: 512,
                height: 512, 
                far: 10, 
                near: 2, 
                bias: -0.02,
                fov: 20,
            },
        },

    },
    scene: {
        envMapIntensity: .5, 
    },
    camera: {
        fov: 40,
        aspect: STATE.viewer.width / STATE.viewer.height,
        near: .1,
        far: 120
    }
}

