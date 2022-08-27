import * as THREE from 'three';
import { camera } from './configs';
import { STATE } from './state';


class Camera {
    constructor(position, target) {
        this.position = position;
        this.target = target;
    }
}

export class OrthographicCamera extends Camera {
    constructor(lensWidth, lensHeight, near, far, position, target, name) {
        super(position, target);
        const halfLensWidth = lensWidth * 0.5;
        const halfLensHeight = lensHeight * 0.5;
        const viewerAspectRatio = STATE.viewer.width / STATE.viewer.height;
        
        this.camera = new THREE.OrthographicCamera(
            -halfLensWidth * viewerAspectRatio, halfLensWidth * viewerAspectRatio,
            halfLensHeight, -halfLensHeight, near, far
        );

        if (name) {
            this.camera.name = name;
        }
        
        this.camera.position.set(...position);
        this.camera.lookAt(...target);

        this.helper = new THREE.CameraHelper(this.camera);
        if (STATE.scene.Obj) {
            STATE.scene.Obj.add(this.helper);
        }
        this.helper.visible = false;

    }

    positionCamera(arrXYZ) {
        this.position = arrXYZ;
        this.camera.position.set(...this.position);
    }

    lookingAt(targetArrXYZ) {
        this.target = targetArrXYZ;
        this.camera.lookAt(...this.target);
    }

    helperOn() {
        this.helper.visible = true;
    }
    helperOff() {
        this.helper.visible = false;
    }
}



