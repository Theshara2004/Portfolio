import React, { useState } from 'react'; // Add useState
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import About from './components/About.jsx';
import Footer from './components/Footer.jsx';
import TronTrail from './components/TronTrail.jsx';
import HexNetwork from './components/HexNetwork.jsx';

export default function App() {
  // This state stores the (x,y) of expanded skill nodes
  const [skillObstacles, setSkillObstacles] = useState([]);

  return (
    <>
      {/* Pass the obstacles into the HexNetwork */}
      <HexNetwork obstacles={skillObstacles} />
      <TronTrail />
      <Navbar />
      <Hero />
      <Projects />
      {/* Pass the setter function down to About */}
      <About setSkillObstacles={setSkillObstacles} />
      <Footer />
    </>
  );
}