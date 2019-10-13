// Universe Nursery
// http://shaderfrog.com/app/view/47
AFRAME.registerShader('universe-nursery', {
  schema: {
    color: {type: 'color', is: 'uniform'},
    timeMsec: {type: 'time', is: 'uniform'},
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
// http://casual-effects.blogspot.com/2013/08/starfield-shader.html
#extension GL_OES_standard_derivatives : enable
varying vec2 vUv;
uniform vec3 color;
uniform float timeMsec; // A-Frame time in milliseconds.

#define iterations 17
#define volsteps 8
#define sparsity 0.5
#define stepsize 0.2
#define frequencyVariation 1.3
#define PI 3.141592653589793238462643383279

float twinkleSpeed = 0.04;
float speed = 0.2;
float brightness = 0.0018;
float distfading = 0.75;

void main() {
  float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.

  vec2 uv = vUv.xy + 0.5;
  uv.x += time * speed * 0.1;

  vec3 dir = vec3(uv * 2.0, 1.0);

  float s = 0.1, fade = 0.01;
  vec3 starColor = vec3(0.0);

  for (int r = 0; r < volsteps; ++r) {
    vec3 p =  (time * speed * twinkleSpeed) + dir * (s * 0.5);
    p = abs(vec3(frequencyVariation) - mod(p, vec3(frequencyVariation * 2.0)));

    float prevlen = 0.0, a = 0.0;
    for (int i = 0; i < iterations; ++i) {
      p = abs(p);
      p = p * (1.0 / dot(p, p)) + (-sparsity); // the magic formula
      float len = length(p);
      a += abs(len - prevlen); // absolute sum of average change
      prevlen = len;
    }

    a *= a * a; // add contrast

    // coloring based on distance
    starColor += (vec3(s, s*s, s*s*s) * a * brightness + 1.0) * fade;
    fade *= distfading; // distance fading
    s += stepsize;
  }

  starColor = min(starColor, vec3(1.2));

  // Detect and suppress flickering single pixels (ignoring the huge gradients that we encounter inside bright areas)
  float intensity = min(starColor.r + starColor.g + starColor.b, 0.7);

  vec2 sgn = (vec2(vUv.xy)) * 2.0 - 1.0;
  vec2 gradient = vec2(dFdx(intensity) * sgn.x, dFdy(intensity) * sgn.y);
  float cutoff = max(max(gradient.x, gradient.y) - 0.1, 0.0);
  starColor *= max(1.0 - cutoff * 6.0, 0.3);

  // Motion blur; increases temporal coherence of undersampled flickering stars
  // and provides temporal filtering under true motion.
  gl_FragColor = vec4( starColor * color, 1.0 );
}
`,
});
