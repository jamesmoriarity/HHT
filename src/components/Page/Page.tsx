import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import "./Page.css"
export interface PageProps{
    children:JSX.Element,
    id:string
}
export default function Page({ children, id }: PageProps){
    let ref = useRef(null)
    const onDone = function(){
        console.log('onDone')
    }
    const animateIn = function(){
        gsap.to('#' + id, {opacity:1, duration:1, ease:'circ', onComplete:onDone, delay:1})
    }
    const animateOut = function(){
        gsap.to('#' + id, {opacity:0, duration:1, ease:'circ', onComplete:onDone})
    }
    useEffect(
        ()=>{
            animateIn();
            return animateOut
        },[] 
    )
    return <div id={id} className="page" ref={ref}>{children}</div>
}