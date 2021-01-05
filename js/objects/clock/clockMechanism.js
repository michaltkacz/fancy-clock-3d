import * as THREE from '../../../node_modules/three/build/three.module.js';
import { ClockHand } from './clockHand.js';

export class ClockMechanism extends THREE.Object3D {
    constructor(clock, date) {
        super();
        this._hoursClockHand = new ClockHand(this, 8, 0.5, 24, date.getHours());
        this._minutesClockHand = new ClockHand(this, 10, 0.5, 60, date.getMinutes());
        this._secondsClockHand = new ClockHand(this, 12, 0.5, 60, date.getSeconds());
        this.rotation.z = Math.PI / 2;
        // this._hoursClockHand = new ClockHand(this, 8, 0.5, 24, 23);
        // this._minutesClockHand = new ClockHand(this, 10, 0.5, 60, 59);
        // this._secondsClockHand = new ClockHand(this, 12, 0.5, 60, 59);
        clock.add(this);
    }

    update(date) {
        this._hoursClockHand.update(date.getHours(), new THREE.Vector3(0.001, 0, 0));
        this._minutesClockHand.update(date.getMinutes(), new THREE.Vector3(0, 0.001, 0));
        this._secondsClockHand.update(date.getSeconds(), new THREE.Vector3(0, 0, 0.001));
        // this._hoursClockHand.update(23);
        // this._minutesClockHand.update(59);
        // this._secondsClockHand.update(59);
    }

    static randomRotation() {

    }
}