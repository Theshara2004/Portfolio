import React, { useState } from 'react';
import ImageGallery from './ImageGallery';

export default function ProjectDisplay({ project }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!project) return null;

  const isWhisperingForest = project.id === 'project-1';

  // 1. COLLATING ALL ASSETS INTO A UNIFORM ARRAY
  const slides = [];
  if (project.videoEmbed) slides.push({ type: 'video', src: project.videoEmbed, label: 'Mission Footage' });
  if (project.codeShowcase) slides.push({ type: 'image', src: project.codeShowcase.image, label: project.codeShowcase.label });
  if (project.blueprintEmbed) slides.push({ type: 'blueprint', src: project.blueprintEmbed, label: 'Technical Blueprint' });
  if (project.gallery) {
    project.gallery.forEach((img, index) => {
      slides.push({ type: 'image', src: img.src, label: `Gallery Log #${index + 1}` });
    });
  }

  // Navigation Logic
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="active-project-wrapper">
      
      {/* SECTION 1: HERO BANNER */}
      <div className="project-display-hero" style={{ backgroundImage: `url(${project.coverImage})` }}>
        <div className="banner-gradient">
          <h3 className="neon-text-title">{project.title}</h3>
        </div>
      </div>

      {/* SECTION 2: TEXT DETAILS */}
      <div className="project-details-grid">
        <div className="project-briefing-col">
          <p className="description-text monospace">{project.description}</p>
          <div className="tech-stack-row">
            {project.techStack.map((tech) => (
              <span key={tech} className="tech-badge">{tech}</span>
            ))}
          </div>
          <div className="links-row">
            {project.links.map((link) => (
              <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="btn primary-btn btn-sm">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="project-objectives-col">
          <h4 className="objectives-header sub-header">{project.contributionTitle || 'Mission Objectives:'}</h4>
          <ul className="sci-fi-list styled-objectives">
            {project.contributions.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* SECTION 3: VISUAL LOGS HEADING */}
      <div className="logs-header-bar">
        <h4 className="logs-heading sub-header">{`// VISUAL_LOGS[${project.id}]`}</h4>
        {!isWhisperingForest && (
          <div className="carousel-controls">
            <span className="slide-counter monospace">{currentSlide + 1} / {slides.length}</span>
          </div>
        )}
      </div>

      {/* SECTION 4: ASSET AREA */}
      <div className={isWhisperingForest ? "asset-vertical-stack" : "asset-carousel-window"}>
        
        {isWhisperingForest ? (
          /* VERTICAL STACK FOR PROJECT 1 */
          <div className="vertical-inner">
            {slides.map((slide, index) => (
              <div key={index} className="asset-item-fixed">
                <h5 className="sub-header-tiny">{slide.label}</h5>
                <AssetRenderer slide={slide} />
              </div>
            ))}
          </div>
        ) : (
          /* ARROW NAVIGATION CAROUSEL FOR OTHERS */
          <div className="carousel-container">
            <button className="nav-arrow left" onClick={prevSlide}>&#10216;</button>
            
            <div className="carousel-slide-viewer">
              <div className="asset-item-fixed active-slide">
                <h5 className="sub-header-tiny">{slides[currentSlide]?.label}</h5>
                <AssetRenderer slide={slides[currentSlide]} />
              </div>
            </div>

            <button className="nav-arrow right" onClick={nextSlide}>&#10217;</button>
          </div>
        )}
      </div>
    </div>
  );
}

// HELPER COMPONENT TO RENDER DIFFERENT MEDIA TYPES UNIFORMLY
function AssetRenderer({ slide }) {
  if (!slide) return null;
  switch (slide.type) {
    case 'video':
      return <iframe src={slide.src} title="video" frameBorder="0" allowFullScreen className="uniform-asset" />;
    case 'blueprint':
      return <iframe src={slide.src} scrolling="no" title="blueprint" className="uniform-asset" />;
    case 'image':
      return <img src={slide.src} alt="log" className="uniform-asset" />;
    default:
      return null;
  }
}