import React, { ChangeEventHandler, useEffect, useState } from "react"
import NeedleField from "../../NeedleField/NeedleField"
import * as webstore from "../../Website/WebsiteStore";

export function NeedleFieldContainer(props:any){
    const magneticRange:number = 100
    const footerHeight:number = 80
    const rows:number = 4;
    const columnWidth:number = 22
    let needleLength:number = columnWidth * .8
    const needleWidth:number = 0.667
    const screenWidth:number = webstore.ScreenWidth()
    const columns:number = Math.floor(screenWidth/columnWidth); 
    const vspace:number = Math.floor(footerHeight/rows); 
    const hspace:number = columnWidth
    if(vspace < needleLength){
      needleLength = vspace
    }
    const GetComponent = function(){
      return  <NeedleField  className={""} rows={rows} columns={columns} 
                              vspace={vspace} hspace={hspace} length={needleLength} 
                              width={needleWidth} magneticRange={magneticRange}
                />
    }
    return(
            <div className="component-library">
              <div className="comp-lib-item">
                <div className="component-container">
                    <GetComponent/>
                </div>
              </div>
          </div>
    )
  }
  export interface EditElementProps{
    title:string,
    value:number,
    min:number,
    max:number,
    onChange:ChangeEventHandler,
    classNames:string[]
  }
  export function EditElement(props:EditElementProps){
    return  <span className="param-input">
              {props.title}: <input type="number" value={props.value} 
                                    min={props.min} 
                                    max={props.max}
                                    onChange={props.onChange} 
                                    className={"needleField-input " + props.classNames.join(' ')}/> 
            </span>
  }
  export default NeedleFieldContainer