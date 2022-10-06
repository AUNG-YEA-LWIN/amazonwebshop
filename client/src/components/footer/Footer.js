import React from 'react';
import './footer.css';
import amazonLogo from '../image/amazon_PNG25.png';

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer>
        <div className='footer_container'>
            <div className='footer_details_one'>
                <h3>Get to Know US</h3>
                <p>About Us</p>
                <p>Careers</p>
                <p>Press Releases</p>
                <p>Amazon Cares</p>
            </div>
            <div className='footer_details_one'>
                <h3>Connect With US</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instragram</p>
                <p>Telegram</p>
            </div>
            <div className='footer_details_one forres'>
                <h3>Make Money With Us</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instragram</p>
                <p>Telegram</p>
            </div>
            <div className='footer_details_one forres'>
                <h3>Make Money With Us</h3>
                <p>Facebook</p>
                <p>Twitter</p>
                <p>Instragram</p>
                <p>Telegram</p>
            </div>
        </div>
        <div className='lastdetails'>
            <img src={amazonLogo} alt="amazonLogo" />
            <p>Conditons of Use & Sale &nbsp; &nbsp; &nbsp; Privacy Notice &nbsp; &nbsp; &nbsp; 
            Interest-Based Ads &nbsp; &nbsp; &nbsp; &#169; 1996-{year}, &nbsp; &nbsp; &nbsp;  Amazon.com, Inc. or its affiliates</p>
        </div>
    </footer>
  )
}

export default Footer