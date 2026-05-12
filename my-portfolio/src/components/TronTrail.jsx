import React, { useEffect, useRef } from 'react';

const TronTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let points = [];
    let animationFrameId;

    // 1. Keep canvas full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // 2. Track mouse movement
    const handleMouseMove = (e) => {
      points.push({ x: e.clientX, y: e.clientY, age: 0 });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 3. Draw the trail
    const drawTrail = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // CONTROL THE LENGTH: Lower number = shorter trail (was 25, now 15)
      const maxAge = 15;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];

        // life goes from 1.0 (new) down to 0.0 (dead)
        const life = 1 - p1.age / maxAge;

        // --- THE COLOR GRADIENT ---
        // Start: Cyan/Blue (R:0, G:255, B:255)
        // End: Pink/Magenta (R:255, G:0, B:255)
        const r = Math.floor(255 * (1 - life)); // Fades from 0 up to 255
        const g = Math.floor(255 * life);       // Fades from 255 down to 0
        const b = 255;                          // Blue stays constant

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // CONTROL OPACITY: life * 0.6 makes it more subtle/transparent overall
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${life * 0.6})`;
        
        // CONTROL THICKNESS: Starts at 2.5px and shrinks to 0
        ctx.lineWidth = 2.5 * life; 

        // CONTROL GLOW: Reduced from 10 to 6 for a softer, lowkey look
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;

        ctx.stroke();
      }

      // Age points and remove the ones older than maxAge
      points.forEach((p) => (p.age += 1));
      points = points.filter((p) => p.age < maxAge);

      animationFrameId = requestAnimationFrame(drawTrail);
    };

    drawTrail();

    // Cleanup listeners
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none', /* Ensures you can click links under the canvas */
        zIndex: 9999,          /* Keeps it on top */
      }}
    />
  );
};

export default TronTrail;