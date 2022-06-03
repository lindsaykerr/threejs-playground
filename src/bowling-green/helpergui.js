import * as dat from 'lil-gui';

import * as scenes from './scenes.js';
import { skyInstance, sunPosition, updateSky } from './environment.js';
import {sunLight, updateSunProjection, sunHelper, updateSunLight} from './lighting.js';

scenes.mainScene.add(sunHelper)
const gui = new dat.GUI();



// Sky options 
const guiSky = gui.addFolder("Sky values");
    
    const skyshader = skyInstance.material.uniforms;
    guiSky.add(skyshader['turbidity'],'value',0,100,1).name("turbidity");
    guiSky.add(skyshader['rayleigh'],'value',0,10,.1).name("rayleigh");
    guiSky.add(skyshader['mieCoefficient'],'value',0.001,.5,.001).name("mieCoefficient");
    guiSky.add(skyshader['mieDirectionalG'],'value',0.001,.5,.001).name("mieDirectionalG");
    
    const sunPos = {
        elevation: 30,
        azimuth: 180
    }
    updateSky({sunElevation: sunPos.elevation, sunAzimuth: sunPos.azimuth});
    updateSunProjection();
    guiSky.add(sunPos,'elevation',1,360,.5).onChange((v)=>{
        updateSky({sunElevation: v});
        updateSunLight();
    });
    guiSky.add(sunPos,'azimuth',1,360,.5).onChange((v)=>{
        updateSky({sunAzimuth: v});
        updateSunLight();
    });

// Sun Lighting
const guiSunLight = gui.addFolder('Sun lighting');
guiSunLight.add(sunHelper, "visible").name("Show sun helper");
guiSunLight.add(sunLight, "intensity", 0.1, 20, 0.1);

// >> Sun Shadow settings
const guiDirShadow = guiSunLight.addFolder("Shadow settings");

    guiDirShadow.add(sunLight.shadow.camera, 'top',0.5,100,0.5)
    .onChange((v)=>{
        updateSunLight({shadowBoxHeight: v, shadowBoxWidth: v});
        sunHelper.update();
        updateSunProjection();
    })
    .name("Shadow area");


    guiDirShadow.add(sunLight.shadow.camera, "near", 0.1, 10 , 0.1)
    .onChange(()=>{
        sunHelper.update();
        updateSunProjection();
    });
    guiDirShadow.add(sunLight.shadow.camera, "far", 10, 100, 1)
    .onChange(()=>{
        sunHelper.update();
        updateSunProjection();
    });
