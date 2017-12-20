function loadText(url) { //recuperation du texte displonible a l'url en parametre
var xhr = new XMLHttpRequest();
xhr.open('GET', url, false);
xhr.overrideMimeType("text/plain");
xhr.send(null);
if(xhr.status === 200)
return xhr.responseText;
else {
  return null;
}
}

// variables globales du programme;
var canvas = document.getElementById('dawin-webgl');
var gl; //contexte
var program; //shader program
var attribPos; //attribute position
var attribSize; //attribute size
var attribColor; //attribute color
var pointSize = 10.;
var sommets = [];

function initContext() {
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('ERREUR : echec chargement du contexte');
    return;
  }
}

//Initialisation des shaders et du program
function initShaders() {
  //creation de shaders
  var vertex = gl.createShader(gl.VERTEX_SHADER);
  var frag = gl.createShader(gl.FRAGMENT_SHADER);

  //linkage avec la source
  gl.shaderSource(vertex, loadText('vertex.glsl'));
  gl.shaderSource(frag, loadText('fragment.glsl'));

  //compilation des shaders
  gl.compileShader(vertex);
  gl.compileShader(frag);
  if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertex));
  }
  if(!gl.getShaderParameter(frag, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(frag));
  }

  //creation programme
  program = gl.createProgram();

  //liaison programme / shaders
  gl.attachShader(program, vertex);
  gl.attachShader(program, frag);

  //edition de liens
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getProgramInfoLog(program));
  }
  //utilisation
  gl.useProgram(program);
}

//Fonction initialisant les attributs pour l'affichage (position et taille)
function initAttributes() {
  attribPos = gl.getAttribLocation(program, 'position');
  attribSize = gl.getAttribLocation(program, 'size');
  attribColor = gl.getUniformLocation(program, 'color');
}

//Fonction permettant le dessin dans le canvas
function draw() {
  //  gl.clearColor(0.2, 0.2, 0.2, 1.0);
  //  gl.clearColor(1.0, 0.0, 1.0, 1.0); //magenta
  //  gl.clearColor(1.0, 1.0, 0.0, 1.0); //jaune
  //  gl.clearColor(0.0, 1.0, 1.0, 1.0); //cyan
  gl.clearColor(1.0, 0, 1.0, 0.1); //gris avec canal alpha
  gl.clear(gl.COLOR_BUFFER_BIT);

  var colors = [
    [1.0, 0.0, 0.0, 1.0],
    [0.9, 0.0, 0.1, 1.0],
    [0.8, 0.0, 0.2, 1.0],
    [0.7, 0.0, 0.4, 1.0],
    [0.6, 0.0, 0.5, 1.0],
    [0.5, 0.0, 0.7, 1.0],
    [0.3, 0.0, 0.8, 1.0],
    [0.2, 0.0, 0.9, 1.0],
    [0.0, 0.0, 1.0, 1.0]
  ];

  for(var i=0;i<9; i++ ) {
    for(var j=0; j <9; j++) {
      var points = [-0.4+0.1*i, -0.35 + j*0.1 ];
      gl.vertexAttrib2f(attribPos, points[0], points[1]);
      gl.vertexAttrib1f(attribSize, 10+i);
      gl.uniform4fv(attribColor, colors[i]);
      gl.drawArrays(gl.POINTS, 0, 1);
    }
  }

  sommets.forEach(function(element) {
    gl.vertexAttrib2f(attribPos, element[0], element[1]);
    gl.uniform4fv(attribColor, [Math.random(), Math.random(), Math.random(), 1.0 ]);
    gl.drawArrays(gl.POINTS, 0, 1);
  });

  requestAnimationFrame(draw);
}

canvas.onmousemove = function (event) {
  var x = event.clientX;
  var y = event.clientY;
  draw();
  gl.vertexAttrib2f(attribPos, 2*x/canvas.width-1, (2*(canvas.height-y)/canvas.height)-1);
  gl.drawArrays(gl.POINTS, 0, 1);
};

canvas.onclick = function (event) {
  var x = event.clientX;
  var y = event.clientY;
  sommets.push([2*x/canvas.width-1, (2*(canvas.height-y)/canvas.height)-1]);
  draw();
};

function main() {
  initContext();
  initShaders();
  initAttributes();
  draw();
}
