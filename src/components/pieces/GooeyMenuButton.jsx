'use strict';

import React from 'react';
import { Link } from 'react-router-dom';

export default class GooeyMenuButton extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="gooey-menu">
                <nav className="menu">
                    <input type="checkbox" href="#" className="menu-open" name="menu-open" id="menu-open"/>
                    <label className="menu-open-button" htmlFor="menu-open">
                        <span className="hamburger hamburger-1"></span>
                        <span className="hamburger hamburger-2"></span>
                        <span className="hamburger hamburger-3"></span>
                    </label>

                    <Link to="/search" key="search" className="menu-item">
                        <i className="fa fa-search"></i>
                    </Link>
                    <Link to="/playlist" key="playlist" className="menu-item">
                        <i className="fa fa-headphones"></i>
                    </Link>
                    <Link to="/photography" key="photography" className="menu-item">
                        <i className="fa fa-camera"></i>
                    </Link>
                    <Link to="/cinematography" key="cinematography" className="menu-item">
                        <i className="fa fa-video-camera"></i>
                    </Link>
                    <Link to="/digital-downloads" key="downloads" className="menu-item">
                        <i className="fa fa-download"></i>
                    </Link>
                </nav>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="shadowed-goo">

                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="5"/>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
                            <feGaussianBlur in="goo" stdDeviation="4" result="shadow"/>
                            <feColorMatrix in="shadow" mode="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2" result="shadow"/>
                            <feOffset in="shadow" dx="1" dy="1" result="shadow"/>
                            <feBlend in2="shadow" in="goo" result="goo"/>
                            <feBlend in2="goo" in="SourceGraphic" result="mix"/>
                        </filter>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="5"/>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"/>
                            <feBlend in2="goo" in="SourceGraphic" result="mix"/>
                        </filter>
                    </defs>
                </svg>
            </div>
        )
    }
}
