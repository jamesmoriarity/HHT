import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./TestBed.css"
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { GUI, GUIController } from 'dat.gui'
import { ImageCodes } from "./ImageCodes";

export default function TestBed(){
    const buildScene = () => {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc )
        return scene
    }
    const buildCamera = () => {
        const aspectRatio:number = window.innerWidth / window.innerHeight
        const fov:number = 75
        const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000 );
        camera.position.y = 0
        camera.position.z = 6
        const cameraFolder = gui.addFolder('Camera')
        cameraFolder.add(camera, 'fov', 20, 75)
            .name('Camera FOV')
            .listen()
            .onChange(onCameraChange)
        cameraFolder.add(camera.rotation, 'y', Math.PI / -1, Math.PI)
                .name('Rotate on Y axis')
                .listen()
                .onChange(onCameraChange)
        
        cameraFolder.add(camera.position, 'x', -20, 20)
            .name('Move X')
            .listen().onChange(onCameraChange)
    
        cameraFolder.add(camera.position, 'z', 0, 15)
            .name('Move  Z')
            .listen()
            .onChange(onCameraChange)
        cameraFolder.open()
        return camera
    }
    const buildRenderer = () => {
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight ); 
        return renderer   
    }
    const buildLighting = () => {
        let ambientLight = new THREE.AmbientLight(0xffffff, 1);
        let directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        scene.add(ambientLight);
        scene.add(directionalLight);
        return [ambientLight, directionalLight]
    }
    const renderScene = () => {
        renderer.render(scene, camera)
    }
    const onCameraChange = () => {
        camera.updateProjectionMatrix()
        renderScene()
    }
    const onObjectChange = () => {
        renderScene()
    }
    const buildMountain = (hostScene:THREE.Scene) => {
        const textureLoader = new THREE.TextureLoader();
        const mVals = {width:18, height:1.5, x:0, y:0, z:-5}
        const mountainTexture = textureLoader.load(ImageCodes.mountainCode);
        const mountainMaterial = new THREE.MeshPhongMaterial({map:mountainTexture, transparent:true})
        let mountainPlane:THREE.PlaneGeometry = new THREE.PlaneGeometry(mVals.width,mVals.height)
        let mountainMesh = new THREE.Mesh( mountainPlane, mountainMaterial);
        mountainMesh.position.z = mVals.z
        mountainMesh.position.x = mVals.x
        mountainMesh.position.y = mVals.y
        hostScene.add(mountainMesh)

        const mountainFolder = gui.addFolder('mountain')
        mountainFolder.add(mountainMesh.position, 'x', -10, 10,1)
            .name('Move X')
            .listen()
            .onChange(onObjectChange)
        mountainFolder.add(mountainMesh.position, 'z', -10, 10,1)
            .name('Move Z')
            .listen()
            .onChange(onObjectChange)
        mountainFolder.add(mountainMesh.position, 'y', -2, 2,0.25)
            .name('Move Y')
            .listen()
            .onChange(onObjectChange)
        mountainFolder.open()

        return mountainMesh
    }
    const buildSeattle = (hostScene:THREE.Scene) => {
        const textureLoader = new THREE.TextureLoader();
        const seattleTexture = textureLoader.load(ImageCodes.seattleSkyline);
        const seattleMaterial = new THREE.MeshPhongMaterial({map:seattleTexture, transparent:true})
        let seattlePlane:THREE.PlaneGeometry = new THREE.PlaneGeometry(8,2)
        let seattleMesh = new THREE.Mesh( seattlePlane, seattleMaterial);
        let seattleMeshProps = {scale:0.4}
        seattleMesh.position.z = -3
        seattleMesh.position.x = -3
        seattleMesh.position.y = -0.2
        seattleMesh.scale.x = seattleMeshProps.scale
        seattleMesh.scale.y = seattleMeshProps.scale
        seattleMesh.scale.z = seattleMeshProps.scale
        hostScene.add(seattleMesh)
        buildSeattleControls(seattleMesh, seattleMeshProps, onObjectChange)
        return seattleMesh
    }
    const buildForest = (hostScene:THREE.Scene) => {
        const textureLoader = new THREE.TextureLoader();
        const forestTexture = textureLoader.load(ImageCodes.forest);
        const forestMaterial = new THREE.MeshPhongMaterial({map:forestTexture, transparent:true})
        let forestPlane:THREE.PlaneGeometry = new THREE.PlaneGeometry(8,2)
        let forestMesh = new THREE.Mesh( forestPlane, forestMaterial);
        let forestMeshProps = {scale:0.4}
        forestMesh.position.set(-4, 0 , 0)
        forestMesh.scale.x = forestMeshProps.scale
        forestMesh.scale.y = forestMeshProps.scale
        forestMesh.scale.z = forestMeshProps.scale
        hostScene.add(forestMesh)
        const forestFolder = gui.addFolder('forest')
        forestFolder.add(forestMesh.position, 'x', -10, 10,1)
            .name('Move X')
            .listen()
            .onChange(onObjectChange)
        forestFolder.add(forestMesh.position, 'z', -10, 10,1)
            .name('Move Z')
            .listen()
            .onChange(onObjectChange)
        forestFolder.add(forestMesh.position, 'y', -2, 2,0.1)
            .name('Move Y')
            .listen()
            .onChange(onObjectChange)
            forestFolder.add(forestMeshProps, 'scale', 0.2, 3, 0.1)
            .name('Scale')
            .listen()
            .onChange((scaleValue)=>{
                forestMesh.scale.x = scaleValue
                forestMesh.scale.y = scaleValue
                forestMesh.scale.z = scaleValue
                onObjectChange()
            })
        forestFolder.open()


        return forestMesh
    }
    const buildForestTwo = (hostScene:THREE.Scene) => {


        const textureLoader = new THREE.TextureLoader();
        const forestTexture = textureLoader.load(ImageCodes.closeForest);
        const forestMaterial = new THREE.MeshPhongMaterial({map:forestTexture, transparent:true})



        const material = new THREE.SpriteMaterial( { map: forestTexture } );

        const sprite = new THREE.Sprite( material );
        sprite.scale.set(1, .5, 1)
        sprite.position.set(0, 0 , 0)
        hostScene.add( sprite );


        let forestPlane:THREE.PlaneGeometry = new THREE.PlaneGeometry(8,4)
        let forestMesh = new THREE.Mesh( forestPlane, forestMaterial);
        let forestMeshProps = {scale:0.4}
        forestMesh.position.set(-6, -0.1 , -1)
        forestMesh.scale.x = forestMeshProps.scale
        forestMesh.scale.y = forestMeshProps.scale
        forestMesh.scale.z = forestMeshProps.scale
        //hostScene.add(forestMesh)


         const forestTwoFolder = gui.addFolder('forest two')
        forestTwoFolder.add(sprite.position, 'x', -10, 10,1)
            .name('Move X')
            .listen()
            .onChange(onObjectChange)
        /* 
        forestTwoFolder.add(sprite.position, 'z', -10, 10,1)
            .name('Move Z')
            .listen()
            .onChange(onObjectChange)
        forestTwoFolder.add(sprite.position, 'y', -2, 2,0.1)
            .name('Move Y')
            .listen()
            .onChange(onObjectChange)
        forestTwoFolder.add(sprite, 'scale', 0.2, 3, 0.1)
            .name('Scale')
            .listen()
            .onChange((scaleValue)=>{
                sprite.scale.x = scaleValue
                sprite.scale.y = scaleValue
                sprite.scale.z = scaleValue
                onObjectChange()
            })
         */
        forestTwoFolder.open()


        return sprite
    }
    const buildSeattleControls = (seattleMesh:THREE.Mesh, seattleMeshProps:any, onChangeHandler:Function) => {
        const seattleFolder = gui.addFolder('seattle')
        seattleFolder.add(seattleMesh.position, 'x', -10, 10,1)
            .name('Move X')
            .listen()
            .onChange(()=>onChangeHandler())
            seattleFolder.add(seattleMesh.position, 'z', -10, 10,1)
            .name('Move Z')
            .listen()
            .onChange(()=>onChangeHandler())
            seattleFolder.add(seattleMesh.position, 'y', -2, 2,0.1)
            .name('Move Y')
            .listen()
            .onChange(()=>onChangeHandler())
            seattleFolder.add(seattleMeshProps, 'scale', 0.2, 3, 0.1)
                .name('Scale')
                .listen()
                .onChange((scaleValue)=>{
                    seattleMesh.scale.x = scaleValue
                    seattleMesh.scale.y = scaleValue
                    seattleMesh.scale.z = scaleValue
                    onChangeHandler()
                })
        seattleFolder.open()
    }

    const gui = new GUI()
    const scene:THREE.Scene = buildScene()
    const camera:THREE.PerspectiveCamera = buildCamera()
    const renderer = buildRenderer()
    const [ambientLight, directionalLight] = buildLighting() 
    const mountain:THREE.Mesh = buildMountain(scene)
    const seattle:THREE.Mesh = buildSeattle(scene)
    const forest:THREE.Mesh = buildForest(scene)
    const forestTwo:THREE.Sprite = buildForestTwo(scene)

    useEffect(()=>{
            console.log('useeffect')
            document.getElementById('testbed-inner')!.appendChild( renderer.domElement );
            camera.lookAt(0,0,0)
            renderScene()  
        } 
    )
    return  <div id="testbed-container">
                <div id="testbed-inner"/>
            </div>
}