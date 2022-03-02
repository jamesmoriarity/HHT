import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Card.css"
import { CardHelper } from "./CardHelper";
import { gsap } from "gsap"
import { flattenDiagnosticMessageText } from "typescript";

export function Card(props:any){
    let scene:THREE.Scene = new THREE.Scene();
    let gltf:any;
    let mount:any;
    let containerRef = useRef(null)
    let renderer:THREE.WebGLRenderer = CardHelper.buildRenderer()
    let camera:THREE.PerspectiveCamera = CardHelper.buildCamera()
    let rightSide:THREE.Group = new THREE.Group()
    let leftSide:THREE.Group = new THREE.Group()
    let originalVals = {rads: -1 * Math.PI}
    let lastRads = originalVals.rads
    let targetVals = {
        rads: 0,
        onUpdate:()=>{
            let delta:number = originalVals.rads - lastRads
            lastRads = originalVals.rads
            rightSide.rotateY(delta)
            leftSide.rotateY(delta * -1)
            renderScene()
        },
        ease:'sine.inOut',
        duration: 1.6
    }
    let angleTween = gsap.to(originalVals, targetVals)
    let scaleTween = gsap.to(camera.position, {z:5, duration:1, ease:"sine.inOut", onUpdate:()=>{
        renderScene()
    }},)
    const onOpenComplete = function(){
        fadeOut()
    }
    let animationTimeline = gsap.timeline({
        autoRemoveChildren:false, 
        paused:true, 
        smoothChildTiming:true, 
        onComplete: onOpenComplete
    })

    animationTimeline.add(angleTween, 0)
    animationTimeline.add(scaleTween, 0.65)

    const openCard = function(){
        animationTimeline?.kill()
        animationTimeline?.restart()
    }
    const closeCard = function(){
        console.log('closeCard')
        animationTimeline.reverse()
    }
    
    const buildScene = function(){
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcccccc );
        scene.add(camera)
        CardHelper.buildLighting(scene)
        CardHelper.buildBackground(scene)
        CardHelper.buildCenter(scene)
        rightSide = CardHelper.buildRightSide(scene)
        leftSide = CardHelper.buildLeftSide(scene)
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
    const fadeIn = function(){
        console.log('fade in')
        let target = "#cardContainerInner"
        console.log('target', target)
        let fadeTween = gsap.to(target, 
            {opacity:1, duration:8, delay:1, ease:"power2.out", onUpdate:()=>{
                
            }}
        )
        console.log(fadeTween)
    }

    const fadeOut = function(){
        console.log('fade out')
        let target = "#cardContainer"
        console.log('target', target)
        let fadeTween = gsap.to(target, 
            {opacity:0, duration:3, delay:0, ease:"power2.out", onUpdate:()=>{
                
            }}
        )     
    }
    useEffect(()=>{
        buildScene()
        renderScene()
        fadeIn()
        setTimeout(()=>{openCard()}, 4000)
    },[])
    let cardOpen = false
    const onClickHandler = function(){
        if(cardOpen){
            cardOpen = false
            closeCard()
            return
        }
        cardOpen = true
        openCard();
    }
    return (
        <div ref={containerRef} id="cardContainer" onClick={(e)=>{onClickHandler()}}>
            <div id="cardContainerInner" ref={ref => (mount = ref)} />
        </div>
    )
}