import { useEffect, useRef, useState } from "react";
import fastFoodBanner from "../assets/fast-food-banner.webp";
import burgerBanner from "../assets/burger-banner.webp";
import pizzaBanner from "../assets/kebab-roll-banner.png";
import rightArrow from "../assets/btn-arrow-right.svg";

const banners = [
  {
    id: 1,
    img: fastFoodBanner,
    title: ["CRISPY", "CHICKEN", "TENDERS"],
    subtitle1: "Crispy outside",
    subtitle2: "JUICE INSIDE",
    price: "$9.99",
    align: "left",
  },
  {
    id: 2,
    img: burgerBanner,
    title: ["ZAKOOKA", "Signature", "Burger"],
    subtitle1: "Premium taste, ",
    subtitle2: "unforgettable experience",
    price: "$14,00",
    align: "left",
  },
  {
    id: 3,
    img: pizzaBanner,
    title: ["KEBAB", "ROLLS"],
    subtitle1: "Bold flavors.",
    subtitle2: "Wrapped to satisfy",
    price: "$12,00",
    align: "left",
  },
];

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

export default function PromoBanners() {
  return (
    <section className="w-full">
      {/* container full width */}
      <div
        className="
          w-full 
          grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        "
        style={{ gap: 15 }}
      >
        {banners.map((b) => {
          const [ref, visible] = useInViewOnce(0.3);

          return (
            <div
              key={b.id}
              ref={ref}
              className={`
        group relative overflow-hidden
        min-h-[240px] sm:min-h-[280px] lg:min-h-[520px]
        transition-all duration-700 ease-out
        ${visible
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-10 scale-[0.96]"}
      `}
            >
              {/* Background image */}
              <img
                src={b.img}
                alt=""
                className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-700 ease-out
          group-hover:scale-110
        "
              />

              {/* Content */}
              <div
                className="
          relative z-10 h-full text-white
          flex flex-col items-start justify-center
          px-6 py-10
          sm:px-10 sm:py-14
          lg:px-[40px] lg:py-[80px]
        "
              >
                {/* Title */}
                <h3 className="font-extrabold uppercase leading-[0.95] tracking-wide text-[36px] sm:text-[42px] lg:text-[70px]">
                  <span className="block">{b.title[0]}</span>
                  <span className="block">{b.title[1]}</span>
                  <span className="block">{b.title[2]}</span>
                </h3>

                {/* Sub text */}
                <div className="mt-3">
                  <p className="text-white/80 text-[12px] sm:text-[13px] uppercase tracking-widest">
                    {b.subtitle1}
                  </p>
                  {b.subtitle2 && (
                    <p className="text-white/80 text-[12px] sm:text-[13px] uppercase tracking-widest">
                      {b.subtitle2}
                    </p>
                  )}
                </div>

                {/* Price */}
                <p className="mt-1 sm:mt-5 text-[#f6c445] uppercase font-extrabold text-[28px] sm:text-[40px]">
                  {b.price}
                </p>

                {/* Button */}
                <button
                  type="button"
                  className="
            mt-4 sm:mt-6
            inline-flex items-center gap-3
            bg-white text-black
            rounded-xl
            px-6 py-3
            font-bold uppercase tracking-wider
            text-[16px] sm:text-[18px]
            transition
            hover:scale-[1.04]
            active:scale-[0.98]
          "
                >
                  ORDER NOW
                  <img
                    src={rightArrow}
                    alt=""
                    className="w-4 h-4 filter brightness-0"
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};