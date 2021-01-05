import * as THREE from '../../../node_modules/three/build/three.module.js';

export class ClockText extends THREE.Object3D {
    constructor(clock, date) {
        super();

        clock.add(this);
    }

    update() {

    }
}