import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./Page.css"
export interface PageProps{
    children:JSX.Element,
    id:string
}
export default function Page({ children, id }: PageProps){

    let ref = useRef(null) 
    let tween:gsap.core.Tween 
    const onDone = function(){
    }
    const animateIn = function(){
        tween = gsap.fromTo('#' + id, {opacity:0, scale:.9}, {opacity:1, scale:1, duration:1, ease:'circ', onComplete:onDone, delay:1})
    }
    const animateOut = function(){
        tween.kill()
    }
    useEffect(
        ()=>{
            animateIn();
            return animateOut
        } 
    )
    return <div id={id} className="page" ref={ref}>{children}</div>
}