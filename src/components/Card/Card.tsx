import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Card.css"
import { CardHelper } from "./CardHelper";
import { gsap } from "gsap"
import { flattenDiagnosticMessageText } from "typescript";

export function Card(props:any){
    const onOpenComplete = function(){
        // setTimeout(fadeOut, 1000)
    }
    const openCard = function(){
        console.log('openCard')
        renderScene()
        animationTimeline?.restart()
    }
    const closeCard = function(){
        animationTimeline.reverse()
    }
    let panelsLoaded:number = 0
    const onMaterialsLoaded = function(){
        panelsLoaded++
        console.log('onMaterialsLoaded')
        if(panelsLoaded === 2){
            renderScene()
            setTimeout(()=>{fadeIn()}, 2000)
        }
    }
    const buildScene = function(){
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        scene.add(camera)
        CardHelper.buildLighting(scene)
        CardHelper.buildBackground(scene)
        CardHelper.buildCenter(scene)
        const [lPanel, rPanel] = CardHelper.buildPanels(scene, onMaterialsLoaded)
        leftPanel = lPanel
        rightPanel = rPanel
    }
    const renderScene = function(){
        while(mount && mount.childElementCount > 0){
            mount.removeChild(mount.firstChild)
        }
        mount.appendChild( renderer.domElement );
        renderer.render( scene, camera );
    }
    const buildAndRender = function(){
        buildScene()
        renderScene()
    }
    const onFadeComplete = function(){
        console.log('onFadeComplete')
        renderScene()
        setTimeout(openCard, 2000)
    }
    const fadeIn = function(){
        let target = "#cardContainerInner"
        let fade = gsap.to(target, 
            {opacity:1, duration:1, delay:0, ease:"power2.out"}
        )
        let fadeTimeline = gsap.timeline({
            autoRemoveChildren:false, 
            paused:true, 
            smoothChildTiming:true, 
            onComplete: onFadeComplete
        })
        fadeTimeline.add(fade)
        fadeTimeline.restart()
    }
    const fadeOut = function(){
        let target = "#cardContainer"
        let fadeTween = gsap.to(target, 
            {opacity:0, duration:3, delay:0, ease:"power2.out", onUpdate:()=>{
                
            }}
        )     
    }
    const onUseEffect = function(){
        buildScene()
        renderScene()
        // setTimeout(()=>{openCard()}, 3000)
    }
    useEffect(onUseEffect)
    let cardOpen = false
    
    const onClickHandler = function(){
        return
        if(cardOpen){
            cardOpen = false
            closeCard()
            return
        }
        cardOpen = true
        //openCard();
    }
    let scene:THREE.Scene = new THREE.Scene();
    let gltf:any;
    let mount:any;
    let containerRef = useRef(null)
    let renderer:THREE.WebGLRenderer = CardHelper.buildRenderer()
    let camera:THREE.PerspectiveCamera = CardHelper.buildCamera()
    let leftPanel:THREE.Group = new THREE.Group()
    let rightPanel:THREE.Group = new THREE.Group()

    let originalVals = {rads: -3.1415}
    let lastRads = originalVals.rads
    let animationTimeline = gsap.timeline({
        autoRemoveChildren:false, 
        paused:true, 
        smoothChildTiming:true, 
        onComplete: onOpenComplete
    })
    let targetVals = {
        rads: 0,
        onUpdate:()=>{
            let delta:number = originalVals.rads - lastRads
            lastRads = originalVals.rads
            leftPanel.rotateY(delta * -1)
            rightPanel?.rotateY(delta)
            renderScene()
        },
        ease:'sine.inOut',
        duration: 1.6
    }
    let angleTween = gsap.to(originalVals, targetVals)
    let zoomTween = gsap.to(camera.position, {z:8, duration:1.5, ease:"sine.inOut", onUpdate:()=>{
        renderScene()
    }},)
    const xOffset = 0.0025
    const xLeftStart = CardHelper.scale/-2
    const xLeftEnd = xLeftStart + xOffset
    const xRightStart = CardHelper.scale/2
    const xRightEnd = xRightStart - xOffset
    let beginPanelX = {leftX:xLeftStart, rightX:xRightStart}
    let targetPanelX = {
        leftX:xLeftEnd, 
        rightX:xRightEnd,
        duration:0.15,
        onUpdate:()=>{
            leftPanel.position.setX(beginPanelX.leftX)
            rightPanel.position.setX(beginPanelX.rightX)
            renderScene()
        },}
    let panelSqueeze = gsap.to(beginPanelX, targetPanelX)
    animationTimeline.add(angleTween, 0)
    animationTimeline.add(panelSqueeze, 1.3)
    animationTimeline.add(zoomTween, 2)

    return (
        <div ref={containerRef} id="cardContainer" onClick={(e)=>{onClickHandler()}}>
            <div id="cardContainerInner" ref={ref => (mount = ref)} />
        </div>
    )
}