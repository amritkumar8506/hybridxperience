// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import LiquidBackground from "./LiquidBackground";
// import CinematicLiquid from "./CinematicLiquid";



// function Hero() {
//   const glowRef = useRef(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     // Text animation
//     gsap.from(".hero-title", {
//       y: 150,
//       opacity: 0,
//       duration: 1.2,
//       stagger: 0.2,
//       ease: "power4.out"
//     });

//     const glow = glowRef.current;

//     window.addEventListener("mousemove", (e) => {
//       gsap.to(glow, {
//         x: e.clientX - window.innerWidth / 2,
//         y: e.clientY - window.innerHeight / 2,
//         duration: 1.5,
//         ease: "power3.out"
//       });
//     });

//     // Detect scroll to hide scroll text
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setIsScrolled(true);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };

//   }, []);

//   return (
//     <section className="h-screen relative flex flex-col justify-center items-center overflow-hidden bg-black px-4">
//       {/* Use ONLY ONE background - CinematicLiquid is more impressive */}
//       <CinematicLiquid />
//       {/* <LiquidBackground /> - COMMENTED OUT for better performance */}

//       {/* Moving Glow Layer */}
//       <div
//         ref={glowRef}
//         className="absolute w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full 
//         bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
//         blur-[150px] md:blur-[200px] opacity-40 pointer-events-none"
//       ></div>

//       {/* Text */}
//       <div className="text-center leading-none z-10 relative">
//         <h1 className="hero-title text-[60px] sm:text-[80px] md:text-[120px] font-extrabold relative z-10">
//           {"HYBRID".split("").map((letter, index) => (
//             <span
//               key={index}
//               className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 
//               bg-clip-text text-transparent
//               transition-all duration-200 hover:drop-shadow-[0_0_40px_rgba(168,85,247,1)]
//               md:hover:scale-110 cursor-default"
//               style={{
//                 filter: "brightness(1)",
//                 transition: "all 0.2s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.filter = "brightness(2) drop-shadow(0 0 30px rgba(168,85,247,1))";
//                 e.target.style.textShadow = "0 0 40px rgba(168,85,247,0.8)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.filter = "brightness(1)";
//                 e.target.style.textShadow = "none";
//               }}
//             >
//               {letter}
//             </span>
//           ))}
//         </h1>

//         <h1 className="hero-title text-[60px] sm:text-[80px] md:text-[120px] font-extrabold relative z-10">
//           {"XPERIENCE".split("").map((letter, index) => (
//             <span
//               key={index}
//               className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 
//               bg-clip-text text-transparent
//               transition-all duration-200 hover:drop-shadow-[0_0_40px_rgba(236,72,153,1)]
//               md:hover:scale-110 cursor-default"
//               style={{
//                 filter: "brightness(1)",
//                 transition: "all 0.2s ease",
//               }}
//               onMouseEnter={(e) => {
//                 e.target.style.filter = "brightness(2) drop-shadow(0 0 30px rgba(236,72,153,1))";
//                 e.target.style.textShadow = "0 0 40px rgba(236,72,153,0.8)";
//               }}
//               onMouseLeave={(e) => {
//                 e.target.style.filter = "brightness(1)";
//                 e.target.style.textShadow = "none";
//               }}
//             >
//               {letter}
//             </span>
//           ))}
//         </h1>
//       </div>

//       {/* Scroll Text - fades out on scroll */}
//       <p className={`absolute bottom-10 text-gray-400 text-xs md:text-sm tracking-wide z-10 transition-opacity duration-500 ${
//         isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
//       }`}>
//         Scroll to experience magic ↓
//       </p>

//     </section>
//   );
// }

// export default Hero;





import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SimpleLiquidBackground from "./SimpleLiquidBackground";



function Hero() {
  const glowRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    // Text animation
    gsap.from(".hero-title", {
      y: 150,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });

    const glow = glowRef.current;

    window.addEventListener("mousemove", (e) => {
      gsap.to(glow, {
        x: e.clientX - window.innerWidth / 2,
        y: e.clientY - window.innerHeight / 2,
        duration: 1.5,
        ease: "power3.out"
      });
    });

    // Detect scroll to hide scroll text
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (
    <section className="h-screen relative flex flex-col justify-center items-center overflow-hidden bg-black px-4">
      {/* Simple CSS background - NO Three.js lag! */}
      <SimpleLiquidBackground />

      {/* Moving Glow Layer */}
      <div
        ref={glowRef}
        className="absolute w-[400px] h-[400px] md:w-[900px] md:h-[900px] rounded-full 
        bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
        blur-[150px] md:blur-[200px] opacity-40 pointer-events-none"
      ></div>

      {/* Text */}
      <div className="text-center leading-none z-10 relative">
        <h1 className="hero-title text-[60px] sm:text-[80px] md:text-[120px] font-extrabold relative z-10">
          {"HYBRID".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block bg-gradient-to-r from-blue-400 to-purple-500 
              bg-clip-text text-transparent
              transition-all duration-200 hover:drop-shadow-[0_0_40px_rgba(168,85,247,1)]
              md:hover:scale-110 cursor-default"
              style={{
                filter: "brightness(1)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = "brightness(2) drop-shadow(0 0 30px rgba(168,85,247,1))";
                e.target.style.textShadow = "0 0 40px rgba(168,85,247,0.8)";
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = "brightness(1)";
                e.target.style.textShadow = "none";
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        <h1 className="hero-title text-[60px] sm:text-[80px] md:text-[120px] font-extrabold relative z-10">
          {"XPERIENCE".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 
              bg-clip-text text-transparent
              transition-all duration-200 hover:drop-shadow-[0_0_40px_rgba(236,72,153,1)]
              md:hover:scale-110 cursor-default"
              style={{
                filter: "brightness(1)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = "brightness(2) drop-shadow(0 0 30px rgba(236,72,153,1))";
                e.target.style.textShadow = "0 0 40px rgba(236,72,153,0.8)";
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = "brightness(1)";
                e.target.style.textShadow = "none";
              }}
            >
              {letter}
            </span>
          ))}
        </h1>
      </div>

      {/* Scroll Text - fades out on scroll */}
      <p className={`absolute bottom-10 text-gray-400 text-xs md:text-sm tracking-wide z-10 transition-opacity duration-500 ${
        isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}>
        Scroll to experience magic ↓
      </p>

    </section>
  );
}

export default Hero;