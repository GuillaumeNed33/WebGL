// Variables globales
var renderer;
var scene;
var camera;
var controls;
var spotLight;
var meshSphere;
var radius = 10;
var altitudeMax = 100;
var t = 0; // materialisation du temps
var g = 9.8; // pesanteur
var n = 0; // nombre de rebonds
var e = 0.9; // coeff elasticité
var pasDeTemps = 0.1;


function main() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, 1, 0.1, 10000);

    //Permet de zoomer, tourner la camera avec la souris
    controls = new THREE.OrbitControls( camera );

    // TODO Partie 1
    // Creation de la sphere, couleur rouge
    var geometry = new THREE.SphereGeometry( radius, 32, 32 );
    var material = new THREE.MeshPhongMaterial( {
        color: 0xff0000
    } );
    meshSphere = new THREE.Mesh( geometry, material );
    meshSphere.position.y = altitudeMax;
    meshSphere.castShadow = true;
    meshSphere.receiveShadow = false;
    scene.add( meshSphere );

    // Creation du sol, couleur verte
    var geometry = new THREE.PlaneGeometry( 1000, 1000, 32 , 32);
    var texture = new THREE.TextureLoader().load( 'textures/grasslight-big.jpg' );
    var material = new THREE.MeshPhongMaterial( {
        map: texture,
        side: THREE.DoubleSide
    } );
    var plane = new THREE.Mesh( geometry, material );
    plane.position.y = -radius;
    plane.rotation.x += Math.PI/2;
    plane.receiveShadow = true;
    scene.add( plane );

    // TODO Partie 3
    // Modelisation d'un sol plus realiste par l'utilisation de texture
    // Ajout de la lumiere + ombres sur les objets de la scène

    //light = new THREE.PointLight( 0xffffff, 1, 0, 2 );
    spotLight = new THREE.PointLight(0xAAAAAA, 3);
    spotLight.position.set(10, altitudeMax, 10);
    spotLight.castShadow = true;
    spotLight.shadowBias = 0.0001;
    spotLight.shadowDarkness = 0.2;
    spotLight.shadow.mapSize.width = 512; // Shadow Quality
    spotLight.shadow.mapSize.height = 512; // Shadow Quality
    scene.add(spotLight);

    camera.position.x = 65;
    camera.position.z = 635;
    camera.position.y = 138;
    renderer = new THREE.WebGLRenderer();

    renderer.setSize(800, 800);
    renderer.setClearColor(0xcce0ff);
    renderer.clear();

    renderer.shadowMapEnabled = true; //Shadow
    renderer.shadowMapSoft = true; // Shadow

    document.body.appendChild( renderer.domElement );

    render();
}


function chuteLibre(temps, altitude) {
    // TODO
    // Modelisation de la chute libre de la balle
    // NB : on ne prend pas en compte les frottements de l'air
    // Params : temps = temps actuel
    //          altitude = altitude initiale
    var result = altitude - (0.5*g*Math.pow(temps,2));
    return result;
}

function rebondBalle(temps, number) {
    // TODO
    // Modelisation du rebond de la balle
    // Params: temps = temps actuel
    //         number = nombre de rebonds que la balle a deja effectue
    var vitesse = Math.pow(e, number) * Math.sqrt(2*g*altitudeMax);
    var result = ( vitesse * temps ) - (0.5*g*Math.pow(temps,2));
    return result;
}

function deformation(temps, number) {
    // TODO
    // Modelisation de la deformation de la balle
    // au moment du rebond
    // Params : temps = temps actuel
    //          number = nombre de rebonds que la balle a deja effectue
    // NB : il est possible de changer la signature de la fonction
    //if(t >= 0 && t <= 1) {
    //    meshSphere.scale.x += 0.01;
    //}
    //else {
    //    if(meshSphere.scale.x !== 1)
    //        meshSphere.scale.x -= 0.01;
    //}
}

function animationRebond() {
    // TODO
    // Fonction permettant de changer la position de la sphere
    // au cours du temps
    // Gestion des appels aux fonctions rebondBalle(), chuteLibre()
    // et deformation()
    // en fonction de la position de la sphere
    if(n === 0)
        meshSphere.position.y = chuteLibre(t, meshSphere.position.y);
    else {
        meshSphere.position.y = rebondBalle(t, n);
    }

    if(meshSphere.position.y <= 0){
        n++;
        t=0;
    }
    else {
        meshSphere.position.x += 0.5;
    }
    deformation(t, n);
    t+= pasDeTemps;
}

function render() {
    requestAnimationFrame( render );
    animationRebond();
    renderer.render( scene, camera );
}
