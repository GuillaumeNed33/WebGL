attribute vec4 position;
attribute vec4 color;
varying vec4 vColor;


//Transformation
uniform mat4 matrix;

void main() {
     vColor = color;
     gl_Position = (matrix*position);
}
