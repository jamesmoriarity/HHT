import * as React from 'react'
import { HashRouter as Router, Route, Link, Routes, BrowserRouter } from 'react-router-dom'
import Hawaii from '../Hawaii/Hawaii';
import Home from '../Home/Home';
import Washington from '../Washington/Washington';
import Landscape from '../Landscape/Landscape';
import { gsap } from 'gsap'
import './Website.css'


class Website extends React.Component {
  showNav = () =>{
    gsap.to("#top-nav-inner", {bottom:20, duration:1, ease:'easeInOut'})
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
                </BrowserRouter>
            </>
    );
  }
}

export default Website