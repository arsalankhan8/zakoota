import { useEffect, useMemo, useState } from "react";
import { api } from "../api/api";
import { DishCard } from "./BestSellingDishesSection";

export default function MenuByCategorySection({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [activeCategory, setActiveCategory] = useState("all");

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);

        const res = await api.get("/items/public");

        if (!alive) return;

        const itemsData = Array.isArray(res.data?.data) ? res.data.data : (Array.isArray(res.data) ? res.data : []);
        setItems(itemsData);
      } catch (err) {
        setError("Failed to load menu");
      } finally {
        setLoading(false);
      }
    })();

    return () => (alive = false);
  }, []);

  /* ---------------- CATEGORIES ---------------- */
  const categories = useMemo(() => {
    const map = new Map();

    items.forEach((item) => {
      if (item.category) {
        map.set(item.category._id, item.category);
      }
    });

    return Array.from(map.values());
  }, [items]);

  /* ---------------- FILTER ---------------- */
  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return items;

    return items.filter((item) => item.category?._id === activeCategory);
  }, [items, activeCategory]);

  /* ---------------- BASE URL ---------------- */
  const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const BASE = API.endsWith("/api") ? API.slice(0, -4) : API;

  const getIcon = (icon) => {
    if (!icon) return null;

    return `${BASE}/uploads/icons/${icon}`;
  };

  /* ---------------- UI ---------------- */
  return (
    <section className="w-full bg-[#f4f1ea] py-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* TITLE */}
        <h2 className="text-center text-4xl sm:text-5xl font-extrabold mb-10">
          Popular Dishes
        </h2>

        {/* ERROR */}
        {error && <div className="text-center text-red-500 mb-6">{error}</div>}

        {/* ---------------- TABS ---------------- */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {/* ALL */}
          <button
            onClick={() => setActiveCategory("all")}
            className={`
              flex items-center gap-2 px-5 py-2 rounded-lg font-semibold
              transition
              ${
                activeCategory === "all"
                  ? "bg-[#C33130] text-white"
                  : "bg-white text-[#212121] hover:bg-[#212121] hover:text-white"
              }
            `}
          >
            All
          </button>

          {/* CATEGORIES */}
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`
    group
    flex items-center gap-2 px-5 py-2 rounded-lg font-semibold
    transition-all duration-200

    ${
      activeCategory === cat._id
        ? "bg-[#C33130] text-white"
        : "bg-white text-[#212121] hover:bg-[#212121] hover:text-white"
    }
  `}
            >
              {cat.icon && (
                <img
                  src={getIcon(cat.icon)}
                  alt={cat.name}
                  className={`
    w-5 h-5 object-contain transition

    ${
      activeCategory === cat._id
        ? "filter brightness-0 invert"
        : "group-hover:filter group-hover:brightness-0 group-hover:invert"
    }
  `}
                />
              )}

              {cat.name}
            </button>
          ))}
        </div>

        {/* ---------------- LOADING ---------------- */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-[380px] bg-white/60 rounded-3xl animate-pulse"
              />
            ))}
          </div>
        )}

        {/* ---------------- GRID ---------------- */}
        {!loading && (
          <>
            {filteredItems.length === 0 ? (
              <p className="text-center text-lg text-gray-500">
                No items found
              </p>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {filteredItems.map((item) => (
                  <DishCard
                    key={item._id}
                    item={item}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
