import { useState, useEffect } from 'react';
import { projects } from './projectsData';
import ProjectDisplay from './ProjectDisplay';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // --- SCROLL LOCK LOGIC ---
  useEffect(() => {
    if (selectedProject) {
      // Disable scrolling on the main page
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling again
      document.body.style.overflow = 'unset';
    }

    // Cleanup function: Ensures scroll is restored if the 
    // component unmounts while the modal is still open
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="projects-section">
      <h2 className="section-title">Mission Inventory</h2>

      <div className="inventory-grid">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="game-card"
            onClick={() => setSelectedProject(project)}
          >
            <div className="card-image" style={{ backgroundImage: `url(${project.coverImage})` }}>
              <div className="card-overlay">
                <span className="view-text">OPEN DATAPAD</span>
              </div>
            </div>
            <div className="card-footer">
              <h4 className="card-title">{project.title}</h4>
              <div className="card-scanner-line"></div>
            </div>
          </div>
        ))}
      </div>

      {/* THE FULL-SCREEN MODAL */}
      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-modal-btn" 
              onClick={() => setSelectedProject(null)}
            >
              &times; CLOSE_TERMINAL
            </button>

            <div className="modal-scroll-area">
              <ProjectDisplay project={selectedProject} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}