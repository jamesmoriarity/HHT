import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./TestBed.css"
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { GUI, GUIController } from 'dat.gui'
import { ImageCodes } from "./ImageCodes";
import { Vector3 } from "three";
export interface ValueRange{
    min:number
    max:number
    step:number
}
export interface ControlRanges{
    x:ValueRange
    y:ValueRange
    z:ValueRange
    scale:ValueRange
}
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
        camera.rotateY(-2.09)
        const cameraFolder = gui.addFolder('Camera')
        cameraFolder.add(camera, 'fov', 20, 200)
            .name('Camera FOV')
            .listen()
            .onChange(onCameraChange)
        cameraFolder.add(camera.rotation, 'y', Math.PI / -1, Math.PI, .01)
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
        const imageCode:string = ImageCodes.mountainCode
        const height:number = 1.5
        const aspectRatio:number = 12
        const position:Vector3 = new Vector3(0,0,-5)
        const scale:number = .9
        let mesh = buildMesh(hostScene, imageCode, height, aspectRatio, position, scale)
        buildMeshControls('mountain', mesh, scale)
        return mesh
    }
    const buildSeattle = (hostScene:THREE.Scene) => {
        const imageCode:string = ImageCodes.seattleSkyline
        const height:number = 2
        const aspectRatio:number = 4
        const position:Vector3 = new Vector3(-3,-0.2,-3)
        const scale:number = 0.4
        let mesh:THREE.Mesh = buildMesh(hostScene, imageCode, height, aspectRatio, position, scale)
        buildMeshControls('seattle', mesh, scale)
        return mesh
    }
    const buildHawaiiCoast = (hostScene:THREE.Scene) => {
        const imageCode:string = ImageCodes.hawaiiCoastline
        const height:number = 2
        const aspectRatio:number = 7
        const position:Vector3 = new Vector3(30,0,7.75)
        const scale:number = 2.4
        let mesh:THREE.Mesh = buildMesh(hostScene, imageCode, height, aspectRatio, position, scale)
        mesh.rotateY(Math.PI/-4)
        buildMeshControls('hawaii coast', mesh, scale)
        mesh.lookAt(0,0,0)
        return mesh
    }
    const buildPalmShore = (hostScene:THREE.Scene) => {
        const imageCode:string = ImageCodes.palmShore
        const height:number = 4
        const aspectRatio:number = 1.5
        const position:Vector3 = new Vector3(13.05,1.8,15.05)
        const scale:number = 1.48
        let mesh:THREE.Mesh = buildMesh(hostScene, imageCode, height, aspectRatio, position, scale)
        mesh.rotateY(Math.PI/-4)
        buildMeshControls('palm shore', mesh, scale)
        mesh.lookAt(0,0,0)
        return mesh
    }
    const buildPalmLine = (hostScene:THREE.Scene) => {
        const imageCode:string = ImageCodes.palmLine
        const height:number = 4
        const aspectRatio:number = 4
        const position:Vector3 = new Vector3(13.05,1.8,15.05)
        const scale:number = 1.48
        let mesh:THREE.Mesh = buildMesh(hostScene, imageCode, height, aspectRatio, position, scale)
        mesh.rotateY(Math.PI/-4)
        buildMeshControls('palm line', mesh, scale)
        mesh.lookAt(0,0,0)
        return mesh
    }
    const buildLongIsland = (hostScene:THREE.Scene) => {
        const imageCode:string = ImageCodes.longIsland
        const height:number = 2
        const aspectRatio:number = 15
        const position:Vector3 = new Vector3(30,3.5,27)
        const scale:number = 3.16
        let mesh:THREE.Mesh = buildMesh(hostScene, imageCode, height, aspectRatio, position, scale)
        mesh.rotateY(Math.PI/-4)
        buildMeshControls('long island', mesh, scale)
        mesh.lookAt(0,0,0)
        return mesh
    }

    const buildMeshControls = (folderName:string, mesh:THREE.Mesh, scale:number, ranges?:ControlRanges) => {

        if(!ranges) ranges =   {
            x:{min:-30, max:30, step:0.05},
            y:{min:-30, max:30, step:0.05},
            z:{min:-30, max:30, step:0.05},
            scale:{min:0.2, max:5, step:0.051}
        }

        let meshProps = {scale:scale}
        const folder = gui.addFolder(folderName)
        folder.add(mesh.position, 'x', ranges.x.min, ranges.x.max, ranges.x.step)
        .name('Move X')
        .listen()
        .onChange(onObjectChange)

        folder.add(mesh.position, 'y', ranges.y.min, ranges.y.max, ranges.y.step)
        .name('Move Y')
        .listen()
        .onChange(onObjectChange)
        
        folder.add(mesh.position, 'z', ranges.z.min, ranges.z.max, ranges.z.step)
        .name('Move Z')
        .listen()
        .onChange(onObjectChange)

        folder.add(meshProps, 'scale', ranges.scale.min, ranges.scale.max, ranges.scale.step)
        .name('Scale')
        .listen()
        .onChange((scaleValue)=>{
            mesh.scale.x = scaleValue
            mesh.scale.y = scaleValue
            mesh.scale.z = scaleValue
            onObjectChange()
        })

        //folder.open()
    }
    const buildMesh = (hostScene:THREE.Scene, imageCode:string, height:number, aspectRatio:number, position:THREE.Vector3, scale:number):THREE.Mesh => {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(imageCode);
        const material = new THREE.MeshPhongMaterial({map:texture, transparent:true})
        const width = height * aspectRatio
        let plane:THREE.PlaneGeometry = new THREE.PlaneGeometry(width, height)
        let mesh = new THREE.Mesh(plane, material);
        let meshProps = {scale:scale}
        mesh.position.z = position.z
        mesh.position.x = position.x
        mesh.position.y = position.y
        mesh.scale.x = meshProps.scale
        mesh.scale.y = meshProps.scale
        mesh.scale.z = meshProps.scale
        hostScene.add(mesh)
        return mesh
    }
    const buildForestSprite = (hostScene:THREE.Scene):THREE.Sprite => {
        const position:THREE.Vector3 = new THREE.Vector3(-6,-0.1,-2.3)
        const imageCode:string = ImageCodes.forest
        const aspectRatio:number = 4
        const initialScale:number = 1
        const sprite:THREE.Sprite = buildSprite(hostScene, position, imageCode, aspectRatio, initialScale)
        buildSpriteControls('forest sprite', sprite, aspectRatio, initialScale)
        return sprite
    }
    const buildBird = (hostScene:THREE.Scene):THREE.Sprite => {
        const position:THREE.Vector3 = new THREE.Vector3(-3,8,0)
        const imageCode:string = ImageCodes.bird
        const aspectRatio:number = 1
        const initialScale:number = .7
        const sprite:THREE.Sprite = buildSprite(hostScene, position, imageCode, aspectRatio, initialScale)
        buildSpriteControls('bird', sprite, aspectRatio, initialScale)
        return sprite
    }
    
    const animateBird = () => {
        bird.position.x = (bird.position.x * 1.03) + .01
        bird.position.y = bird.position.y * .99
        bird.position.z = bird.position.z - .4
        if (bird.position.x < 65 && bird.position.x > -65) setTimeout(animateBird, 50)
        else{
            const xStart:number = Math.floor(Math.random() * 12) - 6
            const orginalBirdPosition = new THREE.Vector3(xStart,8,0)
            bird.position.set(orginalBirdPosition.x, orginalBirdPosition.y, orginalBirdPosition.z)
            setTimeout(animateBird, 1200)
        }
        onObjectChange()  
    }
    const buildSpriteControls = (   folderName:string, 
                                    sprite:THREE.Sprite, 
                                    aspectRatio:number, 
                                    initialScale:number,
                                    ranges?:ControlRanges) => {

        if(!ranges) ranges =   {
                                x:{min:-10, max:10, step:0.1},
                                y:{min:-10, max:10, step:0.1},
                                z:{min:-10, max:10, step:0.1},
                                scale:{min:0.1, max:10, step:0.1}
                                }

        let meshProps = {scale:initialScale}
        const folder = gui.addFolder(folderName)
        folder.add(sprite.position, 'x', ranges.x.min, ranges.x.max, ranges.x.step)
            .name('Move X')
            .listen()
            .onChange(onObjectChange)
         
            folder.add(sprite.position, 'y', ranges.y.min, ranges.y.max, ranges.y.step)
            .name('Move Y')
            .listen()
            .onChange(onObjectChange)
            folder.add(sprite.position, 'z', ranges.z.min, ranges.z.max, ranges.z.step)
            .name('Move Z')
            .listen()
            .onChange(onObjectChange)
            folder.add(meshProps, 'scale', ranges.scale.min, ranges.scale.max, ranges.scale.step)
            .name('Scale')
            .listen()
            .onChange((scaleValue)=>{
                sprite.scale.x = scaleValue * aspectRatio
                sprite.scale.y = scaleValue
                sprite.scale.z = scaleValue
                onObjectChange()
            })
        
        //folder.open()
    }
    const buildSprite = (   hostScene:THREE.Scene, 
                            position:THREE.Vector3, 
                            imageCode:string, 
                            aspectRatio:number, 
                            initialScale:number) => {
            // aspectRatio defines w/h ratio. w = h * aspectRatio
            const textureLoader = new THREE.TextureLoader();
            const texture = textureLoader.load(imageCode);
            const material = new THREE.SpriteMaterial( { map: texture } );
            const sprite = new THREE.Sprite( material );
            const xScale:number = initialScale * aspectRatio
            const yScale:number = initialScale 
            const zScale:number = 1
            sprite.scale.set(xScale, yScale, zScale)
            sprite.position.set(position.x, position.y, position.z)
            hostScene.add( sprite );
            return sprite
    }

    const buildForestTwo = (hostScene:THREE.Scene) => {
        const textureLoader = new THREE.TextureLoader();
        const forestTexture = textureLoader.load(ImageCodes.closeForest);
        const aspectRatio:number = 2
        const forestMaterial = new THREE.SpriteMaterial( { map: forestTexture } );
        const sprite = new THREE.Sprite( forestMaterial );
        const xScale:number = 3
        const yScale:number = xScale/aspectRatio
        const zScale:number = 1
        sprite.scale.set(xScale, yScale, zScale)
        sprite.position.set(-6, 0.3 , 0.2)
        hostScene.add( sprite );
        let forestMeshProps = {scale:1}
        const forestTwoFolder = gui.addFolder('forest two')
        forestTwoFolder.add(sprite.position, 'x', -10, 10,1)
            .name('Move X')
            .listen()
            .onChange(onObjectChange)
         
        forestTwoFolder.add(sprite.position, 'z', -10, 10,1)
            .name('Move Z')
            .listen()
            .onChange(onObjectChange)
        forestTwoFolder.add(sprite.position, 'y', -2, 2,0.1)
            .name('Move Y')
            .listen()
            .onChange(onObjectChange)
        forestTwoFolder.add(forestMeshProps, 'scale', 0.2, 3, 0.1)
            .name('Scale')
            .listen()
            .onChange((scaleValue)=>{
                sprite.scale.x = scaleValue
                sprite.scale.y = scaleValue/aspectRatio
                sprite.scale.z = scaleValue
                onObjectChange()
            })
        
        //forestTwoFolder.open()


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
        // seattleFolder.open()
    }

    const animate = () => {
        animateBird()
    }
    const gui = new GUI()
    const scene:THREE.Scene = buildScene()
    const camera:THREE.PerspectiveCamera = buildCamera()
    const renderer = buildRenderer()
    const [ambientLight, directionalLight] = buildLighting() 
    const mountain:THREE.Mesh = buildMountain(scene)
    const seattle:THREE.Mesh = buildSeattle(scene)
    //const forest:THREE.Mesh = buildForest(scene)
    const forestTwo:THREE.Sprite = buildForestTwo(scene)
    const bird:THREE.Sprite = buildBird(scene)
    const fsprite:THREE.Sprite = buildForestSprite(scene)
    //const hawaiiCoast:THREE.Mesh = buildHawaiiCoast(scene)
    //const palmShore:THREE.Mesh = buildPalmShore(scene)
    const longIsland:THREE.Mesh = buildLongIsland(scene)
    const palmLine:THREE.Mesh = buildPalmLine(scene)

    useEffect(()=>{
            console.log('useeffect')
            document.getElementById('testbed-inner')!.appendChild( renderer.domElement );
            renderScene()  
            
        } 
    )
    return  <div id="testbed-container">
                <div onClick={animate} id="testbed-inner"/>
            </div>
}