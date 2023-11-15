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
import { TopBar } from '../TopBar/TopBar';
import { PageRoutes } from './PageRoutes';
import NeedleFieldContainer from '../ComponentLibrary/containers/NeedleFieldContainer';
import * as webstore from './WebsiteStore';

export function Website(){
  const isMobile:boolean = webstore.IsMobile()
  const showCard:boolean = false
  const buildAndFireFadeTimeline = () => {
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
      {opacity:1, display:'block', duration:1, delay:0, ease:"power2.in", onUpdate:()=>{}}
    )
    let cardRemovalTween = gsap.to(card, {display:'none'})
    

    let fadeTimeline = gsap.timeline({
        autoRemoveChildren:false, 
        paused:true, 
        smoothChildTiming:true, 
        onComplete: onFadeInComplete
    })
    fadeTimeline.add(cardFadeTween, 0)
    fadeTimeline.add(pagesFadeTween, 0)
    // fadeTimeline.add(footerRiseTween, 2)
    fadeTimeline.add(navDropTween, 2.5)
    fadeTimeline.add(pageTween, 2)
    fadeTimeline.add(cardRemovalTween, 4)
    fadeTimeline.restart()
  }
  const onCardOpened = () => {
    buildAndFireFadeTimeline()
  }

  const onFadeInComplete = () => {
  }
  const GetCard = () => {
    if(!showCard){
      setTimeout(()=>{onCardOpened()}, 1)
      return null
    }
    return <Card openCallback={onCardOpened} />
  }
  const GetNeedleField = () => {
    return (isMobile) ? null : <NeedleFieldContainer/>
  }
    return (<>
             <BrowserRouter>
              <div id='tag-line'><h2>Aligning Goals</h2></div>
              <Routes>
                  <Route path="/test" element={<TestBed />} />
                  <Route path="*" element={<GetCard/>} />
              </Routes>
              
              <div id="pages">
                <TopBar/>
                <Nav/>
                <div id="page-container">
                  <PageRoutes/>
                </div>
                <div id="footer-container">
                  <div id="footer">
                    <div className='needle-field-container'>
                      
                    </div>
                    <div id="footer-inner">
                      <div className="footer-compass"><img src='./jpg/compass_logo.png' width="85"/></div>
                      <div className="footer-divider">|</div>
                        <div className="footer-link"><Link to="/">Home</Link></div>   
                        <div className="footer-link"><Link to="/hawaii">Hawaii</Link></div>     
                        <div className="footer-link"><Link to="/washington">Washington</Link></div>     
                        <div className="footer-link"><Link to="/about">About Dori</Link></div>      
                        <div className="footer-link"><Link to="/testimonials">Testimonials</Link></div>    
                        <div className="footer-link"><Link to="/contact">Contact</Link></div>   
                    </div>
                    <div className='sub-footer'>Hawaii Real Estate Broker RB-23210 | Washington State Broker - License #7348</div>
                  </div>
                  
                </div>
              </div>
              </BrowserRouter>
            </>
    )
    }