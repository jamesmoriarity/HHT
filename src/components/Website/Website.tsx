import * as React from 'react'
import { HashRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom'

import Hawaii from '../Pages/Hawaii/Hawaii';
import Home from '../Pages/Home/Home';
import Washington from '../Pages/Washington/Washington';
import About from '../Pages/About/About';
import Testimonials from '../Pages/Testimonials/Testimonials';
import Contact from '../Pages/Contact/Contact';

import TestBed from '../TestBed/TestBed';
import { Card } from '../Card/Card';
import Landscape from '../Landscape/Landscape';
import { gsap } from 'gsap'
import './Website.css'
import { Nav } from '../Nav/Nav';
import { LogoHeader } from '../LogoHeader/LogoHeader';


class Website extends React.Component {

  showNav = () =>{

  }
  componentDidMount(){
    this.showNav()
  }
  onCardOpened = () => {
    // "#cardContainer"
    let body:HTMLBodyElement | null = document.querySelector("body")
    if(body){body.className = 'post-card'}
    let card = "#cardContainer"
    let cardFadeTween = gsap.to(card, 
        {opacity:0, duration:2, delay:0, ease:"power2.out", onUpdate:()=>{}}
    ) 
    let pages = "#pages"
    let pagesFadeTween = gsap.to(pages, 
      {opacity:1, display:'block', duration:2, delay:0, ease:"power2.out", onUpdate:()=>{}}
    ) 
    let footer = "#footer"
/*     let footerRiseTween = gsap.to(footer, 
      {top:0, opacity:1, duration:1, delay:0, ease:"power2.out", onUpdate:()=>{}}
    ) */
    let topNavInner = '#top-nav-inner'
    let navDropTween = gsap.to(topNavInner, 
      {top:0, duration:1, delay:0, ease:"power2.out", onUpdate:()=>{}}
    )
    let page = '#page-container'
    let pageTween = gsap.to(page, 
      {opacity:1, display:'block', duration:1, delay:0, ease:"power2.out", onUpdate:()=>{}}
    )
    let cardRemovalTween = gsap.to(card, {display:'none'})

    let fadeTimeline = gsap.timeline({
        autoRemoveChildren:false, 
        paused:true, 
        smoothChildTiming:true, 
        onComplete: this.onFadeInComplete
    })
    fadeTimeline.add(cardFadeTween, 0)
    fadeTimeline.add(pagesFadeTween, 0)
    // fadeTimeline.add(footerRiseTween, 2)
    fadeTimeline.add(navDropTween, 2.5)
    fadeTimeline.add(pageTween, 2)
    fadeTimeline.add(cardRemovalTween, 4)
    fadeTimeline.restart()    
  }
  onFadeInComplete = () => {
  }
  onBurgerToggle = (isOpen:boolean) => {
    this.setState({navIsOpen:isOpen})
  }

  render() {
    return (<>
            <Card openCallback={this.onCardOpened} />
             <BrowserRouter>
                  <div id="pages">
                    <Nav/>
                    <LogoHeader/>
                    <div id="page-container">
                      <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/hawaii" element={<Hawaii />} />
                          <Route path="/washington" element={<Washington />} />
                          <Route path="/about" element={<About />} />
                          <Route path="/testimonials" element={<Testimonials />} />
                          <Route path="/contact" element={<Contact />} />
                          <Route path="/test" element={<TestBed />} />
                          <Route path="*" element={<Home />} />
                      </Routes>
                    </div>
                    <Landscape/>
                    <div id="footer-container">
                      <div id="footer">
                        <div id="footer-inner">
                            <div className="footer-link"><Link to="/">Home</Link></div>   
                            <div className="footer-link"><Link to="/hawaii">Hawaii</Link></div>     
                            <div className="footer-link"><Link to="/washington">Washington</Link></div>     
                            <div className="footer-link"><Link to="/about">About Dori</Link></div>      
                            <div className="footer-link"><Link to="/testimonials">Testimonials</Link></div>    
                            <div className="footer-link"><Link to="/contact">Contact</Link></div>   
                        </div>
                      </div>
                    </div>
                  </div>
              </BrowserRouter>
            </>
    );
  }
}

export default Website