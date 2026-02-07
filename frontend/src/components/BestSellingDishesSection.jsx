// src > components > BestSellingDishesSection.jsx

import { useEffect, useMemo, useState } from "react";
import bgImg from "../assets/best-selling-dishes-bg.webp";
import { api } from "../api/api.js";
import {
  Heart,
  ShoppingBasket,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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

  const API = import.meta.env.VITE_API_URL;
  const BASE = API?.endsWith("/api") ? API.slice(0, -4) : API;
  const imgSrc = img ? (img.startsWith("http") ? img : `${BASE}${img}`) : "";

  return (
    <div className="group relative overflow-hidden rounded-[28px] min-h-[-webkit-fill-available] bg-transparent">
      {/* White panel */}
      <div
        className="
          absolute inset-x-0 bottom-0
          min-h-[68%]
          group-hover:min-h-full
          rounded-[28px]
          bg-white
          transition-all duration-300 ease-out
        "
      />

      {/* Image */}
      <div className="relative z-10 h-[225px] flex items-end justify-center pt-6">
        <img
          src={imgSrc}
          alt={name}
          className="h-[230px] w-auto object-contain transition-transform duration-300 ease-out group-hover:translate-y-1"
          draggable={false}
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-7 pt-4 pb-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[24px] font-extrabold tracking-wide text-[#1b1b1b] uppercase">
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
    {item?.prices?.length ? (
      <div className="flex flex-col gap-1">
        {item.prices.map((p, i) => (
          <div
            key={i}
            className="text-[18px] font-extrabold text-[#c81e1e]"
          >
            {p.label}: {money(p.amount)}
          </div>
        ))}
      </div>
    ) : (
      <span className="text-[18px] font-extrabold text-[#c81e1e]">
        No price
      </span>
    )}
  </div>

  <button
    type="button"
    onClick={() => onAddToCart?.(item)}
    className="h-12 w-12 rounded-xl bg-[#0b7a3b] grid place-items-center active:scale-[0.98]"
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
  limit = 14,
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

  // ✅ responsive rules:
  // >= 1280 => 4 cards, arrows on sides
  // < 1280 and >= 556 => 3 cards (if <1024 => 2 cards), arrows at bottom
  // < 556 => 1 card, arrows at bottom
  const [perPage, setPerPage] = useState(4);
  const [arrowsDown, setArrowsDown] = useState(false);

  useEffect(() => {
    const apply = () => {
      const w = window.innerWidth;

      if (w < 556) {
        setPerPage(1);
        setArrowsDown(true);
        return;
      }

      if (w < 1024) {
        setPerPage(2);
        setArrowsDown(true);
        return;
      }

      if (w < 1380) {
        setPerPage(3);
        setArrowsDown(true);
        return;
      }

      // >= 1280
      setPerPage(4);
      setArrowsDown(false);
    };

    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  const [page, setPage] = useState(0);

  const pages = useMemo(() => {
    const chunks = [];
    for (let i = 0; i < bestSellers.length; i += perPage) {
      chunks.push(bestSellers.slice(i, i + perPage));
    }
    return chunks;
  }, [bestSellers, perPage]);

  const totalPages = Math.max(1, pages.length);

  useEffect(() => {
    setPage(0);
  }, [perPage, bestSellers.length]);

  const goPrev = () => setPage((p) => Math.max(0, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages - 1, p + 1));

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

      <div className="relative mx-auto max-w-7xl sm:pt-16 pb-16 lg:pb-40">
        <h2 className="text-center text-4xl sm:text-6xl font-extrabold tracking-wide text-[#1b1b1b]">
          {title}
        </h2>

        <div className="mt-10 sm:mt-12 px-5">
          {err ? (
            <div className="mx-auto max-w-xl rounded-2xl bg-white/80 py-4 text-center text-sm text-red-600 shadow">
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
            <div className="relative px-5">
              {/* CLIP AREA */}
              <div className="overflow-hidden">
                {/* TRACK */}
                <div
                  className="flex transition-transform duration-500 ease-in-out will-change-transform"
                  style={{ transform: `translateX(-${page * 100}%)` }}
                >
                  {pages.map((group, idx) => (
                    <div key={idx} className="w-full shrink-0">
                      {/* PAGE GRID */}
                      <div
                        className={[
                          "grid gap-6",
                          perPage === 1 ? "grid-cols-1 place-items-center" : "",
                          perPage === 2 ? "grid-cols-2" : "",
                          perPage === 3 ? "grid-cols-3" : "",
                          perPage === 4 ? "grid-cols-2 lg:grid-cols-4" : "",
                        ].join(" ")}
                      >
                        {group.map((item) => (
                          <div
                            key={item?._id || item?.id}
                            className={
                              perPage === 1 ? "w-full max-w-[420px]" : ""
                            }
                          >
                            <DishCard item={item} onAddToCart={onAddToCart} />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ARROWS ON SIDES (>=1280 only) */}
              {!arrowsDown ? (
                <>
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={page === 0}
                    className="absolute top-1/2 -translate-y-1/2 -left-[60px] h-12 w-12 rounded-full bg-white shadow-lg grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed z-20"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={page >= totalPages - 1}
                    className="absolute top-1/2 -translate-y-1/2 -right-[60px] h-12 w-12 rounded-full bg-white shadow-lg grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed z-20"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              ) : (
                /* ARROWS DOWN (<1280) */
                <div className="mt-6 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={page === 0}
                    className="h-12 w-12 rounded-full bg-white shadow-lg grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>

                  <div className="text-sm font-semibold text-black/60">
                    {page + 1} / {totalPages}
                  </div>

                  <button
                    type="button"
                    onClick={goNext}
                    disabled={page >= totalPages - 1}
                    className="h-12 w-12 rounded-full bg-white shadow-lg grid place-items-center disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Next"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
