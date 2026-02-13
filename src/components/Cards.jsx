import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Cards() {

  useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(
    ".card",
    { y: 120, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.3,
      scrollTrigger: {
        trigger: ".cards-section",
        start: "top 80%",
      },
    }
  );
}, []);


  return (
    <section className="cards-section min-h-screen md:min-h-[120vh] bg-black flex flex-col md:flex-row justify-center items-center gap-8 md:gap-12 px-6 md:px-10 py-20 md:py-0">

      {/* Card 1 - HX Installations */}
      <div className="card w-full max-w-[350px] md:w-[400px] lg:w-[450px] h-[450px] md:h-[500px] lg:h-[550px] group perspective-1000">
        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
          
          {/* Front Side */}
          <div className="absolute w-full h-full bg-white/10 border border-white/20 
          backdrop-blur-xl rounded-3xl flex items-center justify-center 
          text-2xl md:text-3xl lg:text-4xl font-semibold text-white backface-hidden">
            HX Installations
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 
          border border-purple-500/30 backdrop-blur-xl rounded-3xl 
          flex flex-col items-center justify-center p-8 md:p-10 text-white 
          backface-hidden rotate-y-180">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Installations
            </h3>
            <p className="text-base md:text-lg text-center text-gray-300 leading-relaxed">
              Immersive experiences that blend physical and digital worlds. Transform spaces with cutting-edge technology.
            </p>
          </div>

        </div>
      </div>

      {/* Card 2 - HX Studio */}
      <div className="card w-full max-w-[350px] md:w-[400px] lg:w-[450px] h-[450px] md:h-[500px] lg:h-[550px] group perspective-1000">
        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
          
          {/* Front Side */}
          <div className="absolute w-full h-full bg-white/10 border border-white/20 
          backdrop-blur-xl rounded-3xl flex items-center justify-center 
          text-2xl md:text-3xl lg:text-4xl font-semibold text-white backface-hidden">
            HX Studio
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full bg-gradient-to-br from-pink-600/20 to-purple-600/20 
          border border-pink-500/30 backdrop-blur-xl rounded-3xl 
          flex flex-col items-center justify-center p-8 md:p-10 text-white 
          backface-hidden rotate-y-180">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Studio
            </h3>
            <p className="text-base md:text-lg text-center text-gray-300 leading-relaxed">
              Creative lab where ideas come to life. Design, prototype, and build extraordinary digital experiences.
            </p>
          </div>

        </div>
      </div>

      {/* Card 3 - HX Lab */}
      <div className="card w-full max-w-[350px] md:w-[400px] lg:w-[450px] h-[450px] md:h-[500px] lg:h-[550px] group perspective-1000">
        <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
          
          {/* Front Side */}
          <div className="absolute w-full h-full bg-white/10 border border-white/20 
          backdrop-blur-xl rounded-3xl flex items-center justify-center 
          text-2xl md:text-3xl lg:text-4xl font-semibold text-white backface-hidden">
            HX Lab
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 
          border border-blue-500/30 backdrop-blur-xl rounded-3xl 
          flex flex-col items-center justify-center p-8 md:p-10 text-white 
          backface-hidden rotate-y-180">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Lab
            </h3>
            <p className="text-base md:text-lg text-center text-gray-300 leading-relaxed">
              Innovation hub pushing boundaries of what's possible. Experiment with emerging technologies and interactive art.
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Cards;