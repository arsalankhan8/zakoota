import React from 'react'
import heroBg from "../assets/Home-Hero-Bg-Img.webp";
import heroBurger from "../assets/Home-Hero-Right-Img.webp";
import authenticImg from "../assets/authentic-img.png";
import rightArrow from "../assets/btn-arrow-right.svg"

function LandingHeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0 animate-fade-in">
        <img
          src={heroBg}
          alt="Hero Background"
          className="h-full w-full object-cover object-left sm:object-center"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 min-h-[850px] sm:min-h-[1200px] lg:min-h-[800px] flex items-center">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 w-full">

          {/* LEFT */}
          <div
            className="relative flex flex-col items-center opacity-0 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative inline-block">
              <div className="relative pt-16">
                <img
                  src={authenticImg}
                  alt="Burger"
                  className="absolute sm:-top-24 top-[-30px] left-[100px] w-[180px] sm:w-[320px] lg:w-[300px] xl:w-[380px] pointer-events-none z-40"
                />

                <div className="relative z-10 text-white font-extrabold flex justify-center flex-col items-center leading-[0.9] tracking-tight">
                  <div className="text-6xl sm:text-8xl lg:text-[95px] xl:text-[90px] text-center"> New York Street Food. Now in Australia.
                  </div>
                </div>
              </div>
            </div>

            <p
              className="mt-6 max-w-md text-[18px] sm:text-[20px] text-center w-[70%] text-white/70 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              Real NYC taste. Freshly made, every day.
            </p>

            <div
              className="mt-8 opacity-0 animate-fade-up"
              style={{ animationDelay: "0.65s" }}
            >
<button
  className="
    relative overflow-hidden
    inline-flex items-center justify-center
    rounded-md
    px-6 py-3
    text-[16px] font-extrabold tracking-wide text-white
    bg-[#00833e]
    shadow-[0_10px_30px_-15px_rgba(16,185,129,0.9)]
    transition-transform
    group
  "
>
  {/* Sliding red layer */}
  <span
    className="
      absolute inset-0
      bg-[#d6362b]
      translate-x-[-100%]
      transition-transform
      duration-[900ms]
      ease-[cubic-bezier(0.22,1,0.36,1)]
      will-change-transform
      group-hover:translate-x-0
    "
  />

  {/* Content */}
  <span className="relative z-10 inline-flex items-center gap-2">
    ORDER NOW
    <img src={rightArrow} alt="" />
  </span>
</button>

            </div>
          </div>

          {/* RIGHT */}
          <div
            className="relative flex justify-center lg:justify-end opacity-0 animate-slide-right"
            style={{ animationDelay: "0.35s" }}
          >
            <img
              src={heroBurger}
              alt="Burger"
              className="w-[320px] sm:w-[420px] lg:w-[560px] drop-shadow-[0_40px_50px_rgba(0,0,0,0.65)]"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

export default LandingHeroSection