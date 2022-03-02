import * as THREE from "three";
import { MeshStandardMaterial, TextureLoader, Vector2, Vector3 } from "three";

export class CardHelper{
    constructor(){}
    static scale:number = 1.3
    static bgImage:string = 'jpg/sky.jpg'
    static buildRenderer = () => {
        let renderer = new THREE.WebGLRenderer();
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setSize( window.innerWidth, window.innerHeight );
        return renderer
    }
    static buildCamera = () => {
        let camera = new THREE.PerspectiveCamera(14, window.innerWidth/window.innerHeight, 1, 1000 );
        camera.position.set(0, 0, 12)
        camera.lookAt(0,0,0)
        camera.updateProjectionMatrix()
        return camera
    }
    static buildLighting = (scene:THREE.Scene) => {
        const lightIntensity:number = 0.1
        let lightBlue = new THREE.DirectionalLight(0x444444, lightIntensity);
        lightBlue.castShadow = true;
        lightBlue.position.set(0, 0.25, 2);
        scene.add(lightBlue);
        let lowBlue = new THREE.DirectionalLight(0x444444, lightIntensity);
        lowBlue.castShadow = true;
        lowBlue.position.set(-0.2, -0.2, 2);
        scene.add(lowBlue);
        const lightH = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
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
    static createMaterial = function(orientation:string, final:boolean = false) {
        const loader = new THREE.TextureLoader();
        const url = (orientation === 'right') ? 'jpg/sky3.jpg': 'jpg/sky1.jpg'
        let texture = loader.load(url)
        const basicMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side:THREE.FrontSide
          });
        const phongMaterial = new THREE.MeshPhongMaterial({
            map: texture,
            side:THREE.FrontSide
          });
        return (final) ? basicMaterial : phongMaterial
    }
    static buildFlap = (scene:THREE.Scene, orientation:string) => {
        const cardWidth:number = CardHelper.scale
        const cardHeight:number = CardHelper.scale
        var geometry = new THREE.PlaneGeometry( cardWidth/2, cardWidth, 500, 500 );
        let materialOutside = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            specular: 0xffffff,
            shininess: 0,
            flatShading:false,
            side:THREE.BackSide
        });
        let outside = new THREE.Mesh( geometry, materialOutside);
        let inside = new THREE.Mesh( geometry, CardHelper.createMaterial(orientation) );
        let parent = new THREE.Group();
        outside.castShadow = true;
        outside.receiveShadow = true;
        inside.castShadow = true;
        inside.receiveShadow = true;
        parent.add(inside);
        parent.add(outside);
        scene.add(parent)
        const factor:number = 4 * ((orientation === 'left') ? -1 : 1)
        inside.position.set(cardWidth/factor,0,0);
        outside.position.set(cardWidth/factor,0,0);
        const x:number = (orientation === 'right') ? cardWidth/2 : (cardWidth/-2)
        parent.position.setX(x)
        parent.position.setZ(0)
        parent.rotateY(Math.PI * -1);
        return parent
    }
    static buildCenter = (scene:THREE.Scene) => {
        const cardWidth:number = CardHelper.scale + 0.00122
        const cardHeight:number = CardHelper.scale
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
    static buildRightSide = (scene:THREE.Scene) => {
        return CardHelper.buildFlap(scene, 'right')
    }
    static buildLeftSide = (scene:THREE.Scene) => {
        return CardHelper.buildFlap(scene, 'left')
    }
    static updateRightPage = function(scene:THREE.Scene, angle:number){
    // parent.rotateY(THREE.MathUtils.degToRad(-145));
    }

}