import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import "./SplashFooter.css"

const SplashFooter = () => {
  return (
    <div className='splashpage-footer'>
      <div className='splashpage-footer-left-container'>
        <div className="left-container-item first-item">
        <i class="fa-regular fa-copyright"></i>
          <div style={{marginLeft: "8px"}}> 2022 tiff's airbnb • &nbsp;</div>
        </div>
        <div className="left-container-item disclaimer-text">
          For demonstration purposes only
        </div>
      </div>
      <div className='splashpage-footer-right-container'>
        <div className='splash-right-container-item' >
          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <i style={{marginRight: '10px'}} class="fa-solid fa-user"></i>
          </div>
          <a style={{textDecoration:"none"}} href="https://tiffany-yang-personal-site.herokuapp.com/">
            <div style={{fontWeight: '500', color: "black"}}>
              Tiffany Yang
            </div>
          </a>
        </div>
        <div className='splash-right-container-item'>
          <a className="github-container link" href="https://github.com/tyang2015/Backup-for-tiff-s-airbnb">
            <div className='github-svg-container'>
              <i style={{marginRight: '10px'}} class="fa-brands fa-github"></i>

            </div>
            <div style={{width: '10em'}}>
              Github Link
            </div>
          </a>
        </div>
        <div className='splash-right-container-item'>
          <a className='linked-in-container link' href="https://www.linkedin.com/in/tiffany-yang-373140133/">
            <div className='linked-in-svg-container'>
              <svg style={{marginRight: '10px'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" class="mercado-match" width="24" height="24" focusable="false">
                <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
              </svg>
            </div>
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )

}

export default SplashFooter
