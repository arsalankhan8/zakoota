import React, { useEffect, useRef, useState } from "react";

// Replace these with your actual imports / paths
import superDeliciousImg from "../assets/super-delicious-vertical.webp";
import todaySpecialImg from "../assets/today-special.webp";
import pizzaOfferImg from "../assets/super-delicious-pizza.webp";

function useInViewOnce(threshold = 0.3) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [visible, threshold]);

  return [ref, visible];
}

function AnimatedCard({ children, className = "" }) {
  const [ref, visible] = useInViewOnce(0.3);

  return (
    <div
      ref={ref}
      className={[
        "group relative transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.96]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function PromoBannersSecondSection() {
  return (
    <div className="w-full bg-[#f4f1ea]">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* LEFT: Vertical banner with text overlay */}
          <AnimatedCard className="overflow-hidden rounded-3xl">
            <img
              src={superDeliciousImg}
              alt="Super Delicious Combo"
              className="
                h-full w-full object-cover
                transition-transform duration-700 ease-out
                group-hover:scale-110
              "
            />

            {/* Overlay content */}
            <div className="pointer-events-none absolute inset-0 p-6 sm:p-8">
              <div className="max-w-[320px]">
                <h3 className="text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl">
                  SUPER
                  <br />
                  DELICIOUS
                </h3>

                <div className="mt-6 text-white/90">
                  <p className="text-xs font-semibold tracking-widest">CALL US NOW:</p>
                  <p className="mt-1 text-2xl font-extrabold text-[#ff3b30]">
                    1-800-555-333
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>

          {/* RIGHT: Two stacked images */}
          <div className="flex flex-col gap-6">
            {/* Today Special with text */}
            <AnimatedCard className="overflow-hidden rounded-3xl">
              <img
                src={todaySpecialImg}
                alt="Today Special"
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-110
                "
              />

              {/* Text overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center p-6 sm:p-8">
                <h3 className="text-4xl font-extrabold leading-[1] tracking-tight text-white sm:text-5xl">
                  TODAY
                  <br />
                  SPECIAL
                  <br />
                  BURRITO
                  <br />
                  FOOD
                </h3>
              </div>
            </AnimatedCard>

            {/* Pizza image (no text) */}
            <AnimatedCard className="overflow-hidden rounded-3xl">
              <img
                src={pizzaOfferImg}
                alt="Pizza Offer"
                className="
                  h-full w-full object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-110
                "
              />
            </AnimatedCard>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PromoBannersSecondSection;
