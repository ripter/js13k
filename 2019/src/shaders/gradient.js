// https://threejs.org/examples/webgl_lights_hemisphere.html
AFRAME.registerShader('gradient', {
  schema: {
    timeMsec: {type: 'time', is: 'uniform'},
    topColor: {type: 'color', is: 'uniform', default: '#0077ff'},
    bottomColor: {type: 'color', is: 'uniform', default: '#ffffff'},
    offset: {is: 'uniform', default: 33},
    exponent: {is: 'uniform', default: 0.6},
  },
  raw: false,
  vertexShader: `
varying vec3 vWorldPosition;

void main() {
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
  vWorldPosition = worldPosition.xyz;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,
  fragmentShader: `
uniform vec3 topColor;
uniform vec3 bottomColor;
uniform float offset;
uniform float exponent;

varying vec3 vWorldPosition;

void main() {
  float h = normalize( vWorldPosition + offset ).y;
  gl_FragColor = vec4( mix( bottomColor, topColor, max( pow( max( h , 0.0), exponent ), 0.0 ) ), 1.0 );
}
`
});
