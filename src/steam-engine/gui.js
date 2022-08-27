import * as sGui from 'lil-gui';
import { STATE } from './state';


export const gui = () => {
    const gui = new sGui.GUI();
    const cameraFolder = gui.addFolder('Camera');

    cameraFolder.add(STATE.camera.target, 'x', -10,10, .1).name('lookAt x').onChange(()=>{
        STATE.camera.obj.lookAt(
            STATE.camera.target.x,
            STATE.camera.target.y,
            STATE.camera.target.z,
        );
        STATE.camera.obj.updateProjectionMatrix();    
    });

    cameraFolder.add(STATE.camera.target, 'y', -10,10, .1).name('lookAt y').onChange(()=>{
        STATE.camera.obj.lookAt(
            STATE.camera.target.x,
            STATE.camera.target.y,
            STATE.camera.target.z
        );
        STATE.camera.obj.updateProjectionMatrix();
        
    });;
    cameraFolder.add(STATE.camera.target, 'z', -10,10, .1).name('lookAt z').onChange(()=>{
        STATE.camera.obj.lookAt(
            STATE.camera.target.x,
            STATE.camera.target.y,
            STATE.camera.target.z
        );
        STATE.camera.obj.updateProjectionMatrix();
    });

    cameraFolder.add(STATE.camera.helper, 'visible')
    cameraFolder.add(STATE.camera.obj.position, 'x',-10,10,.1);
    cameraFolder.add(STATE.camera.obj.position, 'y',-10,10,.1);
    cameraFolder.add(STATE.camera.obj.position, 'z',-10,10,.1);

    const engineControls = gui.addFolder("Engine Controls");
    engineControls.add(STATE.animationControls, 'engineRunning').name("Run Engine");
    //engineControls.add().name("StopEngine Engine");

} 


