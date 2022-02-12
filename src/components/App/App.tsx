import React from 'react';
import { Component, useState} from 'react';
import ComponentLibrary from '../ComponentLibrary/ComponentLibrary';
import { DevController } from '../DevController/DevController';
import Site from '../Site/Site';
import { StyleGuide } from '../StyleGuide/StyleGuide';
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
    case AppConstants.VIEW_MODE_STYLE_GUIDE:
      comp = <StyleGuide/>
      break;
  }
  return comp 
}

export interface AppProps{
  devMode:boolean
}
const DevModeListener = function(props:any){
  const handleKeyDown = function(event:KeyboardEvent){
    event.stopImmediatePropagation()
    if(event.key === 'd' && event.ctrlKey){ props.toggleHandler() }
  }
  document.addEventListener('keyup', (event) => {handleKeyDown(event)}, false);
  return null
}
export class App extends React.Component{
  state:any
  constructor(props:any){
    super(props)
    let devMode:boolean = true
    let viewMode:string = this.getInitViewMode(devMode)
    this.state = {devMode:devMode, viewMode:viewMode}
  }
  getInitViewMode = (devMode:boolean) =>{
    return (!devMode) ? 
    AppConstants.VIEW_MODE_COMPONENT_LIBRARY : 
    AppConstants.VIEW_MODE_SITE
  }
  toggleDevMode = () => {
    this.setState({devMode:!this.state.devMode})
  }
  getViewMode = () => {
    return (!this.state.devMode) ? AppConstants.VIEW_MODE_SITE : this.state.viewMode
  }
  setViewMode = (mode:string) => {
    this.setState({viewMode:mode})
  }
  render(){
    return (
      <div className="App">
          <DevModeListener toggleHandler={this.toggleDevMode}/>
          <DevController modeSetter={this.setViewMode}/>
          <ChildComponent devMode={this.state.devMode} viewMode={this.getViewMode()}/>
      </div> 
    )   
  }
}
export default App