import * as React from 'react'
import { HashRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom'
import Hawaii from '../Hawaii/Hawaii';
import Home from '../Home/Home';
import Washington from '../Washington/Washington';
import Landscape from '../Landscape/Landscape';
import { Card } from '../Card/Card';
import { gsap } from 'gsap'
import './Website.css'
import About from '../About/About';


class Website extends React.Component {
  showNav = () =>{
    gsap.to("#top-nav-inner", {bottom:20, duration:1, delay:9, ease:'easeIn'})
    gsap.to("#footer-inner", {top:10, duration:1, delay:9, ease:'easeIn'})
  }
  componentDidMount(){
    this.showNav()
  }
  onCardOpened = () => {
    // "#cardContainer"
    let card = "#cardContainer"
    let cardFadeTween = gsap.to(card, 
        {opacity:0, duration:3, delay:0, ease:"power2.out", onUpdate:()=>{}}
    ) 
    let pages = "#pages"
    let pagesFadeTween = gsap.to(pages, 
      {opacity:1, duration:3, delay:0, ease:"power2.out", onUpdate:()=>{}}
  ) 
    let fadeTimeline = gsap.timeline({
        autoRemoveChildren:false, 
        paused:true, 
        smoothChildTiming:true, 
        onComplete: this.onFadeInComplete
    })
    fadeTimeline.add(cardFadeTween, 0)
    fadeTimeline.add(pagesFadeTween, 0)
    fadeTimeline.restart()    
    console.log('card has opened')
  }
  render() {
    return (<>
            <Card openCallback={this.onCardOpened} />
             <BrowserRouter>
                  <div id="pages">
                    <div id="top-nav">
                      <div id="top-nav-inner">
                        <Link to="/">Home</Link>   <Link to="/hawaii">Hawaii</Link>  <Link to="/washington">Washington</Link>  <Link to="/about">About Dori</Link>  
                      </div>
                    </div>
                    
                   <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hawaii" element={<Hawaii />} />
                        <Route path="/washington" element={<Washington />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                    <div id="footer">
                      <Landscape/>
                      <div id="footer-inner">
                        <p>
                          <Link to="/">footer</Link>
                          <Link to="/washington">ipsum</Link>
                          <Link to="/hawaii">dolor</Link>
                          <Link to="/">consequet</Link>
                          <Link to="/washington">lorem</Link>
                          <Link to="/hawaii">ipsum</Link>
                          <Link to="/">dolor</Link>
                          <Link to="/washington">footer</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </BrowserRouter>
            </>
    );
  }
}

export default Website