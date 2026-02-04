import { useRef, useState, useEffect } from "react";

// ✅ Left image
import aboutFood from "../assets/about-food-img.webp";

// ✅ Icons
import burgerIcon from "../assets/burger.svg";
import houseIcon from "../assets/house.svg";
import bikeIcon from "../assets/bike.svg";
import bgFood from "../assets/four-food-white-bg-img.webp";

function useInViewOnce(threshold = 0.4) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // ✅ run only once
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function AboutFoodSection() {
  const [sectionRef, isVisible] = useInViewOnce(0.4);

  const features = [
    { icon: burgerIcon, title: "A NEW LOOK ON\nTHE RIGHT FOOD!" },
    { icon: houseIcon, title: "THE USE OF NATURAL\nBEST QUALITY PRODUCTS" },
    { icon: bikeIcon, title: "FASTEST ON YOUR\nDOOR STEP" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F1EA] overflow-hidden"
    >
      {/* BG (xl only) */}
      <div className="pointer-events-none absolute inset-0 hidden xl:flex justify-center">
        <img
          src={bgFood}
          alt=""
          className={[
            "h-full w-full max-w-8xl object-cover",
            "transition-all duration-700 ease-out",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
          ].join(" ")}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-10 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div
            className={[
              "relative transition-all duration-700 ease-out",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10",
            ].join(" ")}
          >
            <div className="relative lg:mx-auto w-full max-w-[560px] lg:max-w-none">
              <img
                src={aboutFood}
                alt="About Food"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
  className={[
    "w-full transition-all ease-out",
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
  ].join(" ")}
  style={{
    transitionDuration: "700ms",
    transitionDelay: isVisible ? "150ms" : "0ms",
  }}
          >
            <p className="text-[16px] sm:text-[18px] font-extrabold text-[#c33130]">
              ABOUT OUR FOOD
            </p>

            <h2 className="mt-4 text-[34px] leading-[1.05] sm:text-[55px] lg:text-[65px] font-black tracking-[1px] text-[#1f1f1f]">
              WE MAKE THE BEST
              <br className="hidden sm:block" />
              BURGER IN YOUR TOWN
            </h2>

            <p className="mt-5 sm:max-w-[90%] text-[18px] leading-[1.3em] text-[#464646]">
              The mouth-watering aroma of sizzling burgers now fills the streets
              of Birmingham thanks to the passionate pursuit of three brothers,
              the British founders of Fazfood. After over 50 years of experience
              in the culinary industry between them, they set out on a journey to
              discover the ultimate burger.
            </p>

            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5">
{features.map((f, idx) => (
  <div
    key={idx}
    className={[
      "flex items-center gap-4 sm:flex-col sm:items-start sm:gap-3",
      "transition-all ease-out",
      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
    ].join(" ")}
    style={{
      transitionDuration: "500ms",
      transitionDelay: isVisible ? `${300 + idx * 120}ms` : "0ms",
    }}
  >
                  <img
                    src={f.icon}
                    alt=""
                    className="h-16 w-16 object-contain"
                    loading="lazy"
                  />

                  <p className="whitespace-pre-line text-[18px] font-extrabold tracking-[.3px] leading-[1.35] text-[#212121]">
                    {f.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* /RIGHT */}
        </div>
      </div>
    </section>
  );
}
