import React from 'react';
import { Component, useState} from 'react';
import ComponentLibrary from '../ComponentLibrary/ComponentLibrary';
import { DevController } from '../DevController/DevController';
import Site from '../Site/Site';
import './App.css';

export class AppConstants{
  static VIEW_MODE_COMPONENT_LIBRARY = 'component library'
  static VIEW_MODE_SITE = 'site'
  static VIEW_MODE_STYLE_GUIDE = 'style guide'
}
export interface ChildComponentProps{
  devMode:boolean, 
  viewMode:string
}
function ChildComponent(props:ChildComponentProps){
  console.log('child component devmode', props.devMode)
  if(!props.devMode) return <Site/>
  let comp:JSX.Element = <ComponentLibrary/>
  switch (props.viewMode) {
    case AppConstants.VIEW_MODE_COMPONENT_LIBRARY:
      break;
    case AppConstants.VIEW_MODE_SITE:
        comp = <Site/>
        break;
  }
  return comp 
}

export interface AppProps{
  devMode:boolean
}
const DevModeListener = function(props:any){
  console.log('adding listener')
  const handleKeyDown = function(event:KeyboardEvent){
    console.log('handleKeyDown')
    event.stopImmediatePropagation();
    var name = event.key;
    var ctrlKey = event.ctrlKey;
    if(event.key === 'd' && event.ctrlKey){
      console.log('should toggle devmode', props.toggleHandler)
      props.toggleHandler()
    }
  }
  document.addEventListener('keyup', (event) => {handleKeyDown(event)}, false);
  return <div/>
}
export function App(){
  console.log('App')
/*   const getInitMode = function(){
    return (true) ? 
    AppConstants.VIEW_MODE_COMPONENT_LIBRARY : 
    AppConstants.VIEW_MODE_SITE
  } */
  const [devMode, setDevMode] = useState(true)
  const [viewMode, setViewMode] = useState(AppConstants.VIEW_MODE_SITE)
  const toggleDevMode = function(){
    console.log('toggleDevMode', devMode)
    setDevMode(!devMode)
  }
  return <div className="App">
            <DevModeListener toggleHandler={toggleDevMode}/>
            <div>{'viewMode:' + viewMode}</div>
            <div>{'devmode:' + devMode}</div>
{/*             <DevController modeSetter={setViewMode}/>
            <ChildComponent devMode={devMode} viewMode={viewMode}/> */}
        </div>    

}
export default App