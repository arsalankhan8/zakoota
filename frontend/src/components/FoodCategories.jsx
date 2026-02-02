import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// decor svgs
import leafDownLeft from "../assets/decor-leaf-down-left.svg";
import leafUpRight from "../assets/decor-leaf-up-right.svg";
import yellowDown from "../assets/yellow-shape-down.svg";
import yellowUp from "../assets/yellow-shape-up.svg";
import chickenDish from "../assets/chicken-dish.png";

const items = [
    {
        id: 0,
        title: "Ham",
        dishImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/ham_8_1.png?v=1702000209",
        textImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/Vector_3.png?v=1702000219",
    },
    {
        id: 1,
        title: "Burger",
        dishImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/sthsn__Delicious_burger__on_isolated_pastel_color_easy_to_remo_e13479c1-55f6-4de5-b89d-81f7ea691f7f_1_1_2.png?v=1702000127",
        textImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/Vector.svg?v=1701999696",
    },
    {
        id: 2,
        title: "Chicken",
        dishImg: chickenDish,
        textImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/Vector_4.png?v=1702000267",
    },
    {
        id: 3,
        title: "Fast Food",
        dishImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/fast_food_set_1.png?v=1702003448",
        textImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/Vector_6.png?v=1702003461",
    },
    {
        id: 4,
        title: "Pizza",
        dishImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/hot_capricciosa_pizza_made_of_ham_and_cheese_ital_2023_01_20_03_55_27_utc_1.png?v=1702003477",
        textImg:
            "https://ap-fazfood.myshopify.com/cdn/shop/files/Vector_7.png?v=1702003488",
    },
];

export default function FoodCategories() {
    const sliderRef = useRef(null);

    const [targetCols, setTargetCols] = useState(5); // will update by breakpoint
    const [canScroll, setCanScroll] = useState(false);
    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

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
                className="flex overflow-x-auto no-scrollbar-x no-scrollbar scroll-smooth mb-12  snap-x snap-mandatory"
            >
                {items.map((item, idx) => (
                    <CategoryCard
                        key={item.id}
                        item={item}
                        isFirst={idx === 0}
                        cols={cols}
                    />
                ))}
            </div>
        </section>
    );
};

function CategoryCard({ item, isFirst, cols }) {
    return (
        <div
            className={[
                "group relative h-[500px] mb-10 shrink-0 snap-start",
                "cursor-pointer",
                "bg-[#F2F0EA] overflow-hidden",
                "transition-colors duration-300 hover:bg-[#F7B33B]",
                "border-y border-black/10 border-r border-black/10",
                isFirst ? "border-l border-black/10" : "border-l-0",
            ].join(" ")}
            style={{
                // ✅ key part:
                // - if items < 5 on desktop => cols becomes items.length => cards expand to fill
                // - but NEVER shrink below 340px
                flexBasis: `max(340px, ${100 / cols}vw)`,
            }}
        >
            {/* TEXT IMAGE */}
            <div
                className="
          absolute left-1/2 -translate-x-1/2 z-30
          top-[350px] group-hover:top-10
          transition-all duration-300 ease-out
        "
            >
                <img
                    src={item.textImg}
                    alt={item.title}
                    className="
            h-[70px] select-none
            transition duration-300 ease-out
            group-hover:brightness-0 group-hover:invert
          "
                    draggable={false}
                />
            </div>

            {/* DISH */}
            <div
                className="
          absolute left-1/2 -translate-x-1/2 z-20
          top-14 group-hover:top-[150px]
          transition-all duration-300 ease-out w-[250px]
        "
            >
                <img
                    src={item.dishImg}
                    alt={item.title}
                    className="w-[300px] select-none"
                    draggable={false}
                />
            </div>

            {/* HOVER BLOBS */}
            <img
                src={yellowDown}
                alt=""
                className="
          pointer-events-none absolute z-10
          left-8 top-[180px] w-[120px]
          opacity-0 scale-90 -translate-x-10 -translate-y-8 rotate-[-6deg]
          transition-all duration-300 ease-out
          group-hover:opacity-100 group-hover:scale-100
          group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
        "
            />

            <img
                src={yellowUp}
                alt=""
                className="
          pointer-events-none absolute z-10
          right-12 top-[270px] w-[90px]
          opacity-0 scale-90 translate-x-10 translate-y-8 rotate-[6deg]
          transition-all duration-300 ease-out delay-75
          group-hover:opacity-100 group-hover:scale-100
          group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
        "
            />

            {/* leaves */}
            <img
                src={leafDownLeft}
                alt=""
                className="
          pointer-events-none absolute z-10
          left-20 bottom-28 w-[40px]
          opacity-0 scale-90 -translate-x-10 translate-y-10 rotate-[-12deg]
          transition-all duration-300 ease-out
          group-hover:opacity-100 group-hover:scale-100
          group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
        "
            />

            <img
                src={leafUpRight}
                alt=""
                className="
          pointer-events-none absolute z-10
          right-16 top-40 w-[40px]
          opacity-0 scale-90 translate-x-10 -translate-y-10 rotate-[12deg]
          transition-all duration-300 ease-out delay-100
          group-hover:opacity-100 group-hover:scale-100
          group-hover:translate-x-0 group-hover:translate-y-0 group-hover:rotate-0
        "
            />
        </div>
    );
};