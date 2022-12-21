import * as THREE from "three";
import { MeshStandardMaterial, TextureLoader, Vector2, Vector3 } from "three";
export class CardHelper{
    static windowScale:number = 0.9 
    static bgImage:string = 'jpg/sky.jpg'
    pixelsPerUnit:number
    targetHeight:number;
    targetHeightUnits:number;
    targetWidth:number;
    targetWidthUnits:number;
    isHorizontal:boolean;
    constructor(){ 
        this.isHorizontal = (window.innerWidth >= window.innerHeight)
        this.pixelsPerUnit = this.getPixelsPerUnit()
        this.targetHeight= this.getTargetHeight()
        this.targetHeightUnits = this.targetHeight/this.pixelsPerUnit
        this.targetWidth = this.getTargetWidth()
        this.targetWidthUnits = this.targetWidth/this.pixelsPerUnit
        console.log('this.isHorizontal', this.isHorizontal)
        console.log('pixelsPerUnit', this.pixelsPerUnit)
        console.log('targetWidth', this.targetWidth)
        console.log('targetHeight', this.targetHeight)
        console.log('targetWidthUnits', this.targetWidthUnits)
        console.log('targetHeightUnits', this.targetHeightUnits)
    }
    getPixelsPerUnit = () => {
        const dimension:number = (this.isHorizontal) ? window.innerHeight : window.innerWidth
        let ppu:number = (-10 + (dimension * .43)) * .975
        if(!this.isHorizontal){
            ppu = ppu *  ((window.innerHeight/window.innerWidth) / 2)
        }
        return ppu
    }

    getTargetHeight = () => {
        const scaledHeight:number = window.innerHeight * CardHelper.windowScale
        return (this.isHorizontal) ? scaledHeight : (0.5 * scaledHeight)
    }
    getTargetWidth = () => {
        const scaledWidth:number = window.innerWidth * CardHelper.windowScale
        const targetWidth:number = (this.isHorizontal) ? (0.5 * scaledWidth) : scaledWidth
        return targetWidth
    }
    // is it horizontal or vertical

    buildRenderer = () => {
        let renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize( window.innerWidth, window.innerHeight );
        return renderer
    }
    buildCamera = () => {
        //const fov:number = 14
        const fov:number = this.targetHeight * this.pixelsPerUnit * .05
        let camera = new THREE.PerspectiveCamera(14, this.targetWidth/this.targetHeight, 1, 1000 );
        //new THREE.OrthographicCamera
        camera.position.set(0, 0, 10)
        camera.lookAt(0,0,0)
        camera.updateProjectionMatrix()
        return camera
    }
    buildLighting = (scene:THREE.Scene) => {
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
    addGrid = (scene:THREE.Scene) => {
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
    buildVerticalPanels = (scene:THREE.Scene, onLoadedCallback:Function) => {
        console.log('buildVerticalPanels')
        const panelWidth:number = this.targetWidthUnits
        const panelHeight:number = this.targetHeightUnits/4
        const geometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0001)
        const matsBottom = this.getPanelMatsVertical('bottom', onLoadedCallback)
        let meshBottom = new THREE.Mesh( geometry, matsBottom);
        meshBottom.castShadow = true;
        meshBottom.receiveShadow = true;
        let bottomPanel = new THREE.Group();
        bottomPanel.add(meshBottom)
        scene.add(bottomPanel)
        meshBottom.position.set(0, .125 * this.targetHeightUnits, 0)
        bottomPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        bottomPanel.position.set(0, -0.25 * this.targetHeightUnits, 0)

        const matsTop = this.getPanelMatsVertical('top', onLoadedCallback)
        let meshTop = new THREE.Mesh( geometry, matsTop);
        meshTop.castShadow = true;
        meshTop.receiveShadow = true;
        let topPanel = new THREE.Group();
        topPanel.add(meshTop)
        scene.add(topPanel)
        meshTop.position.set(0, -0.125 * this.targetHeightUnits, 0)
        topPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        topPanel.position.set(0, 0.25 * this.targetHeightUnits, 0)

        let targetLogoDimension:number = (this.targetHeightUnits * 0.25)
        const w:number = targetLogoDimension*2
        const h:number = targetLogoDimension/2
        const yOffset:number = (h * 1.5)
        let logoGeo:THREE.PlaneGeometry = new THREE.PlaneGeometry(w, h)
        //let logoLeftMat = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        let logoTopMat = this.getLogoMaterial('jpg/enso_top_v.jpg', onLoadedCallback)
        let logoTopMesh = new THREE.Mesh( logoGeo, logoTopMat);
        logoTopMesh.position.set(0,-yOffset,0.001)
        topPanel.add(logoTopMesh)
        
        let logoBottomMat = this.getLogoMaterial('jpg/enso_bottom_v.jpg', onLoadedCallback)
        let logoBottomMesh = new THREE.Mesh( logoGeo, logoBottomMat);
        logoBottomMesh.position.set(0,yOffset,0.001)
        bottomPanel.add(logoBottomMesh)

        return [ topPanel, bottomPanel ]


    }
    buildHorizontalPanels = (scene:THREE.Scene, onLoadedCallback:Function) => {
        console.log('buildHorizontalPanels')
        const panelWidth:number = (this.targetWidthUnits/4)
        const panelHeight:number = this.targetHeightUnits
        const geometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0001)
        const matsRight = this.getPanelMatsHorizontal('right', onLoadedCallback)
        let meshRight = new THREE.Mesh( geometry, matsRight);
        meshRight.castShadow = true;
        meshRight.receiveShadow = true;
        let rightPanel = new THREE.Group();
        rightPanel.add(meshRight)
        scene.add(rightPanel)
        meshRight.position.set(-.125 * this.targetWidthUnits, 0, 0)
        rightPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        rightPanel.position.set(0.25 * this.targetWidthUnits, 0, 0)

        const matsLeft = this.getPanelMatsHorizontal('left', onLoadedCallback)
        let meshLeft = new THREE.Mesh( geometry, matsLeft);
        meshLeft.castShadow = true;
        meshLeft.receiveShadow = true;
        let leftPanel = new THREE.Group();
        leftPanel.add(meshLeft)
        scene.add(leftPanel)
        meshLeft.position.set(0.125 * this.targetWidthUnits, 0, 0)
        leftPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        leftPanel.position.set(-0.25 * this.targetWidthUnits, 0, 0)

        //  create a mesh 
  
let targetLogoDimension:number = (this.targetWidthUnits * 0.25)
const xOffset:number = targetLogoDimension * .75
let logoGeo:THREE.PlaneGeometry = new THREE.PlaneGeometry(targetLogoDimension/2, targetLogoDimension * 2)

let logoLeftMat = this.getLogoMaterial('jpg/enso_left_h.jpg', onLoadedCallback)
let logoLeftMesh = new THREE.Mesh( logoGeo, logoLeftMat);
logoLeftMesh.position.set(xOffset,0,0.001)
leftPanel.add(logoLeftMesh)

let logoRightMat = this.getLogoMaterial('jpg/enso_right_h.jpg', onLoadedCallback)
let logoRightMesh = new THREE.Mesh( logoGeo, logoRightMat);
logoRightMesh.position.set(-xOffset,0,0.001)
rightPanel.add(logoRightMesh)


        return [ leftPanel, rightPanel ]
    }
    buildPanels = (scene:THREE.Scene, onLoadedCallback:Function) => {
        if(this.isHorizontal){
            return this.buildHorizontalPanels(scene, onLoadedCallback)
        }
        else{
            return this.buildVerticalPanels(scene, onLoadedCallback)
        }
    }

    getLogoMaterial = (logoURL:string, callback:Function) => {
        console.log('getLogoMats') 
        const onCoverLoaded = function(){
            callback()
        }
        const loader = new THREE.TextureLoader();
        const logoLeftMaterial = new THREE.MeshPhongMaterial({ flatShading:true, map: loader.load(logoURL, onCoverLoaded)})
           
        return logoLeftMaterial
    }

    getPanelMats = (insideCoverURL:string, outsideCoverURL:string, callback:Function) => {
        console.log('getPanelMats')
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
        });
        const sky = new THREE.MeshPhongMaterial({ flatShading:true, map: loader.load(insideCoverURL)})
        const onCoverLoaded = function(){
            callback()
        }
        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
            map: loader.load(outsideCoverURL, onCoverLoaded)
        });    
        const cubeMaterials = [
            material, //right side
            material, //left side
            material, //top side
            material, //bottom side
            material, //front side
            sky, //back side
        ];
        return cubeMaterials
    }

    getPanelMatsVertical = (side:string, callback:Function) => {
        const insideCoverURL:string = (side === 'top') ? 'jpg/panel_top.jpg' : 'jpg/panel_bottom.jpg'
        const outisideCoverURL:string = (side === 'top') ? 'jpg/enso_top_v.jpg' : 'jpg/enso_bottom_v.jpg' // fix
        return this.getPanelMats(insideCoverURL, outisideCoverURL, callback)

    }
    getPanelMatsHorizontal = (side:string, callback:Function) => {
        const insideCoverURL = (side === 'left') ? 'jpg/sky1.jpg' : 'jpg/sky3.jpg'
        const outisideCoverURL = (side === 'left') ? 'jpg/enso_left_h.jpg' : 'jpg/enso_right_h.jpg'
        return this.getPanelMats(insideCoverURL, outisideCoverURL, callback) 
    }
    buildCenter = (scene:THREE.Scene) => {
        return (this.isHorizontal) ? this.buildHorizontalCenter(scene):this.buildVerticalCenter(scene)
    }
    buildVerticalCenter = (scene:THREE.Scene) => {
        const centerWidth:number = this.targetWidthUnits
        const centerHeight:number = this.targetHeightUnits/2
        console.log('centerWidth', centerWidth)
        var geometry = new THREE.PlaneGeometry( centerWidth, centerHeight, 10, 10 );
        const loader = new THREE.TextureLoader()
        let texture = loader.load('jpg/panel_center.jpg')
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
    buildHorizontalCenter = (scene:THREE.Scene) => {
        const centerWidth:number = this.targetWidthUnits/2
        const centerHeight:number = this.targetHeightUnits
        var geometry = new THREE.PlaneGeometry( centerWidth, centerHeight, 100, 100 );
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
    buildBackground = (scene:THREE.Scene) => {
        const cardWidth:number = window.innerWidth
        const cardHeight:number = window.innerHeight
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