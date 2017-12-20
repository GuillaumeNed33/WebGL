attribute vec4 position;
attribute vec4 color;
varying vec4 vColor;

uniform vec2 translation;
uniform float homothetie;
uniform float rotation;

void main() {
  gl_Position = vec4(
    (position[0]*homothetie)*cos(rotation) - (position[1]*homothetie)*sin(rotation) ,
     (position[0]*homothetie)*sin(rotation) + (position[1]*homothetie)*cos(rotation),
     0,
     1
   ) + vec4(translation,0,0);
  gl_PointSize = (position[0] + 1.0) * 40.0;
  vColor = color;
}
