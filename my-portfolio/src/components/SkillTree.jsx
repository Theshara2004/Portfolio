import React, { useState } from 'react';

const SkillTree = () => {
  const [activeBranch, setActiveBranch] = useState(null);

  const skills = {
    langs: [
      { id: 'python', name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', top: '120px' },
      { id: 'cpp', name: 'C++ / C#', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', top: '240px' },
      { id: 'html', name: 'HTML / CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', top: '360px' },
      { id: 'java', name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', top: '480px' }
    ],
    tools: [
      { id: 'unreal', name: 'Unreal Engine', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unrealengine/unrealengine-original.svg', top: '180px' },
      { id: 'unity', name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', top: '300px' },
      { id: 'github', name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', top: '420px' }
    ]
  };

  return (
    <div className="skill-tree-container">
      <div className="tree-wrapper">
        <svg className="tree-svg" viewBox="0 0 1000 600" fill="none">
          {/* Main Backbone */}
          <path className="branch backbone active" d="M 350 300 L 650 300" />

          {/* CODE BRANCH (LEFT) */}
          <g className={`branch-group ${activeBranch === 'langs' ? 'active' : ''}`}>
            <path d="M 300 300 L 240 300 L 180 120 L 100 120" />
            <path d="M 300 300 L 200 300 L 170 240 L 100 240" />
            <path d="M 300 300 L 210 300 L 190 360 L 100 360" />
            <path d="M 300 300 L 240 300 L 180 480 L 100 480" />
            
            {/* HOVER ZONE - Invisible rectangle covering the left wing */}
            <rect 
              x="50" y="100" width="300" height="400" 
              fill="transparent" pointerEvents="all"
              onMouseEnter={() => setActiveBranch('langs')}
              onMouseLeave={() => setActiveBranch(null)}
            />
          </g>

          {/* ENGINES BRANCH (RIGHT) */}
          <g className={`branch-group ${activeBranch === 'tools' ? 'active' : ''}`}>
            <path d="M 700 300 L 760 300 L 820 180 L 880 180" />
            <path d="M 700 300 L 880 300" />
            <path d="M 700 300 L 760 300 L 820 420 L 880 420" />

            {/* HOVER ZONE - Invisible rectangle covering the right wing */}
            <rect 
              x="650" y="100" width="300" height="400" 
              fill="transparent" pointerEvents="all"
              onMouseEnter={() => setActiveBranch('tools')}
              onMouseLeave={() => setActiveBranch(null)}
            />
          </g>
        </svg>

        {/* NODES - Now absolute positioned to the wrapper, not the hub */}
        <div className={`node-layer ${activeBranch === 'langs' ? 'visible' : ''}`}>
          {skills.langs.map(skill => (
            <div key={skill.id} className="node-container left-side" style={{ left: '60px', top: skill.top }}>
              <div className="logo-circle"><img src={skill.icon} alt="" /></div>
              <div className="node-label">{skill.name}</div>
            </div>
          ))}
        </div>

        <div className={`node-layer ${activeBranch === 'tools' ? 'visible' : ''}`}>
          {skills.tools.map(skill => (
            <div key={skill.id} className="node-container right-side" style={{ left: '900px', top: skill.top }}>
              <div className="logo-circle"><img src={skill.icon} alt="" /></div>
              <div className="node-label">{skill.name}</div>
            </div>
          ))}
        </div>

        {/* BALLS */}
        <div className="hub-ball" style={{ left: '500px', top: '300px' }}>SKILLS</div>
        <div className="hub-ball" style={{ left: '300px', top: '300px' }}>CODE</div>
        <div className="hub-ball" style={{ left: '700px', top: '300px' }}>ENGINES</div>
      </div>
    </div>
  );
};

export default SkillTree;