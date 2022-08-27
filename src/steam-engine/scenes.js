import { Scene } from "three";
import * as CONFIG from './configs';
import { STATE } from "./state";

export class CreateNewScene {
    constructor() {
        this.scene = new Scene();
    }
    setAsMain() {
        STATE.scene.Obj = this.scene;
    }
}