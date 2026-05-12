import { useState } from 'react';
import { projects } from './projectsData';
import ProjectDisplay from './ProjectDisplay';

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);
  const activeProject = projects.find((p) => p.id === activeId);

  return (
    <section id="games" className="projects-section-container">
      <h2 className="section-title">Mission Log</h2>

      <div className="game-ui-frame">
        {/* TOP TAB NAVIGATION */}
        <nav className="project-tab-row">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`tab-unit ${activeId === project.id ? 'active-tab' : ''}`}
              onClick={() => setActiveId(project.id)}
            >
              <span className="tab-label">{project.title}</span>
              <div className="tab-indicator"></div>
            </button>
          ))}
        </nav>

        {/* CONTENT AREA */}
        <div className="project-window-pane">
          <ProjectDisplay project={activeProject} />
        </div>
      </div>
    </section>
  );
}