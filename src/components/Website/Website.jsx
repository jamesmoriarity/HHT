import * as React from 'react'
import { HashRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom'
import Hawaii from '../Hawaii/Hawaii';
import Home from '../Home/Home';
import Washington from '../Washington/Washington';
import Landscape from '../Landscape/Landscape';
import { Card } from '../Card/Card';
import { gsap } from 'gsap'
import './Website.css'


class Website extends React.Component {
  showNav = () =>{
    gsap.to("#top-nav-inner", {bottom:20, duration:1, delay:3, ease:'easeIn'})
    gsap.to("#footer-inner", {top:50, duration:1, delay:3, ease:'easeIn'})
  }
  componentDidMount(){
    this.showNav()
  }
  render() {
    return (<>
             <BrowserRouter>
                    <div id="top-nav">
                      <div id="top-nav-inner">
                        <Link to="/washington">Washington</Link>  <Link to="/">Home</Link>   <Link to="/hawaii">Hawaii</Link>
                      </div>
                    </div>
                    <Routes>
                      <Route path="*" element={<Landscape />} />
                    </Routes>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/hawaii" element={<Hawaii />} />
                        <Route path="/washington" element={<Washington />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                    <Card/>
                    <div id="footer">
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
                </BrowserRouter>
            </>
    );
  }
}

export default Website