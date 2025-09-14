attribute float aRandom;

uniform vec2 uViewPort;
uniform float uTime;
uniform float uSize;
uniform float uDepth;

const float PI = 3.1415926535897932384626433832795;

varying float vProgress;
varying float vRandom;

void main() {
   vec3 newPosition = position;
   newPosition.x *= uViewPort.x * 1.1;
   newPosition.y *= uViewPort.y;
   newPosition.z *= uDepth;

   newPosition.y += sin(uTime * 2.0 + position.x) * 0.2;
   
   float progress = fract(uTime * ((aRandom * 0.1) + 0.2) + newPosition.x);
   progress = smoothstep(0.0, 1.0, progress);

   float minX = -uViewPort.x / 2.0 - 0.5;
   float maxX = uViewPort.x / 2.0 + 0.5;
   newPosition.x = mix(minX, maxX, progress);
   
   // float speed = sin(uTime) * 0.5 + 0.5;
   // float time = uTime * ((speed * aSpeed) + 1.0);
   
   // newPosition.x = mod(newPosition.x + time, uViewPort.x * 1.1);
   // newPosition.x -= (uViewPort.x * 1.05) / 2.0;


   vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
   gl_Position = projectionMatrix * mvPosition;

   gl_PointSize = (aRandom + 0.5) * uSize * 30.0 * (1.0 / - mvPosition.z);

   vProgress = progress;
   vRandom = aRandom;
}