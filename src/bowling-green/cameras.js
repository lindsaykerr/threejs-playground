import * as THREE from 'three'

// Camera Type Enum
export const CameraType = {
    PERSPECTIVE: 1,
    ORTHOGRAPHIC: 2,
}

// initialise a new camera from an object containing configuration properties
export const initialiseCamera = (cameraConfig) => {
    switch(cameraConfig.type) {
        case CameraType.PERSPECTIVE:
            return {
                object: new THREE.PerspectiveCamera(
                    cameraConfig.config.fov,
                    cameraConfig.config.aspect,
                    cameraConfig.config.near,
                    cameraConfig.config.far
                    ),
                type: CameraType.PERSPECTIVE,
                }
        break;
        default:
            throw Error("Incorrect camera type");
        break;
        
    }
}