import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// decor svgs
import leafDownLeft from "../assets/decor-leaf-down-left.svg";
import leafUpRight from "../assets/decor-leaf-up-right.svg";
import yellowDown from "../assets/yellow-shape-down.svg";
import yellowUp from "../assets/yellow-shape-up.svg";

// dish logo  and their item imgs
import coleslawTextLogo from "../assets/coleslaw-text-logo.png"
import coleslawItem from "../assets/coleslaw-item-img.png"

import chickenTenderItem from "../assets/chicken-tender-item-img.png"
import chickenTenderTextLogo from "../assets/chicken-tenders-text-logo.png"

import sacusesItem from "../assets/sauces-item-img.png"
import saucesTextLogo from "../assets/sauces-text-logo.png"

import kebabRollsItem from "../assets/kebab-rolls-item-img.png"
import kebabRollsTextLogo from "../assets/kebab-rolls-text-logo.png"

import burgerItem from "../assets/burgers-item-img.png"
import burgerTextLogo from "../assets/burger-text-logo.png"

import southernFriesItem from "../assets/shouthern-fries-item-img.png"
import southernFriesTextLogo from "../assets/southern-fries-text-logo.png"

const items = [
    {
        id: 0,
        title: "Southern Fries",
        dishImg: southernFriesItem,
        textImg: southernFriesTextLogo,
    },
    {
        id: 1,
        title: "Chicken Tenders",
        dishImg: chickenTenderItem,
        textImg: chickenTenderTextLogo
    },
    {
        id: 2,
        title: "Burgers", 
        dishImg: burgerItem,
        textImg: burgerTextLogo,
    },
    {
        id: 3,
        title: "Kebab Rolls",
        dishImg: kebabRollsItem,
        textImg: kebabRollsTextLogo,
    },
    {
        id: 4,
        title: "Coleslaw",
        dishImg: coleslawItem,
        textImg: coleslawTextLogo,
    },
    {
        id: 5,
        title: "Sacuces",
        dishImg: sacusesItem,
        textImg: saucesTextLogo,
    },
];


export default function FoodCategories() {
    const sliderRef = useRef(null);
    const [targetCols, setTargetCols] = useState(5); // will update by breakpoint
    const [canScroll, setCanScroll] = useState(false);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);
    const [activeIdx, setActiveIdx] = useState(null);

    // breakpoint-driven "auto" columns: (tweak if you want)
    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            if (w >= 1024) setTargetCols(5); // lg+
            else if (w >= 768) setTargetCols(3); // md
            else if (w >= 640) setTargetCols(2); // sm
            else setTargetCols(1); // mobile
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // actual columns (if less items, expand cards instead of leaving gaps)
    const cols = useMemo(
        () => Math.max(1, Math.min(targetCols, items.length)),
        [targetCols]
    );

    // scroll state + arrows visibility
    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        const update = () => {
            const max = el.scrollWidth - el.clientWidth;
            const overflow = max > 2;

            setCanScroll(overflow);
            setAtStart(el.scrollLeft <= 2);
            setAtEnd(el.scrollLeft >= max - 2);
        };

        update();

        const onScroll = () => update();
        el.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(() => update());
        ro.observe(el);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
        };
    }, [cols]);

    const scrollByOne = (dir) => {
        const el = sliderRef.current;
        if (!el) return;

        // move by one "card width" (based on container/cols)
        const step = el.clientWidth / cols;

        el.scrollBy({
            left: dir === "left" ? -step : step,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        const onScroll = () => {
            const center = el.scrollLeft + el.clientWidth / 2;
            let closestIdx = null;
            let closestDist = Infinity;

            Array.from(el.children).forEach((child, idx) => {
                const childCenter =
                    child.offsetLeft + child.clientWidth / 2;
                const dist = Math.abs(center - childCenter);

                if (dist < closestDist) {
                    closestDist = dist;
                    closestIdx = idx;
                }
            });

            setActiveIdx(closestIdx);
        };

        onScroll(); // initial
        el.addEventListener("scroll", onScroll, { passive: true });

        return () => el.removeEventListener("scroll", onScroll);
    }, []);


    const [revealed, setRevealed] = useState(false);

    // reveal when section comes into view (once)
    useEffect(() => {
        const el = sliderRef.current;
        if (!el) return;

        // observe the section wrapper (or slider itself)
        const sectionEl = el.closest("section") || el;

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    io.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        io.observe(sectionEl);
        return () => io.disconnect();
    }, []);

    return (
        <section className="relative w-screen left-1/2 -translate-x-1/2 ">
            {/* arrows on TOP only if overflow */}
            {canScroll && (
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-30 flex justify-between px-6 w-full pointer-events-none">
                    <button
                        type="button"
                        onClick={() => scrollByOne("left")}
                        disabled={atStart}
                        aria-label="Scroll left"
                        className={[
                            "pointer-events-auto",
                            "h-12 w-12 rounded-full",
                            "grid place-items-center",
                            "bg-white/90 backdrop-blur",
                            "border border-black/10",
                            "shadow-[0_10px_25px_-15px_rgba(0,0,0,0.6)]",
                            "transition-all duration-200",
                            atStart
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:scale-[1.06] hover:bg-white active:scale-[0.98]",
                        ].join(" ")}
                    >
                        <ChevronLeft className="h-5 w-5 text-black" strokeWidth={2.5} />
                    </button>

                    <button
                        type="button"
                        onClick={() => scrollByOne("right")}
                        disabled={atEnd}
                        aria-label="Scroll right"
                        className={[
                            "pointer-events-auto",
                            "h-12 w-12 rounded-full",
                            "grid place-items-center",
                            "bg-white/90 backdrop-blur",
                            "border border-black/10",
                            "shadow-[0_10px_25px_-15px_rgba(0,0,0,0.6)]",
                            "transition-all duration-200",
                            atEnd
                                ? "opacity-40 cursor-not-allowed"
                                : "hover:scale-[1.06] hover:bg-white active:scale-[0.98]",
                        ].join(" ")}
                    >
                        <ChevronRight className="h-5 w-5 text-black" strokeWidth={2.5} />
                    </button>
                </div>
            )}

            {/* slider */}
            <div
                ref={sliderRef}
                className="flex overflow-x-auto no-scrollbar-x no-scrollbar scroll-smooth snap-x snap-mandatory"
            >
                {items.map((item, idx) => (
                    <CategoryCard
                        key={item.id}
                        item={item}
                        idx={idx}
                        revealed={revealed}
                        isFirst={idx === 0}
                        cols={cols}
                        isActive={idx === activeIdx}
                        onActivate={() => setActiveIdx(idx)}
                        onDeactivate={() => setActiveIdx(null)}
                    />
                ))}


            </div>
        </section>
    );
};

function CategoryCard({
    item,
    idx,
    revealed,
    isFirst,
    cols,
    isActive,
    onActivate,
    onDeactivate,
}) {
    const delay = 80 * idx; // stagger (ms)
    const x = idx % 2 === 0 ? -26 : 26; // left/right

    return (
        <div
            onMouseEnter={onActivate}
            onMouseLeave={onDeactivate}
            onFocus={onActivate}
            onBlur={onDeactivate}
            className={[
                "group relative h-[500px] shrink-0 snap-start cursor-pointer overflow-hidden",
                "bg-[#F4F1EA] transition-colors duration-300",
                isActive ? "bg-[#F7B33B]" : "hover:bg-[#F7B33B]",
                "border-y border-black/20 border-r border-black/20",
                isFirst ? "border-l border-black/20" : "border-l-0",
                // start hidden until revealed
                revealed ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{
                flexBasis: `max(340px, ${100 / cols}vw)`,
                animation: revealed
                    ? `cardReveal 700ms cubic-bezier(.2,.8,.2,1) ${delay}ms both`
                    : "none",
                ["--x"]: `${x}px`,
            }}
        >
            {/* TEXT IMAGE */}
            <div
                className={[
                    "absolute left-1/2 -translate-x-1/2 z-30 transition-all duration-300 ease-out",
                    isActive ? "top-10" : "top-[350px] group-hover:top-10",
                ].join(" ")}
            >
                <img
                    src={item.textImg}
                    alt={item.title}
                    draggable={false}
                    className={[
                        "h-[70px] select-none transition duration-300 ease-out",
                        isActive ? "brightness-0 invert" : "group-hover:brightness-0 group-hover:invert",
                    ].join(" ")}
                />
            </div>

            {/* DISH */}
            <div
                className={[
                    "absolute left-1/2 -translate-x-1/2 z-20 transition-all duration-300 ease-out w-[250px]",
                    isActive ? "top-[150px]" : "top-14 group-hover:top-[150px]",
                ].join(" ")}
            >
                <img src={item.dishImg} alt={item.title} draggable={false} className="w-[300px] select-none" />
            </div>

            {/* HOVER BLOBS */}
            <img
                src={yellowDown}
                alt=""
                className={[
                    "pointer-events-none absolute z-10 left-8 top-[180px] w-[120px] transition-all duration-300 ease-out",
                    isActive
                        ? "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0"
                        : "opacity-0 scale-90 -translate-x-10 -translate-y-8 rotate-[-6deg] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0",
                ].join(" ")}
            />

            <img
                src={yellowUp}
                alt=""
                className={[
                    "pointer-events-none absolute z-10 right-12 top-[270px] w-[90px] transition-all duration-300 ease-out",
                    isActive
                        ? "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0"
                        : "opacity-0 scale-90 translate-x-10 translate-y-8 rotate-[6deg] delay-75 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0",
                ].join(" ")}
            />

            {/* leaves */}
            <img
                src={leafDownLeft}
                alt=""
                className={[
                    "pointer-events-none absolute z-10 left-20 bottom-28 w-[40px] transition-all duration-300 ease-out",
                    isActive
                        ? "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0"
                        : "opacity-0 scale-90 -translate-x-10 translate-y-10 rotate-[-12deg] group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0",
                ].join(" ")}
            />

            <img
                src={leafUpRight}
                alt=""
                className={[
                    "pointer-events-none absolute z-10 right-16 top-40 w-[40px] transition-all duration-300 ease-out",
                    isActive
                        ? "opacity-100 scale-100 translate-x-0 translate-y-0 rotate-0"
                        : "opacity-0 scale-90 translate-x-10 -translate-y-10 rotate-[12deg] delay-100 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0",
                ].join(" ")}
            />
        </div>
    );
}