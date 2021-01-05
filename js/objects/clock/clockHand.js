import * as THREE from '../../../node_modules/three/build/three.module.js';

export class ClockHand extends THREE.Object3D {
    constructor(clockMechanism, radius, sphereRadius, numOfSpheres, numOfActiveSpheres) {
        super();
        this.rotation.set(0, 0, 0);
        this._spheres = []
        this._r = radius;
        this._sphereRadius = sphereRadius;
        // this._numOfSpheres = numOfSpheres;
        // this._numOfActiveSpheres = numOfActiveSpheres;



        this._materialActive = new THREE.MeshNormalMaterial();
        this._materialInactive = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        for (let i = 0; i < numOfSpheres; i++) {
            if (i > numOfActiveSpheres) {
                this._spheres[i] = this._buildSphere(this._materialInactive, i, numOfSpheres);
            } else {
                this._spheres[i] = this._buildSphere(this._materialActive, i, numOfSpheres);
            }
            this.add(this._spheres[i]);
        }

        clockMechanism.add(this);
    }

    _buildSphere(material, positionId, numOfSpheres) {
        const geometry = new THREE.SphereGeometry(this._sphereRadius, 32, 32);
        const sphere = new THREE.Mesh(geometry, material);
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
            if (i < count) {
                this._spheres[i].material = this._materialActive;
            } else {
                this._spheres[i].material = this._materialInactive;
            }
        }
    }

    update(time, rotationAngles) {
        this._activateSpheres(time);
        this.rotation.x += rotationAngles.x;
        this.rotation.y += rotationAngles.y;
        this.rotation.z += rotationAngles.z;
    }


}