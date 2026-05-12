import React, { useEffect, useRef } from 'react';

const HexNetwork = ({ obstacles = [] }) => {
  const canvasRef = useRef(null);
  // Use a Ref to store obstacles so the animation loop can access them 
  // without triggering a re-render/re-init of the canvas.
  const obstaclesRef = useRef(obstacles);

  // Sync the prop to the Ref whenever it changes
  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particlesArray = [];
    let animationFrameId;
    let mouse = { x: null, y: null, radius: 150 };

    class Particle {
      constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.baseX = x; // Remember original position to "return" to it
        this.baseY = y;
        this.size = size;
        this.color = color;
        this.density = (Math.random() * 20) + 2; 
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
      }

      draw() {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          const hx = this.x + this.size * Math.cos(angle);
          const hy = this.y + this.size * Math.sin(angle);
          if (i === 0) ctx.moveTo(hx, hy);
          else ctx.lineTo(hx, hy);
        }
        ctx.closePath();
        ctx.stroke();
      }

      applyRepulsion(targetX, targetY, radius) {
        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < radius) {
          let forceDirectionX = dx / distance;
          let forceDirectionY = dy / distance;
          let force = (radius - distance) / radius;
          this.x -= forceDirectionX * force * this.density;
          this.y -= forceDirectionY * force * this.density;
        }
      }

      update() {
        // 1. Mouse repulsion
        if (mouse.x && mouse.y) {
          this.applyRepulsion(mouse.x, mouse.y, mouse.radius);
        }

        // 2. Skill Node repulsion (Read from the REF, not the prop)
        obstaclesRef.current.forEach(obs => {
          this.applyRepulsion(obs.x, obs.y, 180);
        });

        // 3. Drift
        this.x += this.vx;
        this.y += this.vy;

        // 4. Edge bounce
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
    }

    const init = () => {
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 12000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 4) + 4;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y, size, 'rgba(0, 255, 255, 0.2)'));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connect lines
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 110) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - distance/110) * 0.05})`;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    handleResize(); // Sets width and calls init()
    animate();      // Starts the loop

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // EMPTY ARRAY: Only run once on mount!

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, 
        pointerEvents: 'none', 
      }}
    />
  );
};

export default HexNetwork;