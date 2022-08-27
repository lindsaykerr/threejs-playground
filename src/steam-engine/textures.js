import { CubeTextureLoader } from 'three';
import { STATE } from './state';

import envmap_nx from './assets/envmap2/nx.png';
import envmap_px from './assets/envmap2/px.png';
import envmap_ny from './assets/envmap2/ny.png';
import envmap_py from './assets/envmap2/py.png';
import envmap_nz from './assets/envmap2/nz.png';
import envmap_pz from './assets/envmap2/pz.png';


export const loadEnvironmentCubMap = () => {
    const textureLoader = new CubeTextureLoader();
    const envMap = textureLoader.load([
        envmap_px, envmap_nx, 
        envmap_py, envmap_ny, 
        envmap_pz, envmap_nz 
    ]);
    STATE.scene.envMap = envMap;
    return envMap;

}


