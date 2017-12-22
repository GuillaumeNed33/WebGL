var renderer;
var scene;
var camera;
var cube;
var mouseX = 0, mouseY = 0;
var target;
var light;

var controls;

//Permet de stocker les spheres
var spheres = [];

var mouse = new THREE.Vector2();


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function main() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);

    //Permet de zoomer, tourner la camera avec la souris
    controls = new THREE.OrbitControls( camera );

    for(var i=0 ; i< 100; i++) {
        var sphere = new Object();
        var geometry = new THREE.SphereGeometry(Math.random() * (6 - 1) + 1, 32, 32);
        sphere.materialAlea = new THREE.MeshPhongMaterial({color: getRandomColor()});
        sphere.materialUnique = new THREE.MeshBasicMaterial({color: rgbToHex(0,0,i%255)});
        sphere.mesh = new THREE.Mesh(geometry);
        sphere.mesh.position.x = Math.random() * (51 - (-50)) + (-50);
        sphere.mesh.position.y = Math.random() * (51 - (-50)) + (-50);
        sphere.mesh.position.z = Math.random() * (51 - (-50)) + (-50);
        scene.add(sphere.mesh);
        spheres[i] = sphere;
    }
    // Creer la scene avec 100 spheres avec rayon aleatoire compris entre 1 et 5
    // Donner une couleur aleatoire a chacune de ces spheres
    // Definir une couleur unique (=pas de doublon de couleur) sur un autre MeshBasicMaterial
    // Puis stocker les spheres sous forme d'OBJETS avec 3 attributs (un pour la Mesh, un autre pour le material concernant les couleurs aleatoires, et un autre pour le material avec les couleurs uniques)

    light = new THREE.PointLight( 0xffffff, 1, 0, 2 );
    light.position.set(100,10,200);
    scene.add(light);

    camera.position.z = 200;
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(800, 800);
    renderer.setClearColor(new THREE.Color(0.2,0.2, 0.2),1.0);
    renderer.clear();
    renderer.domElement.addEventListener('mousemove', onMouseMove);
    document.body.appendChild( renderer.domElement );
    render();
}

//Permet de recuperer la position de la souris
function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function pointage() {
    var gl = renderer.getContext();

    spheres.forEach(function (sphere) {
        sphere.mesh.material = sphere.materialUnique;
    });
    // Faire le rendu avec les couleurs UNIQUES
    renderer.render(scene, camera);

    // Recupere la couleur pointe sous le curseur de la souris
    var couleur = new Uint8Array(4);
    gl.readPixels(mouse.x, renderer.domElement.height - mouse.y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, couleur);
    //console.log('Color: ' + couleur);

    // On retrouve l'index correspondant dans le tableau a partir de la couleur
    var id = (couleur[0] << 16) | (couleur[1] << 8) | (couleur[2]);
    // On recupere l'objet pointe par la souris
    var data = spheres[id];

    spheres.forEach(function (sphere) {
        sphere.mesh.material = sphere.materialAlea;
    });
    // Faire le rendu avec les couleurs ALEATOIRES (= les couleurs propres des spheres)

    if(id >=0 && id <=100){
        sphere.mesh.material = new THREE.MeshBasicMaterial({color: '#FFFF00'});
        // Afficher la sphere pointee en jaune
    }
    renderer.render(scene, camera);
}

function render() {
    requestAnimationFrame( render );
    pointage();
    renderer.render( scene, camera );
}
