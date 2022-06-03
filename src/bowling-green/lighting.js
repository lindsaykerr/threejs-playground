import { Color, Light, DirectionalLight, CameraHelper } from "three";
import { sunPosition } from "./environment.js";

/**
 * @typedef {object} SunLightConfig
 * @prop {number} [intensity]
 * @prop {THREE.Color} [color]
 * @prop {boolean} [castShadow]
 * @prop {number} [shadowMapSizeW]
 * @prop {number} [shadowMapSizeH]
 * @prop {number} [shadowBoxWidth]
 * @prop {number} [shadowBoxHeight]
 * @prop {number} [shadowNormalBias]
 * @prop {number} [near]
 * @prop {number} [far]
 */


export const sunLight = new DirectionalLight(0xffffff, 2);

// default values

updateSunLight({
    castShadow: true,
    shadowMapSizeW: 2048,
    shadowMapSizeH: 2048,
    shadowBoxHeight: 18,
    shadowBoxWidth: 18,
    shadowNormalBias: 0.05,
    near: 3.4,
    far: 50,
});





/**
 * Updates the sun (directional) light properties
 * @param {SunLightConfig} lightConfig 
 */
export function updateSunLight(lightConfig) {
    if (lightConfig === undefined) {
        lightConfig = {};
    }
    sunLight.intensity = lightConfig.intensity || sunLight.intensity;
    sunLight.color = lightConfig.color || sunLight.color;
    sunLight.castShadow = lightConfig.castShadow || sunLight.castShadow ;
    sunLight.shadow.mapSize.width = lightConfig.shadowMapSizeW || sunLight.shadow.mapSize.width;
    sunLight.shadow.mapSize.height = lightConfig.shadowMapSizeH || sunLight.shadow.mapSize.height;
    sunLight.shadow.camera.top = lightConfig.shadowBoxHeight / 2 || sunLight.shadow.camera.top;
    sunLight.shadow.camera.bottom = -(lightConfig.shadowBoxHeight / 2) || sunLight.shadow.camera.bottom;
    sunLight.shadow.camera.left = -(lightConfig.shadowBoxWidth / 2) || sunLight.shadow.camera.left;
    sunLight.shadow.camera.right = (lightConfig.shadowBoxWidth / 2) || sunLight.shadow.camera.right;
    sunLight.shadow.normalBias = lightConfig.shadowNormalBias || sunLight.shadow.normalBias;
    sunLight.shadow.camera.near = lightConfig.near || sunLight.shadow.camera.near;
    sunLight.shadow.camera.far = lightConfig.far || sunLight.shadow.camera.far;
    sunLight.target.position.set(0,0,0);

    const phi = sunPosition.elevationRad;
    const theta = sunPosition.azimuthRad;
    sunLight.position.setFromSphericalCoords(20, phi, theta);
}



export const updateSunProjection = () => {
    sunLight.shadow.camera.updateProjectionMatrix();
}

export const sunHelper = new CameraHelper(sunLight.shadow.camera);







