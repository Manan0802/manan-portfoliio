import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { flatSkills } from './SkillsData';

export const SkillsAvalanche: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const engineRef = useRef<Matter.Engine | null>(null);

  // 0 = Normal (1), 1 = Space (0), 2 = Reverse (-1)
  const [gravityMode, setGravityMode] = useState(0);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies;

    const engine = Engine.create();
    engineRef.current = engine;
    
    // Bounds
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    const wallOptions = { 
      isStatic: true, 
      render: { visible: false } 
    };

    World.add(engine.world, [
      // Ground
      Bodies.rectangle(width / 2, height + 25, width, 50, wallOptions),
      // Left Wall
      Bodies.rectangle(-25, height / 2, 50, height, wallOptions),
      // Right Wall
      Bodies.rectangle(width + 25, height / 2, 50, height, wallOptions),
      // Ceiling
      Bodies.rectangle(width / 2, -25, width, 50, wallOptions)
    ]);

    // Create pills
    const bodies = flatSkills.map((skill) => {
      // Estimate width: avg 8px per char + 40px padding
      const estimatedWidth = skill.text.length * 8 + 40; 
      const estimatedHeight = 40;
      
      return Bodies.rectangle(
        Math.random() * (width - 100) + 50, // random x
        Math.random() * (height / 2), // random y WITHIN the visible container
        estimatedWidth,
        estimatedHeight,
        {
          chamfer: { radius: 20 },
          restitution: 0.6,
          friction: 0.1,
          frictionAir: 0.001,
          render: { visible: false } // rendered via DOM
        }
      );
    });

    World.add(engine.world, bodies);

    // Mouse interactivity
    const mouse = Mouse.create(sceneRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    World.add(engine.world, mouseConstraint);
    
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Sync loop for DOM elements
    const syncBodies = () => {
      bodies.forEach((body, index) => {
        const el = elementsRef.current[index];
        if (el) {
          const { x, y } = body.position;
          // Apply translation. Subtract half width/height to center the div over the body center
          el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad) translate(-50%, -50%)`;
        }
      });
      requestAnimationFrame(syncBodies);
    };

    const animationFrameId = requestAnimationFrame(syncBodies);

    // Resize handler — walls use initial dimensions (acceptable for layout)
    const handleResize = () => { /* intentional no-op */ };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      Runner.stop(runner);
      Engine.clear(engine);
      World.clear(engine.world, false);
    };
  }, []);

  const handleExplode = () => {
     if (!engineRef.current) return;
     const bodies = Matter.Composite.allBodies(engineRef.current.world).filter(b => !b.isStatic);
     bodies.forEach(body => {
       const forceMagnitude = 0.04 * body.mass;
       Matter.Body.applyForce(body, body.position, {
         x: (Math.random() - 0.5) * forceMagnitude,
         y: (Math.random() - 0.5) * forceMagnitude // Explosion goes in all directions
       });
     });
  };

  const handleVortex = () => {
    if (!engineRef.current || !sceneRef.current) return;
    const bodies = Matter.Composite.allBodies(engineRef.current.world).filter(b => !b.isStatic);
    
    const centerX = sceneRef.current.clientWidth / 2;
    const centerY = sceneRef.current.clientHeight / 2;

    // Pull everything to center and spin it
    bodies.forEach(body => {
        const dx = centerX - body.position.x;
        const dy = centerY - body.position.y;
        const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
        
        const nx = dx / distance;
        const ny = dy / distance;

        const pullStrength = 0.06 * body.mass;
        const spinStrength = 0.05 * body.mass;

        Matter.Body.applyForce(body, body.position, {
            x: nx * pullStrength - ny * spinStrength,
            y: ny * pullStrength + nx * spinStrength
        });
    });
  };

  const handleToggleGravity = () => {
     if (!engineRef.current) return;
     const nextMode = (gravityMode + 1) % 3; // 0 -> 1 -> 2 -> 0
     setGravityMode(nextMode);

     if (nextMode === 0) engineRef.current.world.gravity.y = 1;      // Normal
     if (nextMode === 1) engineRef.current.world.gravity.y = 0;      // Zero Gravity
     if (nextMode === 2) engineRef.current.world.gravity.y = -1;     // Anti-Gravity

     // Bump elements slightly to kickstart the new gravity feel
     const bodies = Matter.Composite.allBodies(engineRef.current.world).filter(b => !b.isStatic);
     bodies.forEach(body => {
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005
        });
     });
  };

  const handleReset = () => {
      if (!engineRef.current) return;
      const width = sceneRef.current?.clientWidth || 800;
      const bodies = Matter.Composite.allBodies(engineRef.current.world).filter(b => !b.isStatic);
      
      engineRef.current.world.gravity.y = 1;
      setGravityMode(0);

      bodies.forEach(body => {
          Matter.Body.setPosition(body, {
             x: Math.random() * (width - 100) + 50,
             y: Math.random() * (sceneRef.current!.clientHeight / 2)
          });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
      });
  };

  const getGravityText = () => {
    if (gravityMode === 0) return 'Turn Off Gravity';
    if (gravityMode === 1) return 'Anti-Gravity';
    return 'Normal Gravity';
  };

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden mt-8 border border-white/10 flex flex-col bg-[#050505] shadow-[inset_0_0_100px_rgba(59,130,246,0.05)]">
       {/* High-Tech Background Elements */}
       <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />

       {/* Header Controls */}
       <div className="absolute top-0 left-0 right-0 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center z-20 pointer-events-none">
          <div className="mb-4 sm:mb-0">
             <h3 className="text-white font-bold tracking-widest text-lg font-space-grotesk">SKILLS AVALANCHE</h3>
             <p className="text-secondary text-sm hidden md:block">Drag and throw pills. Manipulate physics using the console.</p>
          </div>
          <div className="flex flex-wrap gap-2 pointer-events-auto">
             <button onClick={handleToggleGravity} className="px-4 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-primary/50 transition-colors uppercase tracking-wider w-fit">
               {getGravityText()}
             </button>
             <button onClick={handleExplode} className="px-4 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-primary/50 transition-colors uppercase tracking-wider w-fit">
               Explode
             </button>
             <button onClick={handleVortex} className="px-4 py-2 text-xs font-bold text-primary bg-primary/10 border border-primary/30 rounded-full hover:bg-primary/20 hover:border-primary/80 transition-colors uppercase tracking-wider w-fit shadow-[0_0_15px_rgba(59,130,246,0.3)]">
               Vortex
             </button>
             <button onClick={handleReset} className="px-4 py-2 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-primary/50 transition-colors uppercase tracking-wider w-fit">
               Reset
             </button>
          </div>
       </div>

       {/* Physics Container */}
       <div ref={sceneRef} className="flex-1 w-full relative">
          {flatSkills.map((skill, index) => (
             <div
               key={index}
               ref={(el) => { elementsRef.current[index] = el; }}
               className={`absolute top-0 left-0 px-5 py-2 rounded-full border backdrop-blur-md text-sm font-medium shadow-lg select-none cursor-pointer ${skill.colorClass}`}
               style={{ willChange: 'transform' }}
             >
               {skill.text}
             </div>
          ))}
       </div>
    </div>
  );
};
