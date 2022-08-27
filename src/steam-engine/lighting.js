import * as THREE from 'three';
import { Vector3 } from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { scene } from './configs';
import { STATE } from './state';
import { CONFIG } from './configs';


export const addLighting = () => {

    const lights = CONFIG.lighting;
    const scene = STATE.scene.Obj;
    const lightingGroup = new THREE.Group();
    lightingGroup.name = "lighting";


    
    const windowA = new CreateAreaLight(
        lights.areaLightA.settings, 
        lights.areaLightA.position, 
        lights.areaLightA.target
        );
    const windowB = new CreateAreaLight(
        lights.areaLightB.settings,
        lights.areaLightB.position, 
        lights.areaLightB.target
        );
 





    const spotLightA = new CreateSpotLight(
        lights.spotlightA.lightProperties,
        lights.spotlightA.position,
        lights.spotlightA.target
        ).shadow( lights.spotlightA.shadowProperties );
    
    const spotLightB = new CreateSpotLight(   
        lights.spotlightB.lightProperties,
        lights.spotlightB.position,
        lights.spotlightB.target
    ).shadow( lights.spotlightB.shadowProperties );    
    
    
    windowA.helperOff();
    windowB.helperOff();

    spotLightA.shadowOn();
    spotLightA.helperOff();

    spotLightB.shadowOn();
    spotLightB.helperOff(); 
    
    lightingGroup.add(windowA.light, windowA.helper);
    STATE.lighting.windowA.lightObject = windowA.light;
    STATE.lighting.windowA.lightHelper = windowA.helper;

    lightingGroup.add(windowB.light, windowB.helper);
    STATE.lighting.windowB.lightObject = windowB.light;
    STATE.lighting.windowB.lightHelper = windowB.helper;

    lightingGroup.add(spotLightA.light, spotLightA.helper, spotLightA.light.target);
    STATE.lighting.spotlightA.lightObject = spotLightA.light;
    STATE.lighting.spotlightA.lightHelper = spotLightA.helper;
    STATE.lighting.spotlightA.position = spotLightA.light.position.toArray;
    STATE.lighting.spotlightA.target = spotLightA.light.target;


    lightingGroup.add(spotLightB.light, spotLightB.helper, spotLightB.light.target);
    STATE.lighting.spotlightB.lightObject = spotLightB.light;
    STATE.lighting.spotlightB.lightHelper = spotLightB.helper;
    STATE.lighting.spotlightB.position = spotLightB.light.position.toArray;
    STATE.lighting.spotlightB.target = spotLightB.light.target;
    
    scene.add(lightingGroup);
  
    
}



class CreateAreaLight {
    
    constructor(lightSetting, positionXYZ, targetXYZ) {
        this.light = new THREE.RectAreaLight(
            lightSetting.colour, 
            lightSetting.intensity, 
            lightSetting.areaHeight, 
            lightSetting.areaWidth
            );
        this.light.position.set(...positionXYZ); 
        this.light.lookAt(new THREE.Vector3(...targetXYZ));
        this.helper = new RectAreaLightHelper(this.light);
        return this;
    }

    helperOn() {
        this.helper.visible = true;
    }

    helperOff() {
        this.helper.visible = false;
    }
}


class CreateSpotLight {

    constructor(lightSetting, positionXYZ, targetXYZ) {
        this.light = new THREE.SpotLight(
            lightSetting.colour, 
            lightSetting.intensity,
            lightSetting.distance,
            lightSetting.angle,
            lightSetting.penumbra,
            lightSetting.decay
            );

        this.light.position.set(...positionXYZ);
        this.light.target.position.set(...targetXYZ);
        this.helper = new THREE.CameraHelper(this.light.shadow.camera);
        return this;
    }

    shadow(settings) {
        this.light.shadow.mapSize.width = settings.width;
        this.light.shadow.mapSize.height = settings.height;
        this.light.shadow.camera.near = settings.near;
        this.light.shadow.camera.far = settings.far
        this.light.shadow.bias = settings.bias;    
        this.light.shadow.camera.fov = settings.fov;
        return this;
    }

    shadowOn() {
        this.light.castShadow = true;        
    }

    shadowOff() {
        this.light.castShadow = false;
    }

    helperOn() {
        this.helper.visible = true;
    }

    helperOff() {
        this.helper.visible = false;
    }
}
