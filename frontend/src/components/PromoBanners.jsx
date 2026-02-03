import fastFoodBanner from "../assets/fast-food-banner.webp";
import burgerBanner from "../assets/burger-banner.webp";
import pizzaBanner from "../assets/pizza-banner.webp";

import rightArrow from "../assets/btn-arrow-right.svg";

const banners = [
    {
        id: 1,
        img: fastFoodBanner,
        title: ["FASH FOOD", "MEALS"],
        subtitle1: "NEW PHENOMENON",
        subtitle2: "BURGER TASTE",
        price: "$59,00",
        align: "left",
    },
    {
        id: 2,
        img: burgerBanner,
        title: ["BEEF", "BURGER"],
        subtitle1: "NEW PHENOMENON",
        subtitle2: "BURGER TASTE",
        price: "$49,00",
        align: "left",
    },
    {
        id: 3,
        img: pizzaBanner,
        title: ["CHEESE", "PIZZA"],
        subtitle1: "NEW PHENOMENON BURGER TASTE",
        subtitle2: "",
        price: "$69,00",
        align: "left",
    },
];

export default function PromoBanners() {
    return (
        <section className="w-full">
            {/* container full width */}
            <div
                className="
          w-full 
          grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3
        "
                style={{ gap: 15 }}
            >
                {banners.map((b) => (
                    <div
                        key={b.id}
                        className="
              relative overflow-hidden
              min-h-[240px] sm:min-h-[280px] lg:min-h-[520px]
              rounded-none
            "
                    >
                        {/* Background image */}
                        <img
                            src={b.img}
                            alt=""
                            className="absolute inset-0 h-full w-full object-cover"
                        />


                        {/* Content */}
                        <div
                            className="
    relative z-10 h-full text-white
    flex flex-col items-start justify-center
    px-6 py-10
    sm:px-10 sm:py-14
    lg:px-[40px] lg:py-[80px]
  "
                        >

                            {/* Title */}
                            <h3 className="font-extrabold uppercase leading-[0.95] tracking-wide text-[36px] sm:text-[42px] lg:text-[70px]">
                                <span className="block">{b.title[0]}</span>
                                <span className="block">{b.title[1]}</span>
                            </h3>

                            {/* Sub text */}
                            <div className="mt-3">
                                <p className="text-white/80 text-[12px] sm:text-[13px] uppercase tracking-widest ">
                                    {b.subtitle1}
                                </p>
                                {b.subtitle2 ? (
                                    <p className="text-white/80 text-[12px] sm:text-[13px] uppercase tracking-widest">
                                        {b.subtitle2}
                                    </p>
                                ) : null}
                            </div>

                            {/* Price */}
                            <p className=" mt-1 sm:mt-5 text-[#f6c445] font-extrabold text-[28px] sm:text-[40px]">
                                {b.price}
                            </p>

                            {/* Button */}
                            <button
                                type="button"
                                className="
                  mt-4 sm:mt-6
                  inline-flex items-center gap-3
                  bg-white text-black
                  rounded-xl
                  px-6 py-3
                  font-bold uppercase tracking-wider text-[16px] sm:text-[18px]
                  hover:scale-[1.02] active:scale-[0.99]
                  transition
                "
                            >
                                ORDER NOW
                                <img src={rightArrow} alt="" className="w-4 h-4 filter brightness-0" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
