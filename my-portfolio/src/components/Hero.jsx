import Typewriter from './Typewriter';

export default function Hero() {
  return (
    <header id="home" className="hero">
      <div className="hero-content">
        <p><Typewriter text="> LEVEL 1: INITIALIZATION " delay={100} /></p>
        <h1>Theshara Rajapaksha</h1>
        <p className="subtitle">
          2nd-Year CS Undergraduate and Game Developer based in Sri Lanka,
          specializing in gameplay programming and 3D environments.
        </p>
        <a href="#games" className="btn primary-btn">
          <span style={{fontSize: '1.4em', fontWeight: '900'}}>[ </span>View my projects<span style={{fontSize: '1.4em', fontWeight: '900'}}> ]</span>
        </a>
      </div>
    </header>
  );
}