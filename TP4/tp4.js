var scene;
var camera;
var renderer;
var controls;

//Cube
var cube;

//Solar System
var mercury, venus, earth, mars, jupiter, saturn, uranus, neptune, pluto;
var pivotMercure, pivotVenus, pivotEarth, pivotMars, pivotJupiter,
    pivotSaturn, pivotUranus, pivotNeptune, pivotPluto;

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
    var geometryMercure = new THREE.SphereGeometry(2, 32, 32);
    var textureMercure = new THREE.TextureLoader().load( 'textures/planets/mercury.jpg' );
    var materialMercure = new THREE.MeshPhongMaterial( { map: textureMercure } );
    mercury = new THREE.Mesh( geometryMercure, materialMercure );
    scene.add(mercury);

    var geometryOrbit = new THREE.RingGeometry(62,63,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit1 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit1 );

    mercury.position.x += 63;
    orbit1.rotation.x = Math.PI/2;

    pivotMercure= new THREE.Object3D();
    scene.add( pivotMercure );
    pivotMercure.add( mercury );

    /** VENUS **/
    var geometryVenus = new THREE.SphereGeometry(5, 32, 32);
    var textureVenus = new THREE.TextureLoader().load( 'textures/planets/venus.jpg' );
    var materialVenus = new THREE.MeshPhongMaterial( { map: textureVenus } );
    venus = new THREE.Mesh( geometryVenus, materialVenus );
    scene.add(venus);

    var geometryOrbit = new THREE.RingGeometry(90,91,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit2 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit2 );

    venus.position.x += 91;
    orbit2.rotation.x = Math.PI/2;

    pivotVenus = new THREE.Object3D();
    scene.add( pivotVenus );
    pivotVenus.add( venus );

    /** TERRE **/
    var geometryEarth = new THREE.SphereGeometry(5, 32, 32);
    var textureEarth = new THREE.TextureLoader().load( 'textures/planets/earth.jpg' );
    var materialEarth = new THREE.MeshPhongMaterial( { map: textureEarth } );
    earth = new THREE.Mesh( geometryEarth, materialEarth );
    scene.add(earth);

    var geometryOrbit = new THREE.RingGeometry(105,106,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit3 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit3 );

    earth.position.x += 106;
    orbit3.rotation.x = Math.PI/2;

    pivotEarth = new THREE.Object3D();
    scene.add( pivotEarth );
    pivotEarth.add( earth );

    /** MARS **/
    var geometryMars = new THREE.SphereGeometry(4, 32, 32);
    var textureMars = new THREE.TextureLoader().load( 'textures/planets/mars.jpg' );
    var materialMars = new THREE.MeshPhongMaterial( { map: textureMars } );
    mars = new THREE.Mesh( geometryMars, materialMars );
    scene.add(mars);

    var geometryOrbit = new THREE.RingGeometry(120,121,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit4 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit4 );

    mars.position.x += 121;
    orbit4.rotation.x = Math.PI/2;

    pivotMars = new THREE.Object3D();
    scene.add( pivotMars );
    pivotMars.add( mars );


    /** JUPITER **/
    var geometry = new THREE.SphereGeometry(20, 32, 32);
    var texture = new THREE.TextureLoader().load( 'textures/planets/jupiter.jpg' );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    jupiter = new THREE.Mesh( geometry, material );
    scene.add(jupiter);

    var geometryOrbit = new THREE.RingGeometry(175,176,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit5 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit5 );

    jupiter.position.x += 176;
    orbit5.rotation.x = Math.PI/2;

    pivotJupiter = new THREE.Object3D();
    scene.add( pivotJupiter );
    pivotJupiter.add( jupiter );

    /** SATURN **/
    var geometry = new THREE.SphereGeometry(18, 32, 32);
    var texture = new THREE.TextureLoader().load( 'textures/planets/saturn.jpg' );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    saturn = new THREE.Mesh( geometry, material );
    scene.add(saturn);

    var geometryOrbit = new THREE.RingGeometry(235,236,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit6 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit6 );

    saturn.position.x += 236;
    orbit6.rotation.x = Math.PI/2;

    pivotSaturn = new THREE.Object3D();
    scene.add( pivotSaturn );
    pivotSaturn.add( saturn );

    /** URANUS **/
    var geometry = new THREE.SphereGeometry(12, 32, 32);
    var texture = new THREE.TextureLoader().load( 'textures/planets/uranus.jpg' );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    uranus = new THREE.Mesh( geometry, material );
    scene.add(uranus);

    var geometryOrbit = new THREE.RingGeometry(295,296,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit7 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit7 );

    uranus.position.x += 296;
    orbit7.rotation.x = Math.PI/2;

    pivotUranus = new THREE.Object3D();
    scene.add( pivotUranus );
    pivotUranus.add( uranus );

    /** NEPTUNE **/
    var geometry = new THREE.SphereGeometry(2, 32, 32);
    var texture = new THREE.TextureLoader().load( 'textures/planets/neptune.jpg' );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    neptune = new THREE.Mesh( geometry, material );
    scene.add(neptune);

    var geometryOrbit = new THREE.RingGeometry(350,351,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit8 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit8 );

    neptune.position.x += 351;
    orbit8.rotation.x = Math.PI/2;

    pivotNeptune = new THREE.Object3D();
    scene.add( pivotNeptune );
    pivotNeptune.add( neptune );

    /** PLUTON **/
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var texture = new THREE.TextureLoader().load( 'textures/planets/pluto.jpg' );
    var material = new THREE.MeshPhongMaterial( { map: texture } );
    pluto = new THREE.Mesh( geometry, material );
    scene.add(pluto);

    var geometryOrbit = new THREE.RingGeometry(380,381,32);
    var materialOrbit = new THREE.MeshBasicMaterial( { color: 0xffffff , side: THREE.DoubleSide } );
    orbit9 = new THREE.Mesh( geometryOrbit, materialOrbit );
    scene.add( orbit9 );

    pluto.position.x += 381;
    orbit9.rotation.x = Math.PI/2;

    pivotPluto = new THREE.Object3D();
    scene.add( pivotPluto );
    pivotPluto.add( pluto );

    /*** LUMIERE ***/
    light = new THREE.PointLight(0xffffff, 1 , 0);
    light.position.set(0,0,0);
    scene.add(light);

    /*** BACKGROUND ***/
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
    camera.position.z = 0;
    camera.position.y += 150;

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

    pivotMercure.rotation.y += 0.002;
    pivotVenus.rotation.y += 0.005;
    pivotEarth.rotation.y += 0.001;
    pivotMars.rotation.y += 0.004;
    pivotJupiter.rotation.y += 0.0036;
    pivotSaturn.rotation.y += 0.0024;
    pivotUranus.rotation.y += 0.0019;
    pivotNeptune.rotation.y += 0.0047;
    pivotPluto.rotation.y += 0.0058;


    camera.lookAt(scene.position);
    controls.update();
    renderer.render( scene, camera );
}