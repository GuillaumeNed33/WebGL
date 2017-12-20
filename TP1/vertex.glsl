attribute vec2 position;
attribute float size;
void main () {
  gl_Position = vec4(position, 0,1);
  gl_PointSize = size;
}
