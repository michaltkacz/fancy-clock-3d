import * as THREE from '../../../node_modules/three/build/three.module.js';

import { ClockMechanism } from './clockMechanism.js';
import { ClockText } from './clockText.js';

export class Clock extends THREE.Object3D {
    constructor(scene) {
        super();
        const date = new Date();
        this._clockText = new ClockText(this, date);
        this._clockMechanism = new ClockMechanism(this, date);
        scene.add(this);
    }

    update() {
        const date = new Date();
        this._clockText.update(date);
        this._clockMechanism.update(date);
    }


}