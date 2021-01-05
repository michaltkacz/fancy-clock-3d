import * as THREE from '../../../node_modules/three/build/three.module.js';
// import * as THREEx from '../../../bower_components/threex.dynamictexture/threex.dynamictexture.js';

export class ClockDisplay extends THREE.Object3D {
    static font;
    static loadFont() {
        const loader = new THREE.FontLoader();
        loader.load('../../../node_modules/three/examples/fonts/helvetiker_bold.typeface.json', function(response) {
            ClockDisplay.font = response;
        });
    }

    constructor(clock, date) {
        super();
        ClockDisplay.loadFont();
        this._lastDate = date;
        this._mesh1 = null;
        this._mesh2 = null;

        const geometryC = new THREE.CircleGeometry(5, 32);
        const materialC = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
        const circle = new THREE.Mesh(geometryC, materialC);
        this.add(circle);

        const geometryT = new THREE.TorusGeometry(5, 0.5, 16, 100);
        const materialT = new THREE.MeshBasicMaterial({ color: 0xffff00 });
        const torus = new THREE.Mesh(geometryT, materialT);
        this.add(torus);

        clock.add(this);
    }

    _removeClockDisplayText() {
        // this.remove(this.getObjectByName("clockDisplayText"));
        this.remove(this._mesh1);
        this.remove(this._mesh2);
    }

    _createClockDisplayText() {
        const timeString = this._getTimeString(this._lastDate);
        const material = new THREE.MeshNormalMaterial();
        const geometry = new THREE.TextGeometry(timeString, {
            font: ClockDisplay.font,
            size: 1.2,
            height: 0.5,
            curveSegments: 12,
            bevelEnabled: false,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        });

        geometry.computeBoundingBox();
        const centerOffsetX = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
        const centerOffsetY = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);

        this._mesh1 = new THREE.Mesh(geometry, material);
        this._mesh2 = this._mesh1.clone();

        this._mesh1.position.x = centerOffsetX;
        this._mesh1.position.y = centerOffsetY;
        this._mesh1.position.z = 0.01;


        this._mesh2.rotation.y = Math.PI;
        this._mesh2.position.x = -centerOffsetX;
        this._mesh2.position.y = centerOffsetY;
        this._mesh2.position.z = -0.01;

        this.add(this._mesh1);
        this.add(this._mesh2);
    }

    _getTimeString(date) {
        const h = date.getHours();
        const hours = h < 10 ? "0" + h : h;

        const m = date.getMinutes();
        const minutes = m < 10 ? "0" + m : m;

        const s = date.getSeconds();
        const seconds = s < 10 ? "0" + s : s;
        return hours + ":" + minutes + ":" + seconds;
    }

    update(date) {
        if (ClockDisplay.font === undefined) {
            return;
        }

        if (date.getSeconds() === this._lastDate.getSeconds()) {
            return;
        }

        this._lastDate = date;
        this._removeClockDisplayText();
        this._createClockDisplayText();
    }
}