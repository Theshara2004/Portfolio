import ImageGallery from './ImageGallery';

export default function ProjectDisplay({ project }) {
  if (!project) return null;

  return (
    <div className="project-detail-view">
      <div 
        className="project-hero-banner" 
        style={{ backgroundImage: `url('${project.coverImage}')` }}
      >
        <div className="banner-text">
          <h3 className="neon-header">{project.title}</h3>
        </div>
      </div>

      <div className="project-body-content">
        <p className="description-text">{project.description}</p>

        <div className="tech-badge-container">
          {project.techStack.map((tech) => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>

        <div className="mission-grid">
          <div className="objectives-list">
            <h4 className="sub-header">{project.contributionTitle || 'Mission Objectives:'}</h4>
            <ul className="cyber-list">
              {project.contributions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          {project.videoEmbed && (
            <div className="video-wrapper">
              <iframe 
                src={project.videoEmbed} 
                title="Project Video" 
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen 
              />
            </div>
          )}
        </div>

        {/* CODE SHOWCASE SECTION */}
        {project.codeShowcase && (
          <div className="code-showcase">
            <h4 className="sub-header">{project.codeShowcase.label}</h4>
            <img
              src={project.codeShowcase.image}
              alt={project.codeShowcase.alt}
              className="code-img"
            />
          </div>
        )}

        {/* BLUEPRINT EMBED SECTION */}
        {project.blueprintEmbed && (
          <div className="blueprint-showcase">
            <h4 className="sub-header">Blueprint for the Whispering Angel:</h4>
            <div className="blueprint-container">
              <iframe
                src={project.blueprintEmbed}
                scrolling="no"
                allowFullScreen
                title="Blueprint"
              />
            </div>
          </div>
        )}

        {/* IMAGE GALLERY */}
        {project.gallery && <ImageGallery images={project.gallery} />}

        {/* ACTION BUTTONS */}
        <div className="action-buttons">
          {project.links.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="cyber-btn">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}