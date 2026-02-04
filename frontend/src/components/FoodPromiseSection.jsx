import React from "react";

// ✅ Left image
import foodPromiseImg from "../assets/food-promise-img.webp";

export default function FoodPromiseSection() {
  const stats = [
    { value: "23+", label: "YEARS EXPERIENCE" },
    { value: "580+", label: "DIFFERENT BURGERS" },
  ];

  return (
    <section className="relative w-full bg-[#F4F1EA] overflow-hidden ">
      {/* Watermark text (diagonal) */}


      <div className="mx-auto max-w-7xl px-6 pb-10 sm:pb-12 lg:pb-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* LEFT */}
          <div className="relative">
            <div className="relative lg:mx-auto w-full max-w-[640px] lg:max-w-none">
              <img
                src={foodPromiseImg}
                alt="Food Promise"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-full">
            <p className="text-[16px] sm:text-[18px] font-extrabold text-[#c33130]">
              OUR FOOD PROMISE
            </p>

            <h2 className="mt-4 text-[34px] leading-[1.05] sm:text-[55px] lg:text-[65px] font-black tracking-[1px] text-[#1f1f1f]">
              MADE RIGHT. MADE ESPECIALLY FOR YOU.
            </h2>

            <p className="mt-5 sm:max-w-[85%] text-[18px] leading-[1.35] text-[#464646]">
              Bold fiery flavours are our style. We&apos;re here to bring a new
              sizzle to the face of fast-casual dining.
            </p>

            {/* STATS */}
            <div className="mt-10 grid grid-cols-2 gap-10 sm:gap-14 max-w-[520px]">
              {stats.map((s, idx) => (
                <div key={idx}>
                  <p className="text-[44px] sm:text-[56px] font-black text-[#c33130] leading-[1]">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[14px] sm:text-[15px] font-extrabold tracking-[1px] text-[#1f1f1f]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* /RIGHT */}
        </div>
      </div>
    </section>
  );
}
