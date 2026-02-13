export default function PopularDishesMarquee() {
  const COPIES = 8;
  const WORDS_PER_COPY = 6;

  const Copy = ({ ariaHidden = false }) => (
    <div aria-hidden={ariaHidden} className="flex items-center gap-12 px-6 shrink-0">
      {Array.from({ length: WORDS_PER_COPY }).map((_, idx) => (
        <span
          key={idx}
          className="
            whitespace-nowrap
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
  );
  return (
    <div className="relative bg-[#f4f1ea] w-full overflow-hidden py-10">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {Array.from({ length: 12 }).map((_, idx) => (
            <span
              key={idx}
              className="marquee-text"
            >
              POPULAR DISHES •
            </span>
          ))}
        </div>
      </div>
    </div>
  );

}
