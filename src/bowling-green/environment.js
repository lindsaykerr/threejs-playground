
import { loadManager } from "./utils.js";

import { CubeTextureLoader, Vector3, MathUtils } from "three";
import px from './bg-asset/px.png';
import nx from './bg-asset/nx.png';
import py from './bg-asset/py.png';
import ny from './bg-asset/ny.png';
import pz from './bg-asset/pz.png';
import nz from './bg-asset/nz.png';

import {Sky} from 'three/examples/jsm/objects/Sky.js';

const cubeTextLoad = new CubeTextureLoader(loadManager);

export const cubeEnvTexture = cubeTextLoad.load([px,nx,py,ny,pz,nz],()=>{

});


/**
 * @typedef {object} skyConfig
 * @prop {number} [turbidity] atmosphere turbulence
 * @prop {number} [rayleigh] 
 * @prop {number} [mieCoefficient]
 * @prop {number} [mieDirectionalG]
 * @prop {number} [sunElevation]
 * @prop {number} [sunAzimuth]
 */

/**
 * @type {skyConfig}
 */
const skyDefaults = {
    turbidity: 5,
    rayleigh: .2, // atmosphere
    mieCoefficient: .005, // sun bloom
    mieDirectionalG: .07,
    sunElevation: 30,
    sunAzimuth: 180,
}


export const sunPosition = {
    x: 0,
    y: 0,
    z: 0,
    elevationRad: 0,
    azimuthRad: 0, 
    elevationDeg: 30,
    azimuthDeg: 60,
}

export const skyInstance = new Sky();



/**
 * 
 * @param {Sky} skyOject 
 * @param {skyConfig} skyconfig 
 * @returns 
 */
export const updateSky = function(config){
    skyInstance.scale.setScalar(45000);
    const skyconfig = config || {};
    const sun = new Vector3();
    

    skyInstance.material.uniforms[ 'turbidity' ]
        .value = skyconfig.turbidity || skyDefaults.turbidity;
    
    skyInstance.material.uniforms[ 'rayleigh' ]
        .value = skyconfig.rayleigh || skyDefaults. rayleigh; // atmosphere
    
    skyInstance.material.uniforms[ 'mieCoefficient' ]
        .value =  skyconfig.mieCoefficient || skyDefaults.mieCoefficient; // sun bloom
    
    skyInstance.material.uniforms[ 'mieDirectionalG' ]
        .value = skyconfig.mieDirectionalG || skyDefaults.mieDirectionalG;

    sunPosition.elevationDeg = skyconfig.sunElevation || sunPosition.elevationDeg;
    const phi = MathUtils.degToRad( 90 - sunPosition.elevationDeg );
    sunPosition.azimuthDeg = skyconfig.sunAzimuth || sunPosition.azimuthDeg;
    const theta = MathUtils.degToRad(sunPosition.azimuthDeg);

    sun.setFromSphericalCoords( 1, phi, theta );
    sunPosition.x = sun.x;
    sunPosition.y = sun.y;
    sunPosition.z = sun.z;
    sunPosition.elevationRad = phi;
    sunPosition.azimuthRad = theta;

    skyInstance.material.uniforms[ 'sunPosition' ].value.copy( sun );
}

updateSky(skyDefaults);