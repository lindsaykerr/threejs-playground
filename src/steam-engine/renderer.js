import * as THREE from 'three';
import { STATE } from './state';
import { CONFIG } from './configs';

export const setup = (canvasElement, scene, camera) => {
    // instantiate a new renderer and assign it to a canvas
    const renderer = new THREE.WebGLRenderer({canvas: canvasElement, ...CONFIG.renderer.parameters});

    // initial renderer settings
    renderer.setSize(STATE.viewer.width, STATE.viewer.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)*1.5);
    renderer.render(scene, camera);
    renderer.shadowMap.enabled   = CONFIG.renderer.shadowMap.enabled;
    renderer.shadowMap.type      = CONFIG.renderer.shadowMap.type;
    renderer.outputEncoding      = CONFIG.renderer.outputEncoding;
    renderer.toneMapping         = CONFIG.renderer.toneMapping;
    renderer.toneMappingExposure = CONFIG.renderer.toneMappingExposure;
    return renderer;
}