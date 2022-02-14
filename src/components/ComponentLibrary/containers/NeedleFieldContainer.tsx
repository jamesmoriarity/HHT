import React, { ChangeEventHandler, useEffect, useState } from "react"
import NeedleField from "../../NeedleField/NeedleField"

export function NeedleFieldContainer(props:any){
    const initRows:number = 4; const initColumns:number = 4;
    const initVSpace:number = 20; const initHSpace:number = 20;
    const initMagneticRange:number = 300
    const [rows, setRows] = useState(initRows)
    const [isCleared, setIsCleared] = useState(false)
    const [columns, setColumns] = useState(initColumns)
    const [vspace, setVSpace] = useState(initVSpace)
    const [hspace, setHSpace] = useState(initHSpace)
    const [magneticRange, setMagneticRange] = useState(initMagneticRange)
    const updateRows = function(e: React.ChangeEvent<HTMLInputElement>){
      setRows(parseInt(e.target.value))
    }
    const updateColumns = function(e: React.ChangeEvent<HTMLInputElement>){
      setColumns(parseInt(e.target.value))
    }
    const updateVSpace = function(e: React.ChangeEvent<HTMLInputElement>){
      setVSpace(parseInt(e.target.value))
    }
    const updateHSpace = function(e: React.ChangeEvent<HTMLInputElement>){
      setHSpace(parseInt(e.target.value))
    }
    const updateMagneticRange = function(e: React.ChangeEvent<HTMLInputElement>){
        setMagneticRange(parseInt(e.target.value))
    }
    const refresh = function(e:React.MouseEvent){
      setRows(initRows)
      setColumns(initColumns)
      setVSpace(initVSpace)
      setHSpace(initHSpace)
      setMagneticRange(initMagneticRange)
      setIsCleared(true)
    }
    const GetComponent = function(){
      if(isCleared){
        return null
      }
      else{
        return <NeedleField className={""} rows={rows} columns={columns} vspace={vspace} hspace={hspace} length={8} width={1} magneticRange={magneticRange}/>
      }
    }
    useEffect(()=>{
      if(isCleared){
        setTimeout(()=>{setIsCleared(false);console.log('delayed')}, 4)
      }
    })
    return(
            <div className="component-library">
              <div className="comp-lib-item">
                <h3>Needle Field</h3>
                <p>
                Params: rows, columns, vspace, hspace, length, width, magneticRange
                </p>
                <p>
                  <span onClick={refresh}>refresh</span>
                </p>
                <p>
                    <EditElement value={rows} title="Rows" min={1} max={30} onChange={updateRows} classNames={[]} />
                    <EditElement value={columns} title="Columns" min={1} max={30} onChange={updateColumns} classNames={[]} />
                    <EditElement value={vspace} title="Vertical Space" min={1} max={99} onChange={updateHSpace} classNames={[]} />
                    <EditElement value={hspace} title="Horizontal Space" min={1} max={99} onChange={updateHSpace} classNames={[]} />
                </p>
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