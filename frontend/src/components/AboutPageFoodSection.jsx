import React, { useEffect, useState } from "react";
import AboutDishImg from "../assets/about-us-dish-img.png";
import SpecialMenuImg from "../assets/special-menu-rounded-img.png";
import OrangeSvg from "../assets/orange-svg.svg";
import rightArrow from "../assets/btn-arrow-right.svg";
import chipsImg from "../assets/chips-box.png";
import pizaImg from "../assets/pizza-box.png";

export default function AboutPageFoodSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate positions for parallax effect
  // Parallax positions
  const chipsTop = -40 + scrollY * 0.2; // chips moves down slowly
  const pizaBottom = -30 + scrollY * 0.2; // pizza moves up slowly

  return (
    <section className="bg-[#F8F5F0] pb-[50px]">
      <div className="xl:mt-[-100px] relative max-w-[1300px] mx-auto lg:h-[720px] px-5 sm:px-10 lg:px-[80px] flex flex-col xl:flex-row items-center justify-center ">
        {/* MAIN DISH IMAGE */}
        <img
          src={AboutDishImg}
          alt="Dish"
          className="
            w-[260px] sm:w-[320px] xl:w-[380px] lg:w-[440px]
            xl:absolute xl:bottom-0 xl:left-[0px]
            lg:mb-0
          "
        />

        {/* CONTENT */}
        <div className="max-w-[560px] flex flex-col items-center text-center lg:text-left ">
          <p className="text-[16px] font-extrabold tracking-[0.1em] text-[#d6362b] uppercase mb-4">
            ABOUT OUR FOOD
          </p>

          <h2 className="relative text-[28px] text-center sm:text-[34px] md:text-[40px] lg:text-[55px] leading-[1.1] font-extrabold mb-6">
            Best Burger Ideas & Traditions From The Whole World
            <img
              src={chipsImg}
              alt="Chips"
              style={{ top: `${chipsTop}px` }}
              className="absolute sm:h-[100px] object-contain w-[70px] h-[70px] left-0 sm:left-[-70px]"
            />
          </h2>

          <p className="text-[#464646] sm:w-[75%] relative text-[14px] sm:text-[15px] leading-[1.3em] mb-10 text-center">
            The mouth-watering aroma of sizzling burgers now fills the streets
            of Birmingham thanks to the passionate pursuit of three brothers,
            the British founders of Faz food. After over 50 years of experience
            in the culinary industry between them, they set out on a journey to
            discover the ultimate burger.
            <img
              src={pizaImg}
              alt="Pizza"
              style={{ bottom: `${pizaBottom}px` }}
              className="absolute sm:w-[100px] sm:h-[100px] object-contain w-[70px] h-[70px] right-0 sm:right-[-120px]"
            />
          </p>

          {/* BUTTON */}
          <button
            className="
              relative overflow-hidden
              inline-flex items-center gap-2
              px-6 py-3
              bg-[#00833e]
              text-white font-extrabold
              rounded-md
              group
            "
          >
            <span className="absolute inset-0 bg-[#d6362b] translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-[900ms]" />
            <span className="relative z-10 flex items-center gap-2">
              ORDER NOW
              <img src={rightArrow} alt="arrow" />
            </span>
          </button>
        </div>

        {/* SPECIAL MENU BADGE */}
        <div
          className="
            hidden lg:block
            absolute top-[120px] right-[120px]
            w-[170px] h-[170px]
          "
        >
          <img
            src={OrangeSvg}
            alt=""
            className="absolute top-1/2 left-1/2 w-1/2 h-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
          />
          <div className="absolute inset-0 rounded-full border-[1px] border-[#c33130] flex items-center justify-center p-2">
            <img
              src={SpecialMenuImg}
              alt="Special Menu"
              className="w-full h-full object-cover rounded-full animate-spin-slow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
