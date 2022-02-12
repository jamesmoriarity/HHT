import { useState } from "react"
import NeedleField from "./NeedleField"

export function NeedleFieldContainer(props:any){
    const [rows, setRows] = useState(5)
    const [columns, setColumns] = useState(5)
    const [vspace, setVSpace] = useState(20)
    const [hspace, setHSpace] = useState(20)
    const [magneticRange, setMagneticRange] = useState(400)
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
    return(
            <div className="component-library">
              <div className="comp-lib-item">
                <h3>Needle Field</h3>
                <p>
                Params: rows, columns, vspace, hspace, length, width, magneticRange
                </p>
                <p>
                Maximum recommended needles: 100
                </p>
                <p>
                    <span className="param-input">
                      Rows: <input type="text" onChange={updateRows} className="needleField-input" value={rows}></input>
                    </span>
                    <span className="param-input">
                      Columns: <input type="text" onChange={updateColumns} className="needleField-input" value={columns}></input> 
                    </span>
                    <span className="param-input">
                      Vertical Space: <input type="text" onChange={updateVSpace} className="needleField-input" value={vspace}></input> 
                    </span>
                    <span className="param-input">
                      Horizontal Space: <input type="text" onChange={updateHSpace} className="needleField-input" value={hspace}></input> 
                    </span>
                    <span className="param-input">
                      Magnetic Range: <input type="text" onChange={updateMagneticRange} className="needleField-input" value={magneticRange}></input> 
                    </span>
                </p>
                <div className="component-container">
                    <NeedleField className={""} rows={rows} columns={columns} vspace={vspace} hspace={hspace} length={8} width={1} magneticRange={magneticRange}/>
                </div>
              </div>
          </div>
    )
  }
  export default NeedleFieldContainer