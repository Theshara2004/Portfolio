import { useState } from 'react';
import { projects } from './projectsData';
import ProjectDisplay from './ProjectDisplay';

export default function Projects() {
  const [activeId, setActiveId] = useState(projects[0].id);

  const activeProject = projects.find((p) => p.id === activeId);

  return (
    <section id="games" className="portfolio-section">
      <h2 className="section-title">Missions Completed</h2>

      <div className="inventory-ui">
        <div className="inventory-list">
          <h4 className="list-header">SELECT DATAPAD</h4>

          {projects.map((project) => (
            <button
              key={project.id}
              className={`inventory-item ${activeId === project.id ? 'active-item' : ''}`}
              onClick={() => setActiveId(project.id)}
            >
              <span className="item-icon">{'>>'}</span> {project.title}
            </button>
          ))}
        </div>

        <div className="inventory-display">
          <ProjectDisplay project={activeProject} />
        </div>
      </div>
    </section>
  );
}