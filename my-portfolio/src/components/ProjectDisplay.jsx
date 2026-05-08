import ImageGallery from './ImageGallery';

export default function ProjectDisplay({ project }) {
  if (!project) return null;

  return (
    <div className="project-details active-project" id={project.id}>
      <div
        className="display-image"
        style={{ backgroundImage: `url('${project.coverImage}')` }}
      />
      <div className="display-content">
        <h3 className="neon-text">{project.title}</h3>
        <p>{project.description}</p>

        <div className="tech-stack">
          {project.techStack.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        {project.videoEmbed && (
          <div className="display-video">
            <iframe
              src={project.videoEmbed}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}

        <br />

        <div className="project-contributions">
          <h4 className="sub-header">
            {project.videoEmbed ? 'What I Built:' : 'My Contribution:'}
          </h4>
          <ul className="sci-fi-list">
            {project.contributions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

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

        {project.gallery && <ImageGallery images={project.gallery} />}

        <div style={{ marginTop: '1.5rem' }}>
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="btn primary-btn"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}