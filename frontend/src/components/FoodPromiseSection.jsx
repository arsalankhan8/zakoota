import React, { useEffect, useRef, useState } from "react";

// ✅ Left image
import foodPromiseImg from "../assets/food-promise-img.webp";

function useInViewOnce(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );

    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible, threshold]);

  return [ref, visible];
}

export default function FoodPromiseSection() {
  const stats = [
    { value: "23+", label: "YEARS EXPERIENCE" },
    { value: "80+", label: "FLAVOR COMBINATIONS" },
  ];

  const [sectionRef, visible] = useInViewOnce(0.3);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F1EA] overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 pb-10 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div
            className={[
              "relative transition-all duration-700 ease-out",
              visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.98]",
            ].join(" ")}
          >
            <div className="relative lg:mx-auto w-full max-w-[640px] lg:max-w-none">
              <img
                src={foodPromiseImg}
                alt="Food Promise"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div
            className={[
              "w-full transition-all duration-700 ease-out delay-150",
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            ].join(" ")}
          >
            <p className="text-[16px] sm:text-[18px] font-extrabold text-[#c33130]">
              OUR FOOD PROMISE
            </p>

            <h2 className="mt-4 text-[34px] leading-[1.05] sm:text-[55px] lg:text-[65px] font-black tracking-[1px] text-[#1f1f1f]">
            FRESH, BOLD, AND MADE JUST FOR YOU
            </h2>

            <p className="mt-5 sm:max-w-[85%] text-[18px] leading-[1.35] text-[#464646]">
             We bring the real taste of New York street food straight to your table in Australia. Every dish is freshly made, crispy, juicy, and packed with bold flavors — delivered hot, fast, and full of attitude.
            </p>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 gap-10 sm:gap-14 max-w-[520px]">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className={[
                    "transition-all duration-700 ease-out",
                    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
                    // stagger stats a bit
                    idx === 0 ? "delay-300" : "delay-400",
                  ].join(" ")}
                >
                  <p className="text-[44px] sm:text-[56px] font-black text-[#c33130] leading-[1]">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[14px] sm:text-[15px] font-extrabold tracking-[1px] text-[#1f1f1f]">
                    {s.label}
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
