interface BufferAttributeUVS {
  array: ArrayLike<number>;
}

AFRAME.registerComponent('stereo-cylinder', {
  /** @private */ geometry: new AFRAME.THREE.CylinderGeometry(),

  schema: {
    eye: { default: 'left', oneOf: ['left', 'right'] },
    deg: { type: 'number', default: '180' },
    scale: { type: 'string', default: '-1,1,1' },
  },

  init() {
    const object3D = this.el.object3D.children[0];
    const scale = this.data.scale.split(',');
    this.geometry = new AFRAME.THREE.CylinderGeometry(
      10,
      10,
      10,
      64,
      64,
      true,
      0,
      this.degToRad(this.data.deg)
    );

    const replaceScale = this.checkScaleIsNumber(scale);
    const isHaveBadScaleValue = this.findScaleBadParameter(replaceScale);

    this.setRotateY();
    this.setStereoVideo();
    this.setGeometryScale(isHaveBadScaleValue, replaceScale);

    const bufferGeometry = this.geometry.clone();
    bufferGeometry.normalizeNormals();
    bufferGeometry.computeVertexNormals();

    (object3D as any).geometry = bufferGeometry;
  },

  setStereoVideo() {
    const uvs = (this.geometry.attributes.uv as BufferAttributeUVS)
      .array as any;
    for (let i = 0; i < uvs.length; i += 2) {
      uvs[i] *= 0.5;
      if (this.data.eye === 'right') {
        uvs[i] += 0.5;
      }
    }
  },

  setGeometryScale(isHaveBadScaleValue: number, scale: any[]) {
    const [x, y, z] = scale;
    if (isHaveBadScaleValue) {
      return this.geometry.scale(-1, 1, 1);
    }
    return this.geometry.scale(x, y, z);
  },

  checkScaleIsNumber(scale: string[]) {
    return scale.map(scaleValue => {
      if (!isNaN(Number(scaleValue))) {
        return Number(scaleValue);
      }
      return false;
    });
  },

  findScaleBadParameter(scale: any[]) {
    return scale.filter(scaleValue => scaleValue === false).length;
  },

  setRotateY() {
    const rotateDeg = this.data.deg - 120;
    if (rotateDeg < 0) {
      return this.geometry.rotateY(
        this.degToRad(120 + Math.abs(rotateDeg) / 2)
      );
    }
    return this.geometry.rotateY(this.degToRad(120 - rotateDeg / 2));
  },

  degToRad(deg: number) {
    return deg * (Math.PI / 180);
  },
});
