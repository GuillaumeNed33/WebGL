function loadText(url) {
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
var canvas;
var gl; //contexte
var program; //shader program
var attribPos; //attribute position
var pointSize = 10.;
var attribColor;
var mousePositions = [];
var buffer;
var colorBuffer;
var colors = [
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
  1.0,  1.0,  1.0,  1.0,    // blanc
  1.0,  0.0,  0.0,  1.0,    // rouge
  0.0,  1.0,  0.0,  1.0,    // vert
  0.0,  0.0,  1.0,  1.0,    // bleu
];

var translation;
var homothetie;
var rotation;

var tX = 0;
var tY=0;
var zoom = 1.0;
var angle = 0;
var time = 0;
var moveX = 0.1;
var moveY = 0.1;

function initContext() {
  canvas = document.getElementById('dawin-webgl');
  gl = canvas.getContext('webgl');
  if (!gl) {
    console.log('ERREUR : echec chargement du contexte');
    return;
  }
  gl.clearColor(0.2, 0.2, 0.2, 1.0);
}

//Initialisation des shaders et du program
function initShaders() {
  var fragmentSource = loadText('fragment.glsl');
  var vertexSource = loadText('vertex.glsl');

  var fragment = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragment, fragmentSource);
  gl.compileShader(fragment);

  var vertex = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertex, vertexSource);
  gl.compileShader(vertex);

  gl.getShaderParameter(fragment, gl.COMPILE_STATUS);
  gl.getShaderParameter(vertex, gl.COMPILE_STATUS);

  if (!gl.getShaderParameter(fragment, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(fragment));
  }

  if (!gl.getShaderParameter(vertex, gl.COMPILE_STATUS)) {
    console.log(gl.getShaderInfoLog(vertex));
  }

  program = gl.createProgram();
  gl.attachShader(program, fragment);
  gl.attachShader(program, vertex);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("Could not initialise shaders");
  }
  gl.useProgram(program);
}

//Evenement souris
function initEvents() {
  canvas.onclick = function(e) {
    //changement de repere pour les coordonnees de souris
    var x = (e.pageX/canvas.width)*2.0 - 1.0;
    var y = ((canvas.height-e.pageY)/canvas.height)*2.0 - 1.0;
    mousePositions.push(x);
    mousePositions.push(y);
    refreshBuffers();
    draw();
  }

  document.onkeypress = function(event) {
    switch (event.code) {
      case "ArrowRight":
      move(1);
      break;
      case "ArrowLeft":
      move(2);
      break;
      case "ArrowUp":
      move(3);
      break;
      case "ArrowDown":
      move(4);
      break;
      case "Enter":
      zoomCanvas(true);
      break;
      case "Space":
      zoomCanvas(false);
      break;
      case "KeyR":
      rotate();
      break;
      default:
    }
  }
}

//Fonction initialisant les attributs pour l'affichage (position et taille)
function initAttributes() {
  attribPos = gl.getAttribLocation(program, 'position');
  gl.enableVertexAttribArray(attribPos);

  attribColor = gl.getAttribLocation(program, 'color');
  gl.enableVertexAttribArray(attribColor);

  translation = gl.getUniformLocation(program, 'translation');
  homothetie = gl.getUniformLocation(program, 'homothetie');
  gl.uniform1f(homothetie, zoom);

  rotation =  gl.getUniformLocation(program, 'rotation');
  gl.uniform1f(rotation, angle);
}

//Initialisation des buffers
function initBuffers() {
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

  colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
}

//Mise a jour des buffers : necessaire car les coordonnees des points sont ajoutees a chaque clic
function refreshBuffers() {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mousePositions), gl.STATIC_DRAW);
}

function rotate() {
  angle += 10.0;
  gl.uniform1f(rotation, angle);
}

function move(direction, x, y) {
  switch (direction) {
    case 1:
    tX+=0.2;
    break;
    case 2:
    tX-=0.2;
    break;
    case 3:
    tY+=0.2;
    break;
    case 4:
    tY-=0.2;
    break;
    default:
    tX+=x;
    tY+=y;
  }
  gl.uniform2f(translation, tX, tY);
}

function zoomCanvas(isZoom) {
  if(isZoom) {
    zoom+=0.1;
  }
  else {
    zoom-=0.1;
    if(zoom<=0) {zoom = 0.1};
  }
  gl.uniform1f(homothetie, zoom);
}

//Fonction permettant le dessin dans le canvas
function draw() {
  time++;

  if(time%75==0) {
    var rebond = false;
    var i=0;
    while (!rebond && i <= mousePositions.length) {
      if(i%2==0) { //test X
        if(mousePositions[i]+tX <= -1 || mousePositions[i]+tX  >= 1 ) {
          moveX *= (-1);
        }
      }
      else { //Test Y
        if(mousePositions[i]+tY <= -1 || mousePositions[i]+tY >= 1 ) {
          moveY *= (-1);
        }
      }
      i++;
    }
    move(false, moveX, moveY);
  }


  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.vertexAttribPointer(attribPos, 2, gl.FLOAT, true, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(attribColor, 4, gl.FLOAT, false, 0, 0);

  gl.drawArrays(gl.TRIANGLE_STRIP, 0,  mousePositions.length/2);

  requestAnimationFrame(draw);

}


function main() {
  initContext();
  initBuffers();
  initShaders();
  initAttributes();
  initEvents();
  draw();
}
