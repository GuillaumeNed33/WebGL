var scene;
var camera;
var renderer;
var controls;

//Cube
var cube;

//Solar System
var mercury, venus, earth, mars, jupiter, saturn, uranus, nepture, pluto;
var sun;
var orbit1, orbit2,orbit3,orbit4,orbit5,orbit6,orbit7,orbit8,orbit9 ;
var light;

function main() {
    init();
    //initEventsCube();
    //addCube();
    // panorama();

    initSolarSystem();
    animate();
}

/*** CUBE PART ***/

function addCube() {
    camera.position.z = 2000;

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x990000 } );
    cube = new THREE.Mesh( geometry, material );
    scene.add(cube);
}

function panorama() {
    scene.background = new THREE.CubeTextureLoader().setPath( 'textures/cube/' )
        .load( [
            'px.jpg',
            'nx.jpg',
            'py.jpg',
            'ny.jpg',
            'pz.jpg',
            'nz.jpg'
        ] );
}

function initEventsCube() {
    document.body.onmousemove = function() {
        sun.rotateOnAxis( axis, angle );
        camera.lookAt(scene.position);
    }
}


/**** SOLAR SYSTEM PART ****/

function initSolarSystem() {
    /** SOLEIL **/
    var geometry = new THREE.SphereGeometry(45, 32 , 32);
    var texture = new THREE.TextureLoader().load( 'textures/planets/sun.jpg' );
    var material = new THREE.MeshBasicMaterial( { map: texture } );
    sun = new THREE.Mesh( geometry, material );
    scene.add(sun);

    /** MERCURE **/
    var geometryMercure = new THREE.SphereGeometry(3, 32, 32);
    var textureMercure = new THREE.TextureLoader().load( 'textures/planets/mercury.jpg' );
    var materialMercure = new THREE.MeshPhongMaterial( { map: textureMercure } );
    mercury = new THREE.Mesh( geometryMercure, materialMercure );
    scene.add(mercury);

    var geometryOrbit = new THREE.RingGeometry(99,100,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit1 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit1 );

    mercury.position.x += 100;
    orbit1.rotation.x = Math.PI/2;
    sun.add(mercury);
    sun.add(orbit1);

    /** VENUS **/
    var geometryVenus = new THREE.SphereGeometry(5, 32, 32);
    var textureVenus = new THREE.TextureLoader().load( 'textures/planets/venus.jpg' );
    var materialVenus = new THREE.MeshPhongMaterial( { map: textureVenus } );
    venus = new THREE.Mesh( geometryVenus, materialVenus );
    scene.add(venus);

    var geometryOrbit = new THREE.RingGeometry(119,120,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit2 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit2 );

    venus.position.x += 120;
    orbit2.rotation.x = Math.PI/2;
    sun.add(venus);
    sun.add(orbit2);

    /** TERRE **/
    var geometryEarth = new THREE.SphereGeometry(5, 32, 32);
    var textureEarth = new THREE.TextureLoader().load( 'textures/planets/earth.jpg' );
    var materialEarth = new THREE.MeshPhongMaterial( { map: textureEarth } );
    earth = new THREE.Mesh( geometryEarth, materialEarth );
    scene.add(earth);

    var geometryOrbit = new THREE.RingGeometry(139,140,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit3 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit3 );

    earth.position.x += 140;
    orbit3.rotation.x = Math.PI/2;
    sun.add(earth);
    sun.add(orbit3);


    light = new THREE.PointLight(0xffffff, 1 , 0);
    light.position.set(0,0,0);
    scene.add(light);

    scene.background = new THREE.CubeTextureLoader()
        .setPath( 'textures/planets/' )
        .load( [
            'espace.jpg',
            'espace.jpg',
            'espace.jpg',
            'espace.jpg',
            'espace.jpg',
            'espace.jpg'
        ] );
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 145, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 150;
    camera.position.y += 10;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth  , window.innerHeight );
    renderer.setClearColor( 0x0000, 1 );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera );
    controls.update();
}

function animate() {
    requestAnimationFrame( animate );

    /*** CUBE ***/
    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;

    /*** SOLAR SYSTEM ***/
    earth.rotation.x = (23.5/180)*Math.PI;
    earth.rotation.y = Date.now() * 0.001;

    sun.rotation.y += 0.005;

    camera.lookAt(scene.position);
    controls.update();
    renderer.render( scene, camera );
}