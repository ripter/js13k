AFRAME.registerShader('blank', {
  schema: {
    timeMsec: {type: 'time', is: 'uniform'},
    color: {type: 'color', is: 'uniform'},
  },
  raw: false,
  vertexShader: `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`,
  fragmentShader: `
varying vec2 vUv;
uniform float timeMsec; // A-Frame time in milliseconds.
uniform vec4 color;

void main() {
  float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.
  // Example fading in and out the color
  gl_FragColor = vec4(color[0], color[1], color[2], abs(sin(time)));
}
`,
});
