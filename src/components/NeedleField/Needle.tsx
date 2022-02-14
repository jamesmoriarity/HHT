import { useEffect, useRef} from "react";
import { gsap } from "gsap"

export interface NeedleProps{
    translate:string,
    length:number,
    width:number,
    initAngle:number,
    magneticRange:number
}
export function Needle(props:NeedleProps){
    let animationTimeline:gsap.core.Timeline
    let rectRef = useRef<SVGRectElement>(null)
    let currentAngle = props.initAngle
    useEffect(
        ()=>{
            rotate(currentAngle)
            document.addEventListener('mousemove', handleMouseMove)
            return () => { document.removeEventListener('mousemove', handleMouseMove) }
        }
    )
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
    const rotate = function(angle:number){
        let tween:gsap.core.Tween = gsap.to(rectRef.current, {transformOrigin:"center", duration:0.5, opacity:1, rotation:angle});   
        doRotation(tween, angle)
    }
    const doRotation = function(tween:gsap.core.Tween, angle:number){
        makeNewTimeline()
        animationTimeline.add(tween,0)
        animationTimeline.restart()
        currentAngle = angle
    }
    const getDeltas = function(e:MouseEvent):number[]{
        if(!rectRef.current){ return [0,0] }
        let localRect:DOMRect = rectRef.current.getBoundingClientRect()
        const x:number = e.x - localRect.x
        const y:number = e.y - localRect.y
        return [x , y]
    }
    const getAngle = function(e:MouseEvent){
        const [localDeltaX, localDeltaY] = getDeltas(e)
        let angle:number = Math.floor(Math.atan2(localDeltaY, localDeltaX) * (180 / Math.PI));
        let angleDelta:number = angle - currentAngle
        if(Math.abs(angleDelta) > 180){ 
            let adjustment:number = 360 * ((angleDelta > 0) ? -1 : 1)
            angle += adjustment
        }
        return angle
    }
    const isInRange = function(e:MouseEvent){
        let needlesGroup:HTMLElement | null = document.getElementById('needles-group')
        if(!needlesGroup){ return false }
        let groupRect = needlesGroup.getBoundingClientRect()
        let w:number = groupRect.right - groupRect.left
        let h:number = groupRect.right - groupRect.left
        let refX = groupRect.x + w/2
        let refY = groupRect.y - h/2
        const deltaX:number = e.x - refX
        const deltaY:number = e.y - refY
        let fieldDistanceToMouse:number = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) )
        let radius:number = Math.sqrt( (w * w) + (h * h) ) 
        return (fieldDistanceToMouse < props.magneticRange + radius)
    }
    const handleMouseMove = function(e:MouseEvent){
        if(isInRange(e)){
            rotate(getAngle(e))
        }
    }
    return  <g transform={props.translate}>
                <rect ref={rectRef} className="needle" width={props.length} height={props.width} />
            </g>
}