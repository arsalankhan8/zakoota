import { useEffect, useMemo, useState } from "react";
import bgImg from "../assets/best-selling-dishes-bg.webp";
import { api } from "../api/api.js";
import { Heart, ShoppingBasket, Star } from "lucide-react";

function money(n) {
    const num = Number(n || 0);
    return `$${num.toFixed(2)}`;
}

function clampText(text = "", max = 90) {
    if (!text) return "Delicious, freshly prepared and packed with flavor.";
    return text.length > max ? text.slice(0, max).trim() + "..." : text;
}

function Stars({ value = 5 }) {
    const stars = Array.from({ length: 5 }).map((_, i) => i < value);
    return (
        <div className="flex items-center gap-1">
            {stars.map((filled, idx) => (
                <Star
                    key={idx}
                    className={[
                        "h-4 w-4",
                        filled ? "fill-[#f59e0b] stroke-[#f59e0b]" : "stroke-[#f59e0b]/40",
                    ].join(" ")}
                />
            ))}
        </div>
    );
}

function CardSkeleton() {
    return (
        <div className="relative rounded-3xl bg-white/90 shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="h-[170px] sm:h-[190px] grid place-items-center">
                <div className="h-[120px] w-[170px] rounded-2xl bg-black/10 animate-pulse" />
            </div>
            <div className="p-6">
                <div className="h-5 w-40 bg-black/10 rounded animate-pulse" />
                <div className="mt-3 h-4 w-24 bg-black/10 rounded animate-pulse" />
                <div className="mt-4 h-12 w-full bg-black/10 rounded-xl animate-pulse" />
                <div className="mt-6 flex items-end justify-between">
                    <div className="h-7 w-20 bg-black/10 rounded animate-pulse" />
                    <div className="h-11 w-11 bg-black/10 rounded-xl animate-pulse" />
                </div>
            </div>
        </div>
    );
}

/** ✅ Named export (NOT default) */
export function DishCard({ item, onAddToCart }) {
    const [fav, setFav] = useState(false);

    const img = item?.imageUrl;
    const name = item?.name || "BIG MAC";
    const desc = clampText(item?.description, 90);

    return (
        <div className="group relative overflow-hidden rounded-[28px] min-h-[470px] bg-transparent">

            {/* White panel */}
            <div className="
    absolute inset-x-0 bottom-0
    min-h-[68%]
    group-hover:min-h-full
    rounded-[28px]
    bg-white
    transition-all duration-300 ease-out
  " />

            {/* Image */}
            <div className="relative z-10 h-[225px] flex items-end justify-center pt-6">
                <img
                    src={img}
                    alt={name}
                    className="h-[230px] w-auto object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out group-hover:translate-y-1"
                    draggable={false}
                    loading="lazy"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 px-7 pt-4 pb-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[20px] font-extrabold tracking-wide text-[#1b1b1b] uppercase">
                        {name}
                    </h3>

                    <button
                        type="button"
                        onClick={() => setFav((v) => !v)}
                        className="rounded-full p-1"
                        aria-label="Add to favourites"
                    >
                        <Heart
                            className={[
                                "h-5 w-5 transition",
                                fav ? "fill-[#e11d48] stroke-[#e11d48]" : "stroke-black/25",
                            ].join(" ")}
                        />
                    </button>
                </div>

                <div className="mt-3">
                    <Stars value={5} />
                </div>

                <p className="mt-5 text-[18px] leading-6 text-black/60">{desc}</p>

                <div className="mt-7 flex items-end justify-between">
                    <div className="text-[22px] font-extrabold text-[#c81e1e]">
                        {money(item?.price)}
                    </div>

                    <button
                        type="button"
                        onClick={() => onAddToCart?.(item)}
                        className="h-12 w-12 rounded-xl bg-[#0b7a3b] grid place-items-center shadow-[0_14px_28px_rgba(11,122,59,0.25)] active:scale-[0.98]"
                        aria-label="Add to cart"
                    >
                        <ShoppingBasket className="h-5 w-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function BestSellingDishesSection({
    title = "BEST SELLING DISHES",
    limit = 4,
    onAddToCart,
}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect(() => {
        let alive = true;

        (async () => {
            try {
                setLoading(true);
                setErr("");

                const res = await api.get("/items/public");
                const data = Array.isArray(res.data) ? res.data : [];

                if (!alive) return;
                setItems(data);
            } catch (e) {
                if (!alive) return;
                setErr("Failed to load best sellers.");
            } finally {
                if (!alive) return;
                setLoading(false);
            }
        })();

        return () => {
            alive = false;
        };
    }, []);

    const bestSellers = useMemo(() => {
        const filtered = items.filter((x) => x?.isBestSeller);
        return filtered.slice(0, limit);
    }, [items, limit]);

    return (
        <section className="relative w-full bg-[#f4f1ea] overflow-hidden">
            {/* FULL-WIDTH background image */}
<div className="pointer-events-none absolute left-1/2 top-0 w-screen -translate-x-1/2 hidden lg:block">
  <img
    src={bgImg}
    alt=""
    className="w-screen max-w-none object-contain h-auto"
    draggable={false}
  />
</div>

            {/* Content container */}
            <div className="relative mx-auto max-w-7xl sm:pt-16 pb-16 lg:pb-40">
                <h2 className="text-center text-4xl sm:text-6xl font-extrabold tracking-wide text-[#1b1b1b]">
                    {title}
                </h2>

                <div className="mt-10 sm:mt-12 px-5">
                    {err ? (
                        <div className="mx-auto max-w-xl rounded-2xl bg-white/80  py-4 text-center text-sm text-red-600 shadow">
                            {err}
                        </div>
                    ) : null}

                    {loading ? (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {Array.from({ length: 4 }).map((_, i) => (
                                <CardSkeleton key={i} />
                            ))}
                        </div>
                    ) : bestSellers.length === 0 ? (
                        <div className="mx-auto max-w-xl rounded-3xl bg-white/80 px-6 py-10 text-center shadow">
                            <p className="text-lg font-semibold text-[#1b1b1b]">
                                No best-selling dishes yet
                            </p>
                            <p className="mt-2 text-sm text-black/60">
                                Mark products as{" "}
                                <span className="font-semibold">isBestSeller</span> in admin and
                                they’ll appear here.
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Desktop grid */}
                            <div className="hidden px-5 sm:grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {bestSellers.map((item) => (
                                    <DishCard
                                        key={item?._id || item?.id}
                                        item={item}
                                        onAddToCart={onAddToCart}
                                    />
                                ))}
                            </div>

                            {/* Mobile horizontal scroll */}
                            <div className="sm:hidden">
                                <div className="flex gap-5 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                    {bestSellers.map((item) => (
                                        <div
                                            key={item?._id || item?.id}
                                            className="min-w-[78%] max-w-[78%] flex-shrink-0"
                                        >
                                            <DishCard item={item} onAddToCart={onAddToCart} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
