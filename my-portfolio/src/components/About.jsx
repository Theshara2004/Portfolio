import SkillTree from './SkillTree';

// 1. Add { setSkillObstacles } here to "catch" the prop from App.jsx
export default function About({ setSkillObstacles }) {
  return (
    <section id="about" className="about-section">
      <h2 className="section-title">Character Stats</h2>
      <section className="skill-tree-container">
        {/* 2. Pass it down one more level to the actual SkillTree */}
        <SkillTree setSkillObstacles={setSkillObstacles} />
      </section>

      <div className="timeline-section">
        <h3 className="timeline-title">Training &amp; Guilds</h3>
        <div className="timeline">
          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-date">2015 - 2023</span>
              <h4>Ananda College</h4>
              <p>G.C.E. A/L</p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <span className="timeline-date">2024 - Present</span>
              <h4>University of Westminster</h4>
              <p>BSc Computer Science</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}