// import { useEffect, useRef } from "react";
// import gsap from "gsap";

// function CustomCursor() {
//   const cursorDotRef = useRef(null);
//   const trailRefs = useRef([]);

//   useEffect(() => {
//     // Check if device is mobile/touch
//     const isMobile = window.matchMedia("(max-width: 768px)").matches || 
//                      'ontouchstart' in window;
    
//     if (isMobile) {
//       return; // Don't enable custom cursor on mobile
//     }

//     const cursorDot = cursorDotRef.current;
//     const trails = trailRefs.current;

//     // Hide default cursor
//     document.body.style.cursor = "none";

//     const moveCursor = (e) => {
//       const { clientX: x, clientY: y } = e;

//       // Inner dot follows
//       gsap.to(cursorDot, {
//         x: x,
//         y: y,
//         duration: 0.05,
//       });

//       // Trail elements follow with more delay for smooth flow
//       trails.forEach((trail, index) => {
//         gsap.to(trail, {
//           x: x,
//           y: y,
//           duration: 0.6 + index * 0.15,
//           ease: "power3.out",
//         });
//       });
//     };

//     window.addEventListener("mousemove", moveCursor);

//     return () => {
//       window.removeEventListener("mousemove", moveCursor);
//       document.body.style.cursor = "auto";
//     };
//   }, []);

//   return (
//     <>
//       {/* Trail gradient blobs - hidden on mobile */}
//       {[...Array(8)].map((_, i) => (
//         <div
//           key={i}
//           ref={(el) => (trailRefs.current[i] = el)}
//           className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9998]"
//           style={{
//             width: `${60 - i * 6}px`,
//             height: `${60 - i * 6}px`,
//             transform: "translate(-50%, -50%)",
//             borderRadius: "50%",
//             background: `radial-gradient(circle, 
//               rgba(168, 85, 247, ${0.4 - i * 0.05}) 0%, 
//               rgba(59, 130, 246, ${0.3 - i * 0.04}) 40%,
//               rgba(236, 72, 153, ${0.2 - i * 0.03}) 70%,
//               transparent 100%)`,
//             filter: `blur(${8 + i * 2}px)`,
//             mixBlendMode: "screen",
//           }}
//         />
//       ))}

//       {/* Inner cursor dot - hidden on mobile */}
//       <div
//         ref={cursorDotRef}
//         className="hidden md:block fixed top-0 left-0 pointer-events-none z-[10000]"
//         style={{
//           width: "6px",
//           height: "6px",
//           transform: "translate(-50%, -50%)",
//           borderRadius: "50%",
//           background: "rgba(255, 255, 255, 0.9)",
//           boxShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
//         }}
//       />
//     </>
//   );
// }

// export default CustomCursor;








import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function CustomCursor() {
  const cursorDotRef = useRef(null);
  const trailRefs = useRef([]);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Check if device is mobile/touch
    const isMobile = window.matchMedia("(max-width: 768px)").matches || 
                     'ontouchstart' in window;
    
    if (isMobile) {
      // Add touch ripple effect for mobile
      const handleTouch = (e) => {
        const touch = e.touches[0] || e.changedTouches[0];
        const ripple = {
          x: touch.clientX,
          y: touch.clientY,
          id: Date.now(),
        };
        
        setRipples(prev => [...prev, ripple]);
        
        // Remove ripple after animation
        setTimeout(() => {
          setRipples(prev => prev.filter(r => r.id !== ripple.id));
        }, 1000);
      };

      document.addEventListener('touchstart', handleTouch);
      
      return () => {
        document.removeEventListener('touchstart', handleTouch);
      };
    }

    const cursorDot = cursorDotRef.current;
    const trails = trailRefs.current;

    // Hide default cursor
    document.body.style.cursor = "none";

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;

      // Inner dot follows
      gsap.to(cursorDot, {
        x: x,
        y: y,
        duration: 0.05,
      });

      // Trail elements follow with more delay for smooth flow
      trails.forEach((trail, index) => {
        gsap.to(trail, {
          x: x,
          y: y,
          duration: 0.6 + index * 0.15,
          ease: "power3.out",
        });
      });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Desktop: Trail gradient blobs - reduced to 5 for performance */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="hidden md:block fixed top-0 left-0 pointer-events-none z-[9998]"
          style={{
            width: `${50 - i * 8}px`,
            height: `${50 - i * 8}px`,
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              rgba(168, 85, 247, ${0.5 - i * 0.08}) 0%, 
              rgba(59, 130, 246, ${0.4 - i * 0.07}) 40%,
              rgba(236, 72, 153, ${0.3 - i * 0.06}) 70%,
              transparent 100%)`,
            filter: `blur(${6 + i * 2}px)`,
            mixBlendMode: "screen",
          }}
        />
      ))}

      {/* Desktop: Inner cursor dot */}
      <div
        ref={cursorDotRef}
        className="hidden md:block fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          width: "6px",
          height: "6px",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow: "0 0 10px rgba(168, 85, 247, 0.8)",
        }}
      />

      {/* Mobile: Touch ripple effects */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="md:hidden fixed pointer-events-none z-[9999]"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="absolute w-4 h-4 rounded-full bg-white/80"
            style={{
              animation: "ripple-dot 1s ease-out forwards",
            }}
          />
          <div
            className="absolute w-20 h-20 rounded-full border-2 border-purple-400/60"
            style={{
              animation: "ripple-ring 1s ease-out forwards",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />
          <div
            className="absolute w-32 h-32 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, transparent 70%)",
              animation: "ripple-glow 1s ease-out forwards",
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
              filter: "blur(10px)",
            }}
          />
        </div>
      ))}
    </>
  );
}

export default CustomCursor;