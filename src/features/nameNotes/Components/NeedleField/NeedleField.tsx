import { Component, useEffect } from "react"
import { gsap } from "gsap"
import "./NeedleField.css"
export interface NeedleFieldProps{
    className:string
    svgWidth:number,
    svgHeight:number,
    viewBox:string
    rows:number, 
    columns:number, 
    vspace:number, 
    hspace:number, 
    length:number, 
    width:number,
    magneticRange:number
}
export function NeedleField(props:NeedleFieldProps ){
    const moveNeedles = function(mouseX:number, mouseY:number){
        let needles:HTMLCollectionOf<Element> | null = document.getElementsByClassName('needle')
        for(let i = 0; i < needles.length; i++){
            let needle:Element | null = needles.item(i)
            if(needle){
                let rect:DOMRect | undefined = needle?.getBoundingClientRect()
                if(rect === undefined || needle === null){
                    console.log('reject')
                    return
                }
                const deltaX:number = mouseX - rect.x
                const deltaY:number = mouseY - rect.y
                let distanceToMouse:number = Math.sqrt( (deltaX * deltaX) + (deltaY * deltaY) )
                if(distanceToMouse < props.magneticRange){
                    let angle = Math.floor(Math.atan2(deltaY, deltaX) * (180 / Math.PI));
                    gsap.set(needle, {transformOrigin:"center", rotation:angle});
                }

            }
        }
    }
    const makeNeedles = function(){
        let needles:JSX.Element[] = []
        for(let i = 0; i < props.rows; i++){
            for(let j = 0; j < props.columns; j++){
                const x:number = i * props.hspace;
                const y:number = j * props.vspace;
                const translate:string = 'translate(' + x + ' ' + y + ')'
                const key:string = i + '-' + j
                let elm:JSX.Element = <g key={key} transform={translate}><rect className="needle" width={props.length} height={props.width} /></g>
                needles.push(elm)
            }
        }
        return needles
    }
    useEffect(()=>{ moveNeedles(300,500);})
    document.addEventListener('mousemove', (e:MouseEvent) => {moveNeedles(e.x, e.y)});
    return  <svg xmlns="http://www.w3.org/2000/svg"
                width={props.svgWidth}
                height={props.svgHeight}
                viewBox={props.viewBox}
                className={"needle-field " + props.className}>
                <g className="needles">
                    {makeNeedles()}
                </g>    
            </svg>
}

export default NeedleField