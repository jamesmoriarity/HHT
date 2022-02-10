import { useEffect } from "react";
import { Scene } from "three";
import {gsap} from "gsap"
export function Tester(){
    // let x = new Scene()
    let backX = 0
    let middleX = 0
    let frontX = 0
    let animationTimeline:gsap.core.Timeline
    let lastX = 0
    let lastY = 0
    let lastAngle = 0
    document.addEventListener('mousemove', (e:MouseEvent) => {
        let xDiff:number = Math.abs(lastX - e.x)
        let yDiff:number = Math.abs(lastY - e.y)
        let needles:HTMLCollectionOf<Element> | null = document.getElementsByClassName('needle')
        for(let i = 0; i < needles.length; i++){
            let needle:Element | null = needles.item(i)
            if(needle){
                let rect:DOMRect | undefined = needle?.getBoundingClientRect()
                if(rect === undefined || needle === null){
                    console.log('reject')
                    return
                }
                const deltaX:number = e.x - rect.x
                const deltaY:number = e.y - rect.y
                let angle = Math.floor(Math.atan2(deltaY, deltaX) * (180 / Math.PI));
                gsap.set(needle, {transformOrigin:"center", rotation:angle});
                if(i === 0){
                    //console.log('angle', angle)
                }
            }
        }
      });
    const moveTo = function(direction:number){
        if(animationTimeline){
            animationTimeline.kill()
        }
        animationTimeline = gsap.timeline({
            autoRemoveChildren:true, 
            paused:true,  
            smoothChildTiming:true
        })
        backX += direction * 10
        middleX += direction * 26.2
        frontX += direction * 40
        const dur:number = 3.5
        const backAnimation:gsap.core.Tween = gsap.to(".back", {x:backX, ease:"sine.out", duration:dur})
        const middleAnimation:gsap.core.Tween = gsap.to(".middle", {x:middleX, ease:"sine.out", duration:dur})
        const frontAnimation:gsap.core.Tween = gsap.to(".front", {x:frontX, ease:"sine.out", duration:dur})
        animationTimeline.add(backAnimation, 0)
        animationTimeline.add(middleAnimation, 0)
        animationTimeline.add(frontAnimation, 0)
        animationTimeline.restart()
    }
    const goLeft = function(evt:any){
        moveTo(5)
    }
    const getRight = function(evt:any){
        moveTo(-5)
    }
    const makeNeedles = function(){
        let needles:JSX.Element[] = []
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++){
                const x:number = i * 14;
                const y:number = j * 14;
                const translate:string = 'translate(' + x + ' ' + y + ') rotate(-30)'
                const key:string = i + '-' + j
                let elm:JSX.Element = <g key={key} transform={translate}><rect className="needle" width="10px" height="1px" /></g>
                needles.push(elm)
            }
        }
        return needles
    }
    return <div className="sky">
                <div><span onClick={goLeft}>left</span> | <span onClick={getRight}>right</span></div>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="500px"
                    height="400px"
                    viewBox="0 0 250 200"
                    className="needle-field">
                    <g className="needles">
                        {makeNeedles()}
                    </g>    
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"
                    width="400px"
                    height="240px"
                    viewBox="0 0 200 120"
                    className="landscape">
                    <g className="back">
                        <path className="firstHill"
                            d="M 66.787836,12.029785 C 76.244756,2.9002912 99.088416,3.4303412 99.088416,3.4303412 119.7714,14.113585 109.17232,18.963215 139.17885,21.555355 c 55.47981,4.79269 62.23454,27.12497 62.00653,40.48552 0,0 -164.164504,-19.95786 -175.590444,-3.26557"
                            id="path2115"
                            />
                    </g>
                    <g className="middle">
                        <path className="firstHill"
                            d="M 0.87294,53.906232 C 0.70815,23.266212 31.60329,3.6420019 31.60329,3.6420019 c 34.04646,5.48776 21.76286,28.6156701 51.8503,26.4326901 59.83523,-4.34131 94.07889,25.2476 94.07889,25.2476 L 0.87294,53.906232"
                            id="path2115-0"
                        />
                    </g>
                    <g className="front">
                        <path className="secondHill"
                            d="M 2.3848448,59.953921 C 24.629368,41.499041 69.877146,29.519381 69.877146,29.519381 c 30.03285,3.13006 0.8341,17.12424 32.518124,15.6543 63.01034,-2.92328 75.61344,14.72287 75.61344,14.72287 l -175.6238652,0.0573"
                            id="path2115-0-7"
                        />
                        <path className="firstHill"
                            d="M 2.3848448,59.953921 C 24.629368,41.499041 69.877146,29.519381 69.877146,29.519381 c 30.03285,3.13006 0.8341,17.12424 32.518124,15.6543 63.01034,-2.92328 75.61344,14.72287 75.61344,14.72287 l -175.6238652,0.0573"
                            id="path2115-0-7"
                        />
                    </g>   
                </svg>
            </div>
}