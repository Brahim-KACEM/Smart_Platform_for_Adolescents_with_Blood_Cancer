import React from 'react';
import Header from '../components/Header';
import Robotique from '../components/Robotique';
import Vid from '../components/Vid';
import Statiques from '../components/Statiques';
import Footer from '../components/Footern';
import Footerimage from '../components/Footerimage';
import Slideshow from '../components/Slideshow';

import footerImage from '../images/footer.png';
import logoImage from '../images/logo.png';
import headerImage from '../images/header.png';
import facebookImage from '../images/facebook.png';
import twitterImage from '../images/twitter.png';
import instaImage from '../images/insta.png';

const Home = () => {
  return (
    <div>
      <Header/>
      <Robotique/>
      <Vid/>
    
  
      <Footer/>
    </div>
  );
};

export default Home;