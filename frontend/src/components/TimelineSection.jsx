import React, { useEffect, useRef, useState } from "react";
import firstImg from "../assets/1st-timeline-img.png";
import secondImg from "../assets/2nd-timeline-img.png";
import thirdImg from "../assets/3rd-timeline-img.png";
import fourthImg from "../assets/4th-timeline-img.png";

/* ------------------ DATA ------------------ */
const timelineData = [
  {
    year: "2020",
    title: "Origins",
    heading: "OUR HUMBLE BEGINNINGS",
    text: `It all started with a dream of bringing authentic New York street flavors to life. With simple recipes and big passion, we laid the foundation for what would become an iconic fried chicken experience.`,
    image: firstImg,
    side: "right",
  },
  {
    year: "2021",
    title: "Flavor",
    heading: "PERFECTING OUR RECIPES",
    text: `Over the years, we mastered bold and crispy flavors that capture the real NYC street taste. Every dish is freshly made, packed with attitude, and made with the highest quality ingredients.`,
    image: secondImg,
    side: "left",
  },
  {
    year: "2024",
    title: "Growth",
    heading: "BRINGING NYC TO AUSTRALIA",
    text: `From a small kitchen to serving food lovers across Australia, we shared the joy of real New York street food with millions, keeping our commitment to speed, freshness, and flavor.`,
    image: thirdImg,
    side: "right",
  },
  {
    year: "2027",
    title: "Future",
    heading: "THE NEXT GENERATION",
    text: `We continue to innovate while staying true to our roots. Using sustainable practices and top-quality ingredients, we bring fresh, hot, and bold NYC flavors straight to your doorstep.`,
    image: fourthImg,
    side: "left",
  },
];

/* ------------------ COMPONENT ------------------ */
export default function TimelineSection() {
  const lineRef = useRef(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const [activeItems, setActiveItems] = useState([]);

  /* ------------------ SCROLL LOGIC ------------------ */
  useEffect(() => {
    const handleScroll = () => {
      const line = lineRef.current;
      const section = sectionRef.current;
      if (!line || !section) return;

      const sectionRect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      let rawProgress =
        (windowHeight - sectionRect.top) / (windowHeight + sectionRect.height);
      rawProgress = Math.max(0, Math.min(1, rawProgress));

      let progress = Math.pow(rawProgress, 0.9);
      if (rawProgress > 0.55) progress += (rawProgress - 0.55) * 0.35;
      progress = Math.max(0, Math.min(1, progress));

      let snapProgress = progress;
      const sectionTop = sectionRect.top;
      const newActive = itemRefs.current.map((item) => {
        if (!item) return false;
        const rect = item.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - sectionTop;
        if (snapProgress * sectionRect.height >= offset) {
          const exact = offset / sectionRect.height;
          snapProgress = Math.max(snapProgress, exact);
          return true;
        }
        return false;
      });

      line.style.height = `${snapProgress * 100}%`;
      setActiveItems(newActive);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ------------------ UI ------------------ */
  return (
    <section
      ref={sectionRef}
      className="bg-[#f9f5f0] py-20 relative overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto px-6 relative">
        {/* VERTICAL LINE */}
        <div className="absolute left-[22px] md:left-1/2 top-0 h-full w-[2px] bg-gray-200 -translate-x-1/2">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 w-full bg-red-600 transition-all duration-150"
            style={{ height: "0%" }}
          />
        </div>

        <div className="space-y-24 md:space-y-40">
          {timelineData.map((item, index) => {
            const isRight = item.side === "right";
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="relative flex flex-col md:flex-row items-center justify-between"
              >
                {/* IMAGE */}
                <div
                  className={`
    w-full md:w-[45%]  md:mb-0 flex justify-center   /* mobile: center */
    md:${isEven ? "justify-end" : "justify-start"}        /* desktop: even/odd */
    ${isRight ? "md:order-1" : "md:order-2"}
  `}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[280px] md:w-[320px]"
                  />
                </div>

                {/* CONTENT */}
                <div
                  className={`w-full md:w-[45%] ${
                    isRight
                      ? "md:order-2 md:text-left"
                      : "md:order-1 md:text-right"
                  }  px-[30px] flex flex-col md:px-0`}
                >
                  {/* YEAR CIRCLE */}
                  <div
                    ref={(el) => (itemRefs.current[index] = el)}
                    className={`
    absolute 
    top-0 
    left-[0px] md:left-1/2       /* match vertical line position */
    -translate-x-1/2 
    z-10
    w-12 h-12 md:w-16 md:h-16
    rounded-full
    text-white font-bold text-sm md:text-lg
    flex items-center justify-center
    border-4 border-[#f9f5f0]
    transition-colors duration-500
    ${activeItems[index] ? "bg-red-600" : "bg-gray-300"}
  `}
                  >
                    {item.year}
                  </div>

                  {/* TITLE */}
                  <h3
                    className={`italic mb-2 text-center md:${isEven ? "text-left" : "text-right"} md:mb-[-10px] `}
                    style={{
                      fontFamily: "'Mr Dafoe', cursive",
                      fontSize: "clamp(50px, 8vw, 80px)",
                      color: "#FFCC19",
                    }}
                  >
                    {item.title}
                  </h3>

                  {/* HEADING + TEXT */}
                  <div
                    className={`
    flex flex-col items-center text-center   /* mobile: stacked & centered */
    ${isEven ? "md:pl-[30px] md:items-start md:text-left md:flex-col" : "md:pr-[30px] md:text-right md:flex-col md:text-left md:items-end"}
  `}
                  >
                    <h3
                      className="font-bold uppercase"
                      style={{
                        fontSize: "clamp(24px, 4vw, 35px)",
                        lineHeight: "1.2",
                        letterSpacing: "-1px",
                        marginBottom: "10px",
                      }}
                    >
                      {item.heading}
                    </h3>
                    <p
                      className={`max-w-md leading-relaxed ${!isEven ? "md:ml-auto" : ""}`}
                      style={{ color: "#464646" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
