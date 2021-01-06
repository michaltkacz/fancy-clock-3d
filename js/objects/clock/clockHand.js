import * as THREE from '../../../node_modules/three/build/three.module.js';

export class ClockHand extends THREE.Object3D {
    static materialSphereActive = new THREE.MeshNormalMaterial();
    static materialSphereInactive = new THREE.MeshLambertMaterial({ color: 0xcccccc });

    static geometrySphere = new THREE.SphereGeometry(0.5, 32, 32);

    constructor(clockMechanism, radius, numOfSpheres, numOfActiveSpheres) {
        super();
        this.rotation.set(0, 0, 0);
        this._spheres = []
        this._r = radius;

        for (let i = 0; i < numOfSpheres; i++) {
            if (i <= numOfActiveSpheres) {
                this._spheres[i] = this._buildSphere(ClockHand.materialSphereActive, i, numOfSpheres);
            } else {
                this._spheres[i] = this._buildSphere(ClockHand.materialSphereInactive, i, numOfSpheres);
            }
            this.add(this._spheres[i]);
        }

        clockMechanism.add(this);
    }

    _buildSphere(material, positionId, numOfSpheres) {
        const sphere = new THREE.Mesh(ClockHand.geometrySphere, material);
        const spherePosition = this._calculateSpherePosition(positionId, numOfSpheres);
        sphere.position.set(spherePosition.x, spherePosition.y, spherePosition.z);
        return sphere;
    }

    _calculateSpherePosition(positionId, numOfSpheres) {
        const angle = 2 * Math.PI * positionId / numOfSpheres;
        const x = this._r * Math.cos(angle);
        const y = this._r * Math.sin(angle);
        const z = 0;
        return new THREE.Vector3(x, y, z);
    }

    _activateSpheres(count) {
        for (let i = 0; i < this._spheres.length; i++) {
            this._spheres[i].material.dispose();
            if (i <= count) {
                this._spheres[i].material = ClockHand.materialSphereActive;
            } else {
                this._spheres[i].material = ClockHand.materialSphereInactive;
            }
        }
    }

    update(time, rotationAngles) {
        if (time !== this._lastTime)
            this._activateSpheres(time);
        this.rotation.x += rotationAngles.x;
        this.rotation.y += rotationAngles.y;
        this.rotation.z += rotationAngles.z;
    }


}