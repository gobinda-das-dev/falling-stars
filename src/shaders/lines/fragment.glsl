
const float PI = 3.1415926535897932384626433832795;
const float HEIGHT = 0.025;

varying float vProgress;
varying float vRandom;

void main() {
   vec2 uv = gl_PointCoord.xy;

   float center = 0.5;

   float height;
   height = sin(uv.x * PI) * HEIGHT;
   height = mix(height, HEIGHT, step(0.5, uv.x));

   float wave = step(center - height, uv.y);
   wave *= 1.0 - step(center + height, uv.y);
   wave *= uv.x;


   float progress = sin(vProgress * PI * 2. - PI / 2.) * 0.5 + 0.5;
   wave *= progress;
   wave *= vRandom + 0.5;

   gl_FragColor = vec4(vRandom, 1.0, 1.0, wave);
}