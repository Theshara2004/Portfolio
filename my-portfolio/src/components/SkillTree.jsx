import React, { useState, useEffect, useRef } from 'react';

const SkillTree = ({ setSkillObstacles }) => {
  const [activeLayer, setActiveLayer] = useState('none');
  const treeRef = useRef(null);

  // --- IMPROVED REPULSION TRACKING ---
  useEffect(() => {
    let animationFrame;

    const trackElements = () => {
      if (!treeRef.current || !setSkillObstacles) return;

      // Select hubs AND the individual particles
      // We target '.particle' because they have the translate animation
      const elements = treeRef.current.querySelectorAll(
        '.hub-ball.main-hub, .sub-hub.visible, .particle.spawn'
      );
      
      const coords = Array.from(elements).map((el, index) => {
        const rect = el.getBoundingClientRect();
        return {
          id: `node-${index}`,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
      });

      setSkillObstacles(coords);

      // Keep tracking as long as a layer is active
      if (activeLayer !== 'none') {
        animationFrame = requestAnimationFrame(trackElements);
      } else {
        setSkillObstacles([]); // Clear if everything is closed
      }
    };

    // Start the tracking loop
    trackElements();

    return () => {
      cancelAnimationFrame(animationFrame);
      if (setSkillObstacles) setSkillObstacles([]);
    };
  }, [activeLayer, setSkillObstacles]);
  // ------------------------------------

  const skillData = {
    langs: [
      { id: 'py', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { id: 'csharp', name: 'C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
      { id: 'html', name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { id: 'java', name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { id: 'css', name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { id: 'js', name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' }
    ],
    tools: [
      { id: 'unreal', name: 'Unreal', icon: '/icons/Unreal.png' },
      { id: 'unity', name: 'Unity', icon: '/icons/Unity-icon.png' },
      { id: 'git', name: 'GitHub', icon: '/icons/Github-icon.png' },
      { id: 'react', name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' }
    ]
  };

  const getParticlePos = (index, total, radius, side) => {
    const spread = Math.PI * 0.8; 
    const step = total > 1 ? spread / (total - 1) : 0;
    const startAngle = side === 'left' ? Math.PI - spread / 2 : -spread / 2;
    const angle = startAngle + (index * step);
    return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
  };

  return (
    <div className="skill-tree-container" ref={treeRef}>
      <div className="tree-wrapper" onMouseLeave={() => setActiveLayer('none')}>
        <svg className="tree-svg" viewBox="0 0 1000 600">
          {/* Lines */}
          <g className={`line-layer ${activeLayer !== 'none' ? 'visible' : ''}`}>
            <line x1="500" y1="300" x2="300" y2="300" className="chem-bond" />
            <line x1="500" y1="300" x2="700" y2="300" className="chem-bond" />
          </g>
          {/* Left Particles Lines */}
          <g className={`line-layer ${activeLayer === 'code-hover' ? 'visible' : ''}`}>
            {skillData.langs.map((_, i) => {
              const pos = getParticlePos(i, skillData.langs.length, 160, 'left');
              return <line key={i} x1="300" y1="300" x2={300 + pos.x} y2={300 + pos.y} className="chem-bond particle-bond" />;
            })}
          </g>
          {/* Right Particles Lines */}
          <g className={`line-layer ${activeLayer === 'engines-hover' ? 'visible' : ''}`}>
            {skillData.tools.map((_, i) => {
              const pos = getParticlePos(i, skillData.tools.length, 160, 'right');
              return <line key={i} x1="700" y1="300" x2={700 + pos.x} y2={300 + pos.y} className="chem-bond particle-bond" />;
            })}
          </g>
        </svg>

        <div className="hub-ball main-hub" style={{ left: '500px', top: '300px' }} onMouseEnter={() => setActiveLayer('main-hover')}>
          SKILLS
        </div>

        <div className={`hub-ball sub-hub ${activeLayer !== 'none' ? 'visible' : ''}`} style={{ left: '300px', top: '300px' }} onMouseEnter={() => setActiveLayer('code-hover')}>
          LANGUAGES
          {skillData.langs.map((skill, i) => {
            const pos = getParticlePos(i, skillData.langs.length, 160, 'left');
            return (
              <div key={skill.id} className={`particle ${activeLayer === 'code-hover' ? 'spawn' : ''}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
                <div className="particle-core"><img src={skill.icon} alt="" /></div>
                <div className="particle-label">{skill.name}</div>
              </div>
            );
          })}
        </div>

        <div className={`hub-ball sub-hub ${activeLayer !== 'none' ? 'visible' : ''}`} style={{ left: '700px', top: '300px' }} onMouseEnter={() => setActiveLayer('engines-hover')}>
          TOOLS
          {skillData.tools.map((skill, i) => {
            const pos = getParticlePos(i, skillData.tools.length, 160, 'right');
            return (
              <div key={skill.id} className={`particle ${activeLayer === 'engines-hover' ? 'spawn' : ''}`} style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
                <div className="particle-core"><img src={skill.icon} alt="" /></div>
                <div className="particle-label">{skill.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SkillTree;