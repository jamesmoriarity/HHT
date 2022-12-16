import * as THREE from "three";
import { MeshStandardMaterial, TextureLoader, Vector2, Vector3 } from "three";
export class CardHelper{
    constructor(){}
    
    static scale:number = 1
    static windowScale:number = 0.8
    static pixelsPerUnit:number = 325
    static targetHeight:number = window.innerHeight * CardHelper.windowScale
    static targetHeightUnits:number = (CardHelper.targetHeight)/CardHelper.pixelsPerUnit
    static targetWidth:number = window.innerWidth * CardHelper.windowScale
    static targetWidthUnits:number = CardHelper.targetWidth/CardHelper.pixelsPerUnit
    static bgImage:string = 'jpg/sky.jpg'
    static buildRenderer = () => {
        let renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize( window.innerWidth, window.innerHeight );
        return renderer
    }
    static buildCamera = () => {
        let camera = new THREE.PerspectiveCamera(14, window.innerWidth/window.innerHeight, 1, 1000 );
        camera.position.set(0, 0, 10)
        camera.lookAt(0,0,0)
        camera.updateProjectionMatrix()
        return camera
    }
    static buildLighting = (scene:THREE.Scene) => {
        const lightIntensity:number = 0.15
        let lightBlue = new THREE.DirectionalLight(0x444444, lightIntensity);
        lightBlue.castShadow = true;
        lightBlue.position.set(0, 0.25, 2);
        scene.add(lightBlue);
        let lowBlue = new THREE.DirectionalLight(0x444444, lightIntensity);
        lowBlue.castShadow = true;
        lowBlue.position.set(0, -0.2, 3);
        scene.add(lowBlue);
        const lightH = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.95 );
        scene.add( lightH );
    }
    static addGrid = (scene:THREE.Scene) => {
        var green = new THREE.Color(0x00ff00)
        var red = new THREE.Color(0x990000)
        var blue = new THREE.Color(0x004466)
        var dkblue = new THREE.Color(0x000011)
        var grey = new THREE.Color(0xaaaaaa)
        var gridXY = new THREE.GridHelper(20, 80, green, blue);
        gridXY.rotation.x = Math.PI/2;
        gridXY.position.set(0,0,0);
        scene.add(gridXY);
    
        var gridXY2 = new THREE.GridHelper(20, 20, green, dkblue);
        gridXY2.rotation.x = Math.PI/2;
        gridXY2.position.set(0,0,0);
        scene.add(gridXY2);
    
        const size = 50;
        const divisions = 50;
        const gridHelper = new THREE.GridHelper( size, divisions, red, grey );
        scene.add( gridHelper );
        var axes = new THREE.AxesHelper(6);
        scene.add(axes);
    }
    static buildPanels = (scene:THREE.Scene, onLoadedCallback:Function) => {
        console.log('buildPanels')
        const panelWidth:number = (CardHelper.targetWidthUnits/4)
        const panelHeight:number = CardHelper.targetHeightUnits
        const geometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0001)
        const matsRight = CardHelper.getPanelMats('right', onLoadedCallback)
        let meshRight = new THREE.Mesh( geometry, matsRight);
        meshRight.castShadow = true;
        meshRight.receiveShadow = true;
        let rightPanel = new THREE.Group();
        rightPanel.add(meshRight)
        scene.add(rightPanel)
        meshRight.position.set(-.125 * CardHelper.targetWidthUnits, 0, 0)
        rightPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        rightPanel.position.set(0.25 * CardHelper.targetWidthUnits, 0, 0)

        const matsLeft = CardHelper.getPanelMats('left', onLoadedCallback)
        let meshLeft = new THREE.Mesh( geometry, matsLeft);
        meshLeft.castShadow = true;
        meshLeft.receiveShadow = true;
        let leftPanel = new THREE.Group();
        leftPanel.add(meshLeft)
        scene.add(leftPanel)
        meshLeft.position.set(0.125 * CardHelper.targetWidthUnits, 0, 0)
        leftPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        leftPanel.position.set(-0.25 * CardHelper.targetWidthUnits, 0, 0)
        return [ leftPanel, rightPanel ]
        // return [leftPanel, rightPanel]
    }
    static getPanelMats = (side:string, callback:Function) => {
        console.log('getPanelMats')
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            color: 0xffCC99,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
        });
        const skyurl = (side === 'left') ? 'jpg/sky1.jpg' : 'jpg/sky3.jpg'
        const sky = new THREE.MeshPhongMaterial({ flatShading:true, map: loader.load(skyurl)})
        
        const coverurl = (side === 'left') ? 'jpg/cover-left.jpg' : 'jpg/cover-right.jpg'
        const onCoverLoaded = function(){
            callback()
        }
        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
            map: loader.load(coverurl, onCoverLoaded)
        });    
        const cubeMaterials = [
            material, //right side
            material, //left side
            material, //top side
            material, //bottom side
            materialWhite, //front side
            sky, //back side
        ];
        return cubeMaterials
    }
    static buildCenter = (scene:THREE.Scene) => {
        const cardWidth:number = CardHelper.targetWidthUnits/2
        const cardHeight:number = CardHelper.targetHeightUnits
        var geometry = new THREE.PlaneGeometry( cardWidth, cardHeight, 100, 100 );
        const loader = new THREE.TextureLoader()
        let texture = loader.load('jpg/sky2.jpg')
        const materialInside = new THREE.MeshBasicMaterial({
            map: texture,
          });
        
        let inside = new THREE.Mesh( geometry, materialInside );
        inside.castShadow = true;
        inside.receiveShadow = true;
        let parent = new THREE.Group();
        parent.castShadow = true
        parent.receiveShadow = true;
        var material = new THREE.MeshPhongMaterial({
            color: 0x330000,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
            side:THREE.DoubleSide
        });
        let underneath = new THREE.Mesh( geometry, material );
        underneath.castShadow = true
        underneath.receiveShadow = true
        underneath.position.set(0,0,-0.11)
        parent.add(underneath);
        parent.add(inside);
        scene.add(parent)
        parent.position.set(0,0,-0.01)
        return parent
    }
    static buildBackground = (scene:THREE.Scene) => {
        const cardWidth:number = CardHelper.scale * 5
        const cardHeight:number = CardHelper.scale * 5
        var geometry = new THREE.PlaneGeometry( cardWidth, cardHeight, 100, 100 );
        var material = new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true
        });
        let bg = new THREE.Mesh( geometry, material );
        bg.castShadow = true;
        bg.receiveShadow = true;
        scene.add(bg)
        bg.position.set(0,0,-0.5)
        return bg
    }
}