import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Card.css"
import { CardHelper } from "./CardHelper";
import { gsap } from "gsap"
import { flattenDiagnosticMessageText } from "typescript";

export function Card(props:any){
    let cardHelper:CardHelper = new CardHelper()
    const onOpenComplete = function(){
        // setTimeout(fadeOut, 1000)
    }
    const openCard = function(){
        console.log('openCard')
        return
        renderScene()
        animationTimeline?.restart()
    }
    const closeCard = function(){
        animationTimeline.reverse()
    }
    let panelsLoaded:number = 0
    const onMaterialsLoaded = function(){
        panelsLoaded++
        const targetLoads:number = (cardHelper.isHorizontal) ? 4 : 4
        console.log('onMaterialsLoaded')
        if(panelsLoaded === targetLoads){
            renderScene()
            setTimeout(()=>{fadeIn()}, 2000)
        }
    }

    let alphaPanel:THREE.Group = new THREE.Group()
    let betaPanel:THREE.Group = new THREE.Group()
    const buildScene = function(){
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        scene.add(camera)
        cardHelper.buildLighting(scene)
        cardHelper.buildBackground(scene)
        cardHelper.buildCenter(scene)
        const [aPanel, bPanel] = cardHelper.buildPanels(scene, onMaterialsLoaded)
        alphaPanel = aPanel
        betaPanel = bPanel
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
        setTimeout(openCard, 1000)
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
    let renderer:THREE.WebGLRenderer = cardHelper.buildRenderer()
    let camera:THREE.PerspectiveCamera = cardHelper.buildCamera()

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
            if(cardHelper.isHorizontal){
                alphaPanel.rotateY(delta * -1)
                betaPanel?.rotateY(delta)
            }
            else{
                alphaPanel.rotateX(delta * -1)
                betaPanel?.rotateX(delta)
            }
            renderScene()
        },
        ease:'sine.inOut',
        duration: 1.6
    }
    let angleTween = gsap.to(originalVals, targetVals)
    animationTimeline.add(angleTween, 0)
/*     let zoomTween = gsap.to(camera.position, {z:7.9, duration:1.5, ease:"sine.inOut", onUpdate:()=>{
        renderScene()
    }},)
    animationTimeline.add(zoomTween, .75) */

    return (
        <div ref={containerRef} id="cardContainer" onClick={(e)=>{onClickHandler()}}>
            <div id="cardContainerInner" ref={ref => (mount = ref)} />
        </div>
    )
}