import React from "react";

// Replace these with your actual imports / paths
import superDeliciousImg from "../assets/super-delicious-vertical.webp";
import todaySpecialImg from "../assets/today-special.webp";
import pizzaOfferImg from "../assets/super-delicious-pizza.webp";

function PromoBannersSecondSection() {
    return ( 
<div className="w-full bg-[#f4f1ea]">
            <section className=" mx-auto max-w-7xl px-6 py-10 sm:pb-12 lg:pb-16">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* LEFT: Vertical banner with text overlay */}
                <div className="relative overflow-hidden rounded-3xl">
                    <img
                        src={superDeliciousImg}
                        alt="Super Delicious Combo"
                        className="h-full w-full object-cover"
                    />

                    {/* Overlay content (YOU asked: write above img) */}
                    <div className="pointer-events-none absolute inset-0 p-6 sm:p-8">
                        <div className="max-w-[320px]">
                            <h3 className="text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl">
                                SUPER
                                <br />
                                DELICIOUS
                            </h3>

                            <div className="mt-6 text-white/90">
                                <p className="text-xs font-semibold tracking-widest">CALL US NOW:</p>
                                <p className="mt-1 text-2xl font-extrabold text-[#ff3b30]">
                                    1-800-555-333
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Two stacked images (no text added) */}
                <div className="flex flex-col gap-6">
   <div className="flex flex-col gap-6">
  {/* Today Special with text */}
  <div className="relative overflow-hidden rounded-3xl">
    <img
      src={todaySpecialImg}
      alt="Today Special"
      className="h-full w-full object-cover"
    />

    {/* Text overlay */}
    <div className="pointer-events-none absolute inset-0 flex items-center p-6 sm:p-8">
      <h3 className="text-4xl font-extrabold leading-[1] tracking-tight text-white sm:text-5xl">
        TODAY
        <br />
        SPECIAL
        <br />
        BURRITO
        <br />
        FOOD
      </h3>
    </div>
  </div>

  {/* Pizza image (no text) */}
  <div className="overflow-hidden rounded-3xl">
    <img
      src={pizzaOfferImg}
      alt="Pizza Offer"
      className="h-full w-full object-cover"
    />
  </div>
</div>

                </div>
            </div>
        </section>
</div>
    );
}

export default PromoBannersSecondSection