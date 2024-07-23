import React from 'react';
import '../assets/Footer.css';
import facebook from '../images/facebook.png';
import insta from '../images/insta.png';
import twt from '../images/twitter.png';

const Footer = () => {
  return (
    <footer id="contact">
      <h1 className="section-header">Contact</h1>
      <div className="contact-wrapper">
        <form id="contact-form" className="form-horizontal" role="form">
          <div className="form-group">
            <div className="col-sm-12">
              <input type="text" className="form-control" id="name" placeholder="NAME" name="name" value="" required />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input type="email" className="form-control" id="email" placeholder="EMAIL" name="email" value="" required />
            </div>
          </div>
          <textarea className="form-control" rows="10" placeholder="MESSAGE" name="message" required></textarea>
          <button className="btn btn-primary send-button" id="submit" type="submit" value="SEND">
            <div className="alt-send-button">
              <i className="fa fa-paper-plane"></i><span className="send-text">SEND</span>
            </div>
          </button>
        </form>

        <div className="direct-contact-container">
          <ul className="contact-list">
            <li className="list-item"><i className="fa fa-map-marker fa-2x"><span className="contact-text place">Tunis,Manouba</span></i></li>
            <li className="list-item"><i className="fa fa-phone fa-2x"><span className="contact-text phone"><a href="tel:1-212-555-5555" title="Give me a call">(+216) 99 999 999</a></span></i></li>
            <li className="list-item"><i className="fa fa-envelope fa-2x"><span className="contact-text gmail"><a href="mailto:#" title="Send me an email">plateforme@gmail.com</a></span></i></li>
          </ul>

          <hr />

<ul className="social-media-list">
  <li><a href="https://www.facebook.com/" target="_blank" className="contact-icon"><img src={facebook} alt="facebook" /></a></li>
  <li><a href="https://www.instagram.com/" target="_blank" className="contact-icon"><img src={insta} alt="insta" /></a></li>
  <li><a href="https://www.twitter.com/" target="_blank" className="contact-icon"><img src={twt} alt="twitter" /></a></li>
</ul>


          <hr />

          <div className="copyright">&copy; ALL OF THE RIGHTS RESERVED</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
