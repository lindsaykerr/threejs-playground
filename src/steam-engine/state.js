export const STATE = { 
    viewer : {
        width: window.innerWidth,
        height: window.innerHeight,
    },
    sceneAssets : {
        loaded: false,
    },
    animations : {},
    animationControls : {
        engineRunning: false,
        currentTimeScale: 0,
        animationRunning: false,
    },
    scene : {
        Obj: {},
        envMap: undefined,
    },
    lighting: { 
        windowA : {
            lightObject: undefined,
            lightHelper: undefined,
        },
        windowB : {
            lightObject: undefined,
            lightHelper: undefined,
        },
        spotlightA : {
            lightObject: undefined,
            lightHelper: undefined,
            position: undefined,
            target: undefined,
            shadowHelper: undefined
        },
        spotlightB : {
            lightObject: undefined,
            lightHelper: undefined,
            position: undefined,
            target: undefined,
            shadowHelper: undefined
        }
    },
    camera: {
        obj: undefined,
        helper: undefined,
        target: {
            x: 0,
            y: 0,
            z: 0,
        }
    }
}
