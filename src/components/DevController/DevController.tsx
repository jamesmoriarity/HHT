import { AppConstants } from "../App/App"

export interface DevControllerProps{
    modeSetter:Function
}

export function DevController(props:DevControllerProps){
    const cl_mode:string = AppConstants.VIEW_MODE_COMPONENT_LIBRARY
    const site_mode:string = AppConstants.VIEW_MODE_SITE
    const sg_mode:string = AppConstants.VIEW_MODE_STYLE_GUIDE
    const onClickHandler = function(mode:string){
        props.modeSetter(mode)
    }
    return <div>
                <span onClick={()=>{onClickHandler(cl_mode)}}>Component Library</span> | 
                <span onClick={()=>{onClickHandler(site_mode)}}>Site</span> | 
                <span onClick={()=>{onClickHandler(sg_mode)}}>Style Guide</span>
            </div>
}
export default DevController