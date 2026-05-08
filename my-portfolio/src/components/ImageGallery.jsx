import { useRef } from 'react';

export default function ImageGallery({ images }) {
  const galleryRef = useRef(null);

  const scroll = (direction) => {
    galleryRef.current?.scrollBy({ left: direction * 300, behavior: 'smooth' });
  };

  return (
    <div className="gallery-wrapper">
      <button className="gallery-arrow left" onClick={() => scroll(-1)}>&#10094;</button>
      <button className="gallery-arrow right" onClick={() => scroll(1)}>&#10095;</button>
      <div className="image-gallery" ref={galleryRef}>
        {images.map((img, i) => (
          <img key={i} src={img.src} alt={img.alt} className="code-img" />
        ))}
      </div>
    </div>
  );
}