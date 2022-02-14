import { Component, useEffect, useState } from "react"
import { gsap } from "gsap"
import "../NeedleField/NeedleField.css"
import { Needle } from "./Needle"
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
export function NeedleField( props:NeedleFieldProps ){
    const [magneticRange, setMagneticRange] = useState(props.magneticRange)
    const [length, setLength] = useState(props.length)
    const [width, setWidth] = useState(props.width)
    let w:number = (props.columns * props.hspace) + props.length
    let h:number = (props.rows * props.vspace) + props.length
    const restart = function(){
        setMagneticRange(props.magneticRange)
        setLength(props.length)
        setWidth(props.width)
    }
    const Needles = function(){
        let needles:JSX.Element[] = []
        for(let i = 0; i < props.rows; i++){
            for(let j = 0; j < props.columns; j++){
                const x:number = j * props.hspace;
                const y:number = (i * props.vspace) + props.length/2;
                const translate:string = 'translate(' + x + ' ' + y + ')'
                const key:string = i + '-' + j
                let elm:JSX.Element = <Needle   magneticRange={magneticRange} 
                                                initAngle={-30} 
                                                length={length} 
                                                width={width} 
                                                translate={translate} 
                                                key={key} />
                needles.push(elm)
            }
        }
        return <g id="needles-group" className="needles">{needles}</g>
    }
    const viewBox:string = '0 0 ' + w + ' ' + h
    const className:string = "needle-field " + props.className
    return  <svg width={w} height={h} viewBox={viewBox} className={className} xmlns="http://www.w3.org/2000/svg">
                <Needles/>    
            </svg>
}
export default NeedleField