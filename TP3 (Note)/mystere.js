
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

var gl;
var program;
var attribPos;
var buffer;
var bufferRepere;
var colorBuffer;
var tx=0, ty=0;
var uTranslation, uPerspective, uModel;
var projMatrix = mat4.create();
var modelMatrix = mat4.create();
var vueMatrix = mat4.create();

var attribColor;


function initShaders() {
    var vertSource = loadText('vertex.glsl');
    var fragSource = loadText('fragment.glsl');

    var vertex = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertex, vertSource);
    gl.compileShader(vertex);

    if(!gl.getShaderParameter(vertex, gl.COMPILE_STATUS))
        console.log("Erreur lors de la compilation du vertex shader:\n"+gl.getShaderInfoLog(vertex));

    var fragment = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragment, fragSource);
    gl.compileShader(fragment);

    if(!gl.getShaderParameter(fragment, gl.COMPILE_STATUS))
        console.log("Erreur lors de la compilation du fragment shader:\n"+gl.getShaderInfoLog(fragment));

    program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
        console.log("Erreur lors du linkage du program:\n"+gl.getProgramInfoLog(program));

    gl.useProgram(program);

    attribPos = gl.getAttribLocation(program, "vertex_position");
    uTranslation = gl.getUniformLocation(program, "translation");
    uPerspective = gl.getUniformLocation(program, 'PMatrix');
    uModel = gl.getUniformLocation(program, "MMatrix");
    attribColor = gl.getAttribLocation(program, 'color');
}

function initBuffers() {

    var coordsCube = [
        //face avant
        -1,1,1,  -1,-1,1,  1,1,1,  1,1,1,  -1,-1,1,  1,-1,1,
        //face arriere
        -1,1,-1,  -1,-1,-1,  1,1,-1,  1,1,-1,  -1,-1,-1,  1,-1,-1,
        //face gauche
        -1,1,-1,  -1,-1,-1,  -1,1,1,  -1,1,1,  -1,-1,-1,  -1,-1,1,
        //face droite
        1,1,-1,  1,-1,-1,  1,1,1,  1,1,1,  1,-1,-1,  1,-1,1,
        //face haut
        -1,1,-1,  -1,1,1,  1,1,-1,  1,1,-1, -1,1,1,  1,1,1,
        //face bas
        -1,-1,-1,  -1,-1,1,  1,-1,-1,  1,-1,-1,  -1,-1,1,  1,-1,1
    ];

    var coordsRepere = [
        //axe y
        0, -10 ,0,
        0, 10, 0,

        //axe x
        -10,0,0,
        10,0,0,

        //axe z
        0,0,-10,
        0,0,10
    ];

    var colors = [];

    for(var i=0; i<6 ; i++) {
        colors.push( 1.0,  0.0,  0.0,  1.0);    // rouge
    }
    for(var i=0; i<6 ; i++) {
        colors.push( 0.0,  1.0,  0.0,  1.0);    // vert
    }
    for(var i=0; i<6 ; i++) {
        colors.push( 0.0,  0.0,  1.0,  1.0);    // bleu
    }
    for(var i=0; i<6 ; i++) {
        colors.push( 1.0,  1.0,  1.0,  1.0);    // blanc
    }
    for(var i=0; i<6 ; i++) {
        colors.push( 1.0,  1.0,  0.0,  1.0);    // jaune
    }
    for(var i=0; i<6 ; i++) {
        colors.push( 1.0,  0.0,  1.0,  1.0);    // magenta
    }

    buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordsCube), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    buffer.vertexSize = 3;
    buffer.numVertices = 12;

    bufferRepere = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferRepere);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coordsRepere), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

var time=0;

function draw() {
    requestAnimationFrame(draw);

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0.0,1.0,1.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(projMatrix, Math.PI/4, 1 , 0.1, 100);
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0,0,-7]);
    mat4.rotateY(modelMatrix, modelMatrix, time);
    mat4.rotateX(modelMatrix, modelMatrix, time);

    //Gestion des couleurs
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.enableVertexAttribArray(attribColor);
    gl.vertexAttribPointer(attribColor, 4 , gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    //Gestion du cube
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(attribPos);
    gl.vertexAttribPointer(attribPos, buffer.vertexSize, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(uModel, false, modelMatrix);
    gl.uniformMatrix4fv(uPerspective,false, projMatrix);
    gl.drawArrays(gl.TRIANGLES, 0,  buffer.numVertices*3);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // Gestion des Axes
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferRepere);
    mat4.identity(modelMatrix);
    mat4.translate(modelMatrix, modelMatrix, [0,0,-7]);
    gl.vertexAttribPointer(attribPos, 3, gl.FLOAT, false, 0, 0);
    gl.uniformMatrix4fv(uModel, false, modelMatrix);
    gl.lineWidth(5);
    gl.drawArrays(gl.LINES, 0,  6);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    time += 0.01;
}

function main() {
    var canvas = document.getElementById('dawin-webgl');
    gl = canvas.getContext('webgl');
    if (!gl) {
        console.log('ERREUR : Echec du chargement du contexte !');
        return;
    }

    initShaders();
    initBuffers();
    draw();
}
