import { CardBuilderElements } from "./CardBuilderElements";
import * as THREE from "three";
import { CardDimensions } from "./CardDimensions";
import { CardMaterialsLoader } from "./CardMaterialsLoader";
import { CardMaterials } from "./CardMaterials";
import { Texture } from "three";
import { SVGUtils } from "./SVGUtils";

export class CardBuilder{
    elements:CardBuilderElements
    onBuildCompleteCallback:Function
    alphaPanel:THREE.Group = new THREE.Group()
    betaPanel:THREE.Group = new THREE.Group()
    panelsLoaded:number
    dimensions:CardDimensions
    renderMethod:Function
    materials:CardMaterials
    constructor(onBuildCompleteCallback:Function, renderMethod:Function){
        this.onBuildCompleteCallback = onBuildCompleteCallback
        this.renderMethod = renderMethod
        this.panelsLoaded = 0
        this.dimensions = new CardDimensions()
        this.elements = this.getElements()
        this.materials = new CardMaterials()
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
        // this.elements.scene.background = new THREE.Color( 0xdedede );
        this.elements.scene.add(this.elements.camera)
    }
    buildVerticalPanels = (scene:THREE.Scene) => {
        const panelWidth:number = this.dimensions.targetWidthUnits
        const panelHeight:number = this.dimensions.targetHeightUnits/4
        const geometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0001)
        const [matsTop, matsBottom] = this.buildPanelMaterials()
        let meshBottom = new THREE.Mesh( geometry, matsBottom);
        meshBottom.castShadow = true;
        meshBottom.receiveShadow = true;
        let bottomPanel = new THREE.Group();
        bottomPanel.add(meshBottom)
        scene.add(bottomPanel)
        meshBottom.position.set(0, .125 * this.dimensions.targetHeightUnits, 0)
        bottomPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        bottomPanel.position.set(0, -0.25 * this.dimensions.targetHeightUnits, 0)
        let meshTop = new THREE.Mesh( geometry, matsTop);
        meshTop.castShadow = true;
        meshTop.receiveShadow = true;
        let topPanel = new THREE.Group();
        topPanel.add(meshTop)
        scene.add(topPanel)
        meshTop.position.set(0, -0.125 * this.dimensions.targetHeightUnits, 0)
        topPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        topPanel.position.set(0, 0.25 * this.dimensions.targetHeightUnits, 0)
        
        const logoAspectRatio:number = 2
        const h:number = panelHeight * 0.9
        const w:number = h * 2 * logoAspectRatio
        const yOffset:number = ((panelHeight - h)/2) + panelHeight/2
        let logoGeo:THREE.PlaneGeometry = new THREE.PlaneGeometry(w, h)
        let logoTopTexture = this.materials.alphaLogo
        let logoTopMaterial = new THREE.MeshLambertMaterial({ map : logoTopTexture });
        let logoTopMesh = new THREE.Mesh( logoGeo, logoTopMaterial);
        topPanel.add(logoTopMesh)
        logoTopMesh.position.set(0,-yOffset, 0.001)
        let logoBottomTexture = this.materials.betaLogo
        let logoBottomMaterial = new THREE.MeshLambertMaterial({ map : logoBottomTexture });
        let logoBottomMesh = new THREE.Mesh( logoGeo, logoBottomMaterial);
        logoBottomMesh.position.set(0,yOffset,0.001)
        bottomPanel.add(logoBottomMesh)
        
        return [ topPanel, bottomPanel ]
    } 
    buildHorizontalPanels = (scene:THREE.Scene) => {
        console.log('CardBuilder.buildHorizontalPanels')
        const lineParams:any = { color: 0x888888 }
        const panelWidth:number = (this.dimensions.targetWidthUnits/4)
        const panelHeight:number = this.dimensions.targetHeightUnits
        const panelGeometry = new THREE.BoxGeometry(panelWidth, panelHeight, 0.0019)
        const [matsAlpha, matsBeta] = this.buildPanelMaterials()
        let meshRight = new THREE.Mesh( panelGeometry, matsBeta);
        meshRight.castShadow = true;
        meshRight.receiveShadow = true;
        let rightPanel = new THREE.Group();

        rightPanel.add(meshRight)
        scene.add(rightPanel)
        meshRight.position.set(-.125 * this.dimensions.targetWidthUnits, 0, 0)
        rightPanel.rotation.set(0, 0, 0) // right goes from 0 to 3.14 to open
        rightPanel.position.set(0.25 * this.dimensions.targetWidthUnits, 0, 0)
        let meshLeft = new THREE.Mesh( panelGeometry, matsAlpha);
        meshLeft.castShadow = true;
        meshLeft.receiveShadow = true;
        let leftPanel = new THREE.Group();
        leftPanel.add(meshLeft)
        scene.add(leftPanel)

        meshLeft.position.set(0.125 * this.dimensions.targetWidthUnits, 0, 0)
        leftPanel.rotation.set(0, 0, 0) // left goes from 0 to -3.14 to open
        leftPanel.position.set(-0.25 * this.dimensions.targetWidthUnits, 0, 0)
  
        const logoAspectRatio:number = 2
        const logoWidthToPanelWidthRatio:number = .7
        const width:number = panelWidth * logoWidthToPanelWidthRatio
        const height:number = width * logoAspectRatio * 2
        const xOffset:number = (panelWidth - width) + (width * 0.5)
        const yOffset:number = (panelHeight - height)/8
        let logoGeo:THREE.PlaneGeometry = new THREE.PlaneGeometry(width, height)

        let logoLeftTexture = this.materials.alphaLogo
        let logoLeftMaterial = new THREE.MeshLambertMaterial({ map : logoLeftTexture });
        let logoLeftMesh = new THREE.Mesh(logoGeo, logoLeftMaterial);
        logoLeftMesh.position.set(xOffset,yOffset,0.001)
        leftPanel.add(logoLeftMesh)

        let logoRightTexture = this.materials.betaLogo
        let logoRightMaterial = new THREE.MeshLambertMaterial({ map : logoRightTexture });
        let logoRightMesh = new THREE.Mesh( logoGeo, logoRightMaterial);
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
    buildPanelMaterial = (insideTexture:Texture) => {
        const materialWhite = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 8,
            flatShading:true,
        });
        const materialGrey = new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            specular: 0xdddddd,
            shininess: 8,
            flatShading:true,
        });
        const materialDarkGrey = new THREE.MeshPhongMaterial({
            color: 0x333333,
            specular: 0x333333,
            shininess: 8,
            flatShading:true,
        });
        const insideMaterial = new THREE.MeshPhongMaterial({ flatShading:true, map: insideTexture })  
        const cubeMaterials = [
            materialWhite, //right side
            materialWhite, //left side
            materialWhite, //top side
            materialWhite, //bottom side
            materialWhite, //front side
            materialWhite, //back side
        ];
        return cubeMaterials
    }
    buildPanelMaterials = () => {
        console.log('this.materials', this.materials)
        const alphaMaterial = this.buildPanelMaterial(this.materials.alphaInside)
        const betaMaterial = this.buildPanelMaterial(this.materials.betaInside)
        return [alphaMaterial, betaMaterial]
    }
    buildCenter = () => {
        return
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
        var geometry = new THREE.PlaneGeometry( centerWidth, centerHeight, 1, 1 );
        const materialFront = new THREE.MeshPhongMaterial({
            color: 0xdddddd,
            specular: 0xdddddd,
            shininess: 8,
            flatShading:true,
            side:THREE.DoubleSide
        });
        let front = new THREE.Mesh( geometry, materialFront );
        let panelParent = new THREE.Group();

        let taglineGroup:THREE.Group = SVGUtils.svgToGroup(this.materials.centerTagline)
        let ogbbox = new THREE.Box3().setFromObject(taglineGroup);
        let ogWidth:number = ogbbox.max.x - ogbbox.min.x
        let newScale:number = (centerWidth/ogWidth) * 0.75
        taglineGroup.scale.set(newScale, newScale * 2, newScale)
        taglineGroup.rotation.x = Math.PI;
        panelParent.add(taglineGroup);
        let bbox = new THREE.Box3().setFromObject(taglineGroup);
        let gWidth:number = bbox.max.x - bbox.min.x
        let gHeight:number = bbox.max.y - bbox.min.y
        taglineGroup.position.set(gWidth/-2,gHeight/2,0.02)
        console.log(bbox)
        panelParent.add(front);
        scene.add(panelParent)
        panelParent.position.set(0,0,-0.01)
    }
    startBuild = () => {
        console.log('CardBuilder.startBuild')
        let materialsLoader:CardMaterialsLoader = new CardMaterialsLoader(this.dimensions.isHorizontal, this.onMaterialsLoaded)
        materialsLoader.load()
    }
    onMaterialsLoaded = (materials:CardMaterials) => {
        console.log('onMaterialsLoaded', materials)
        this.materials = materials
        this.buildFullScene()
    }
    onFullSceneBuilt = () => {
        console.log('onFullSceneBuilt')
        this.renderMethod()
        setTimeout(()=>{this.onBuildCompleteCallback()}, 2000)
    }
    buildFullScene(){
        console.log('CardBuilder.buildFullScene')
        this.reset()
        this.buildCamera()
         this.setScene()
        this.buildRenderer()
        this.buildLighting()
        this.buildCenter()
        const [aPanel, bPanel] = this.buildPanels()
        this.alphaPanel = aPanel
        this.betaPanel = bPanel
        this.onFullSceneBuilt()
    }
}