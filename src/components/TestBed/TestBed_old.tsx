import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./TestBed.css"
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";

export default function TestBed(){
    let scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xCCFF00 );
    const ambientLight = new THREE.AmbientLight("#888888");
    scene.add(ambientLight)
    const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.set(0, 0, -200);
    camera.lookAt(0, 0, 0);
    scene.add(camera)
    const onLoad = function(data:any){
        console.log('loaded', data)
		const paths = data.paths;
		const group = new THREE.Group();

		for ( let i = 0; i < paths.length; i ++ ) {
			const path = paths[ i ];
            console.log('path.color', path.color)
			const material = new THREE.MeshBasicMaterial( {
				color: path.color,
				side: THREE.DoubleSide,
				depthWrite: false
			} );

			const shapes = SVGLoader.createShapes( path );
            console.log('shapes', shapes)
			for ( let j = 0; j < shapes.length; j ++ ) {
				const shape = shapes[ j ];
                console.log('shapes', shape)
				const geometry = new THREE.ShapeGeometry( shape );
                console.log('geometry', geometry)
				const mesh = new THREE.Mesh( geometry, material );
                console.log('mesh', mesh)
				group.add( mesh );

			}

		}
        console.log('group', group)
        group.rotation.z = Math.PI;
		scene.add( group );

        scene.background = new THREE.Color( 0x000000 );
        console.log('scene', scene)
        document.getElementById('testbed-inner')!.appendChild( renderer.domElement );
        renderer.render(scene, camera)
    }
    const onProgress = function(xhr:any){
        console.log('progress')
    }
    const onError = function(error:any){
        console.log('error')
    }
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
    const loader = new SVGLoader();
    useEffect(
        ()=>{
            console.log('useeffect')
            loader.load('data/test2.svg', onLoad, onProgress, onError)
        } 
    )
    return  <div id="testbed-container">
                <div id="testbed-inner"/>
            </div>
}