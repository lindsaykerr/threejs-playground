import * as THREE from 'three'; 

export class AnimateObject {

    constructor(targetObj) {
        if (targetObj instanceof THREE.Object3D === false) {
            throw Error("targetObj is not instance of THREE.Object3D");
        }
        this.target = targetObj
        this.mixer = new THREE.AnimationMixer(targetObj);
        this.clipActions = {};
    }
    
    addClipAction(clipsSource, clipName) {
        this.clipActions[clipName] = this.mixer.clipAction(
            THREE.AnimationClip.findByName(clipsSource, clipName)
            );
    }
    
    playClipAction(clipName) {
        this.clipActions[clipName].play();
    }
    
    getClipAction(clipName) {
        return this.clipActions[clipName];
    }
    
    update(deltaSecond) {
        this.mixer.update(deltaSecond);
    }
}