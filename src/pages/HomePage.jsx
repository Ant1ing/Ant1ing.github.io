import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // import useLocation
import HeroSec from "../components/HomePage/HeroSec";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AboutMe from "../components/HomePage/AboutMe";
import Skill from "../components/HomePage/Skill";
import Projects from "../components/HomePage/ProjectsSec";
import TestimonialSlider from "../components/HomePage/Testimonials";
import { TypeAnimation } from 'react-type-animation';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [firstVisit, setFirstVisit] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const navigatingBackFromContactPage = location.state?.fromContactPage;
  
    console.log('visitedBefore before:', sessionStorage.getItem('visitedBefore')); // log visitedBefore before setting it
  
    if (sessionStorage.getItem('visitedBefore') !== 'true' || navigatingBackFromContactPage) {
      setFirstVisit(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('visitedBefore', 'true'); // set visitedBefore to true after the long loading screen has been displayed
        console.log('visitedBefore after:', sessionStorage.getItem('visitedBefore')); // log visitedBefore after setting it
      }, 4000);
      return () => clearTimeout(timer);
    } else {
      setFirstVisit(false);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [location]);

  return (
    <div className="fullpage-wrapper">
      <div className={`loading-screen ${loading ? '' : 'hidden'}`}>
        {firstVisit ? (
          <TypeAnimation
            cursor={true}
            sequence={['Welcome to my portfolio', 100, 'Loading...', 500]}
            wrapper="h1"
          />
        ) : (
          <img src="../images/PortfolioLogo.svg" alt="Logo" />
        )}
      </div>
      <>
        <Navbar />
        <HeroSec />
        <section id="aboutMe">
          <div id="nextSection">
            <AboutMe />
          </div>
        </section>
        <section id="skills">
          <div id="nextSection">
            <Skill />
          </div>
        </section>
        <section id="project">
          <div id="nextSection">
            <Projects />
          </div>
        </section>
        <TestimonialSlider />
        <Footer />
      </>
    </div>
  );
};

export default HomePage;