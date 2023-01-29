import { CardBuilderElements } from "./CardBuilderElements";
import * as THREE from "three";
import { CardDimensions } from "./CardDimensions";

export class CardBuilder{
    elements:CardBuilderElements
    onBuildCompleteCallback:Function
    alphaPanel:THREE.Group = new THREE.Group()
    betaPanel:THREE.Group = new THREE.Group()
    panelsLoaded:number
    dimensions:CardDimensions
    renderMethod:Function
    constructor(onBuildCompleteCallback:Function, renderMethod:Function){
        this.onBuildCompleteCallback = onBuildCompleteCallback
        this.renderMethod = renderMethod
        this.panelsLoaded = 0
        this.dimensions = new CardDimensions()
        this.elements = this.getElements()
        this.buildRenderer()
        this.buildLighting()
    }
    reset = () => {
        this.panelsLoaded = 0
        this.dimensions = new CardDimensions()
    }
    getElements(){
        let e:CardBuilderElements = new CardBuilderElements()
        return e
    }
    onMaterialsLoaded = () => {
        this.panelsLoaded++
        console.log('onMaterialsLoaded', this.panelsLoaded)
        const targetLoads:number = 4
        if(this.panelsLoaded === targetLoads){
            this.renderMethod()
            setTimeout(()=>{this.onBuildCompleteCallback()}, 2000)
        }
    }
    buildCamera = () => {
        const fov:number = 14
        this.elements.camera = new THREE.PerspectiveCamera(fov, this.dimensions.targetWidth/this.dimensions.targetHeight, 1, 1000 );
        //new THREE.OrthographicCamera
        this.elements.camera.position.set(0, 0, 10)
        this.elements.camera.lookAt(0,0,0)
        this.elements.camera.updateProjectionMatrix()
    }
    buildLighting = () => {
        const lightIntensity:number = 0.15
        let lightBlue = new THREE.DirectionalLight(0x444444, lightIntensity);
        lightBlue.castShadow = true;
        lightBlue.position.set(0, 0.25, 2);
        this.elements.scene.add(lightBlue);
        let lowBlue = new THREE.DirectionalLight(0x444444, lightIntensity);
        lowBlue.castShadow = true;
        lowBlue.position.set(0, -0.2, 3);
        this.elements.scene.add(lowBlue);
        const lightH = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.95 );
        this.elements.scene.add( lightH );
    }
    buildRenderer = () => {
        let renderer = new THREE.WebGLRenderer({alpha:true, antialias:true });
        renderer.setClearColor( 0x000000, 0 );
        renderer.outputEncoding = THREE.sRGBEncoding;
        //renderer.shadowMap.enabled = true;
        //renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize( window.innerWidth, window.innerHeight );
        this.elements.renderer = renderer
    }
    setScene(){
        this.elements.scene = new THREE.Scene();
        this.elements.scene.background = new THREE.Color( 0xdedede );
        this.elements.scene.add(this.elements.camera)
    }
    buildVerticalPanels = (scene:THREE.Scene) => {
        const panelWidth:number = this.dimensions.targetWidthUnits
        const panelHeight:number = this.dimensions.targetHeightUnits/4
        const geometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0001)
        const matsBottom = this.getPanelMatsVertical('bottom', this.onMaterialsLoaded)
        let meshBottom = new THREE.Mesh( geometry, matsBottom);
        meshBottom.castShadow = true;
        meshBottom.receiveShadow = true;
        let bottomPanel = new THREE.Group();
        bottomPanel.add(meshBottom)
        scene.add(bottomPanel)
        meshBottom.position.set(0, .125 * this.dimensions.targetHeightUnits, 0)
        bottomPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        bottomPanel.position.set(0, -0.25 * this.dimensions.targetHeightUnits, 0)
        const matsTop = this.getPanelMatsVertical('top', this.onMaterialsLoaded)
        let meshTop = new THREE.Mesh( geometry, matsTop);
        meshTop.castShadow = true;
        meshTop.receiveShadow = true;
        let topPanel = new THREE.Group();
        topPanel.add(meshTop)
        scene.add(topPanel)
        meshTop.position.set(0, -0.125 * this.dimensions.targetHeightUnits, 0)
        topPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        topPanel.position.set(0, 0.25 * this.dimensions.targetHeightUnits, 0)
        let targetLogoDimension:number = (this.dimensions.targetHeightUnits * 0.25)
        const w:number = targetLogoDimension*2
        const h:number = targetLogoDimension/2
        const yOffset:number = (h * 1.5)
        let logoGeo:THREE.PlaneGeometry = new THREE.PlaneGeometry(w, h)
        //let logoLeftMat = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
        let logoTopMat = this.getLogoMaterial('jpg/enso_top_v.jpg', this.onMaterialsLoaded)
        let logoTopMesh = new THREE.Mesh( logoGeo, logoTopMat);
        logoTopMesh.position.set(0,-yOffset,0.001)
        topPanel.add(logoTopMesh)
        let logoBottomMat = this.getLogoMaterial('jpg/enso_bottom_v.jpg', this.onMaterialsLoaded)
        let logoBottomMesh = new THREE.Mesh( logoGeo, logoBottomMat);
        logoBottomMesh.position.set(0,yOffset,0.001)
        bottomPanel.add(logoBottomMesh)
        return [ topPanel, bottomPanel ]
    }
    buildHorizontalPanels = (scene:THREE.Scene) => {
        const lineParams:any = { color: 0x888888 }
        const panelWidth:number = (this.dimensions.targetWidthUnits/4)
        const panelHeight:number = this.dimensions.targetHeightUnits
        const panelGeometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0001)
        const matsRight = this.getPanelMatsHorizontal('right', this.onMaterialsLoaded)
        let meshRight = new THREE.Mesh( panelGeometry, matsRight);
        meshRight.castShadow = true;
        meshRight.receiveShadow = true;
        let rightPanel = new THREE.Group();

        const edges = new THREE.EdgesGeometry( panelGeometry );
        const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( lineParams ) );
        line.position.set(-.125 * this.dimensions.targetWidthUnits, 0, 0)
        rightPanel.add( line );


        rightPanel.add(meshRight)
        scene.add(rightPanel)
        meshRight.position.set(-.125 * this.dimensions.targetWidthUnits, 0, 0)
        rightPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        rightPanel.position.set(0.25 * this.dimensions.targetWidthUnits, 0, 0)

        const matsLeft = this.getPanelMatsHorizontal('left', this.onMaterialsLoaded)
        let meshLeft = new THREE.Mesh( panelGeometry, matsLeft);
        meshLeft.castShadow = true;
        meshLeft.receiveShadow = true;
        let leftPanel = new THREE.Group();
        leftPanel.add(meshLeft)
        scene.add(leftPanel)

        const edgesLeft = new THREE.EdgesGeometry( panelGeometry );
        const lineLeft = new THREE.LineSegments( edgesLeft, new THREE.LineBasicMaterial( lineParams ) );
        lineLeft.position.set(.125 * this.dimensions.targetWidthUnits, 0, 0)
        leftPanel.add( lineLeft );

        meshLeft.position.set(0.125 * this.dimensions.targetWidthUnits, 0, 0)
        leftPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        leftPanel.position.set(-0.25 * this.dimensions.targetWidthUnits, 0, 0)

        //  create a mesh 
  
        let targetLogoDimension:number = (this.dimensions.targetWidthUnits * 0.25)
        const width:number = targetLogoDimension/1
        const height:number = width * 2.6
        const xOffset:number = (targetLogoDimension * .75)/1.5
        const yOffset:number = targetLogoDimension * 0.4
        let logoGeo:THREE.PlaneGeometry = new THREE.PlaneGeometry(width, height)
        let logoLeftMat = this.getLogoMaterial('jpg/enso_title_left.jpg', this.onMaterialsLoaded)
        let logoLeftMesh = new THREE.Mesh( logoGeo, logoLeftMat);
        logoLeftMesh.position.set(xOffset,yOffset,0.001)
        leftPanel.add(logoLeftMesh)

        let logoRightMat = this.getLogoMaterial('jpg/enso_title_right.jpg', this.onMaterialsLoaded)
        let logoRightMesh = new THREE.Mesh( logoGeo, logoRightMat);
        logoRightMesh.position.set(-xOffset,yOffset,0.001)
        rightPanel.add(logoRightMesh)


        return [ leftPanel, rightPanel ]
    }
    buildPanels = () => {
        if(this.dimensions.isHorizontal){
            return this.buildHorizontalPanels(this.elements.scene)
        }
        else{
            return this.buildVerticalPanels(this.elements.scene)
        }
    }
    getLogoMaterial = (logoURL:string, callback:Function) => {
        const onCoverLoaded = function(){
            callback()
        }
        const loader = new THREE.TextureLoader();
        const logoLeftMaterial = new THREE.MeshPhongMaterial({ flatShading:true, map:loader.load(logoURL, onCoverLoaded)})
        return logoLeftMaterial
    }
    getPanelMats = (insideCoverURL:string, outsideCoverURL:string, callback:Function) => {
        const loader = new THREE.TextureLoader();
        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
        });
        const onMaterialLoaded = function(){
            callback()
        }
        const sky = new THREE.MeshPhongMaterial({ flatShading:true, map: loader.load(insideCoverURL, onMaterialLoaded)})
/*         const onCoverLoaded = function(){
            callback()
        } */
/*         const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
            map: loader.load(outsideCoverURL, onCoverLoaded)
        });  */   
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
    buildCenter = () => {
        return (this.dimensions.isHorizontal) ? this.buildHorizontalCenter(this.elements.scene):this.buildVerticalCenter(this.elements.scene)
    }
    buildVerticalCenter = (scene:THREE.Scene) => {
        const centerWidth:number = this.dimensions.targetWidthUnits
        const centerHeight:number = this.dimensions.targetHeightUnits/2
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
    } 
    buildHorizontalCenter = (scene:THREE.Scene) => {
        const centerWidth:number = this.dimensions.targetWidthUnits/2
        const centerHeight:number = this.dimensions.targetHeightUnits
        var geometry = new THREE.PlaneGeometry( centerWidth, centerHeight, 100, 100 );
        const loader = new THREE.TextureLoader()
        let texture = loader.load('jpg/sky2.jpg')
        const materialInside = new THREE.MeshBasicMaterial({map: texture});
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
    }

    buildFullScene(){
        this.reset()
        this.buildCamera()
        this.setScene()
        this.buildRenderer()
        this.buildLighting()
        this.buildCenter()
        const [aPanel, bPanel] = this.buildPanels()
        this.alphaPanel = aPanel
        this.betaPanel = bPanel
    }
}