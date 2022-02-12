import { Component, useEffect } from "react"
import { gsap } from "gsap"
import "../NeedleField/NeedleField.css"
export interface NeedleFieldProps{
    className:string,
    rows:number, 
    columns:number, 
    vspace:number, 
    hspace:number, 
    length:number, 
    width:number,
    magneticRange:number
}
export function NeedleField(props:NeedleFieldProps ){
    let lastAngle:number = 0
    let animationTimeline:gsap.core.Timeline
    let inRange:boolean = false
    const w:number = (props.columns * props.hspace) + props.length
    const h:number = (props.rows * props.vspace) + props.length
    const makeNewTimeline = function(){
        if(animationTimeline){
          animationTimeline.kill()
        }
        animationTimeline = gsap.timeline({
          autoRemoveChildren:true, 
          paused:true,  
          smoothChildTiming:true
        })
    }

    const isInRange = function(e:MouseEvent){
        let needlesGroup:HTMLElement | null = document.getElementById('needles-group')
        if(!needlesGroup){ return false }
        let groupRect = needlesGroup.getBoundingClientRect()
        let refX = groupRect.x + w/2
        let refY = groupRect.y - h/2
        const deltaX:number = e.x - refX
        const deltaY:number = e.y - refY
        let fieldDistanceToMouse:number = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) )
        return (fieldDistanceToMouse < props.magneticRange)
    }

    const moveNeedles = function(mouseX:number, mouseY:number){
        makeNewTimeline()
        let needles:HTMLCollectionOf<Element> | null = document.getElementsByClassName('needle')
        for(let i = 0; i < needles.length; i++){
            let needle:Element | null = needles.item(i)
            if(needle){
                let localRect:DOMRect = needle.getBoundingClientRect()
                const localDeltaX:number = mouseX - localRect.x
                const localDeltaY:number = mouseY - localRect.y
                let localDistanceToMouse:number = Math.sqrt( (localDeltaX * localDeltaX) + (localDeltaY * localDeltaY) )
                let angle = Math.floor(Math.atan2(localDeltaY, localDeltaX) * (180 / Math.PI));
                if( Math.abs(lastAngle - angle) > 5  && Math.abs(lastAngle - angle) < 135 && localDistanceToMouse > w){
                    let t:gsap.core.Tween = gsap.to(needle, {transformOrigin:"center", rotation:angle, duration:0.4});
                    animationTimeline.add(t, 0)
                }
                else{
                    let t:gsap.core.Tween = gsap.set(needle, {transformOrigin:"center", rotation:angle});
                    animationTimeline.add(t, 0)
                }
            }
        }
        animationTimeline.restart()
    }
    const makeNeedles = function(){
        let needles:JSX.Element[] = []
        for(let i = 0; i < props.rows; i++){
            for(let j = 0; j < props.columns; j++){
                const x:number = j * props.hspace;
                const y:number = (i * props.vspace) + props.length/2;
                const translate:string = 'translate(' + x + ' ' + y + ')'
                const key:string = i + '-' + j
                let elm:JSX.Element = <g key={key} transform={translate}>
                                        <rect className="needle" width={props.length} height={props.width} />
                                    </g>
                needles.push(elm)
            }
        }
        return needles
    }
    const handleMouseMove = function(e:MouseEvent){
        if(isInRange(e)){
            moveNeedles(e.x, e.y)
        }
    }
    useEffect(
        ()=>{ 
            moveNeedles(300,500);
            return document.removeEventListener('mousemove', handleMouseMove)
        }
    )
    document.addEventListener('mousemove', handleMouseMove);
    return  <svg xmlns="http://www.w3.org/2000/svg"
                width={w}
                height={h}
                viewBox={'0 0 ' + w + ' ' + h}
                className={"needle-field " + props.className}>
                <g id="needles-group" className="needles">
                    {makeNeedles()}
                </g>    
            </svg>
}

export default NeedleField