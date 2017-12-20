attribute vec3 vertex_position;
uniform mat4 PMatrix;
uniform mat4 MMatrix;
uniform vec2 translation;
varying float profondeur;

varying vec4 vColor;
attribute vec4 color;
void main() {
    gl_Position = PMatrix * MMatrix* vec4(vertex_position, 1.0);
    profondeur = vertex_position.z/2.0+0.5;
    vColor = color;
}
