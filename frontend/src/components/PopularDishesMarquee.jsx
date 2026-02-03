export default function PopularDishesMarquee() {
  return (
    <div className="relative w-full overflow-hidden py-10">
      <div
        className="
          flex min-w-max whitespace-nowrap
          animate-marquee
          hover:[animation-play-state:paused]
        "
        style={{
          willChange: "transform",
          transform: "translateZ(0) skewX(-0.01deg)",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        }}
      >
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-12 px-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <span
                key={idx}
                className="
                  text-[clamp(65px,8vw,120px)]
                  font-extrabold tracking-wide
                  text-transparent
                  [-webkit-text-stroke:1px_#cfcfcf]
                  select-none
                "
              >
                POPULAR DISHES •
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
